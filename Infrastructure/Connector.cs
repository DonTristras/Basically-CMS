using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Basically.Models;
using System.Reflection;
using LiteDB;

namespace Basically.Infrastructure
{
    public class Connector : IConnector
    {
        private IConfiguration _configuration { get; set; }
        private string DbFileLocation;

        public Connector(IConfiguration configuration) {
            DbFileLocation = configuration.GetSection("Settings").GetSection("LiteDBFile").Value;
            _configuration = configuration;
        }

        public LiteCollection<T> List<T>() {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                return db.GetCollection<T>(typeof(T).Name);
            }
        }

        public Guid Create<T>(T Model) {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                var q = db.GetCollection<T>(typeof(T).Name);
                if(((dynamic)Model)._id == null || ((dynamic)Model)._id == Guid.Empty) //Set new guid if empty
                {
                    ((dynamic)Model)._id = Guid.NewGuid();
                }
                return q.Insert(Model);
            }   
        }


        public void Update<T>(T Model)
        {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                var q = db.GetCollection<T>(typeof(T).Name);
                q.Update(Model);
            }
        }

        public void Delete<T>(Guid id)
        {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                var q = db.GetCollection<T>(typeof(T).Name);
                //PW: First check for reference
                DeleteRecursive(id, typeof(T).Name);
                q.Delete(id);              
            }
        }

        public T GetByID<T>(Guid id) {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                return db.GetCollection<T>(typeof(T).Name).FindById(id);
            }
        }

        //PW: Method Allow reference deletions
        private void DeleteReferences(Guid id, string referencedType, string targetType)
        {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                var q = db.GetCollection(targetType);
                var fkList = q.Find(Query.EQ(referencedType + ".$id", id));
                foreach (var k in fkList)
                {
                    DeleteRecursive(k.Get("_id").First(), targetType);
                    q.Delete(k.Get("_id").First());
                }
            }
        }

        //PW:Wthod which provides a recursive deletetion for referenced objects in the LiteDB mapping
        private void DeleteRecursive(Guid pk, string modelName)
        {
            //PW: Fetches Model objects in runtime where Interface matches
            var Models = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.Namespace == "Basically.Models" && t.IsClass && t.GetInterfaces().Where(i => i.Name == "IModel").Count() > 0);

            foreach (var model in Models)
            {
                //PW: Loop througt properties
                foreach (var prop in model.GetProperties())
                {
                    //PW: Check if property has a reference attribute and proceeds to delete the reference before deleting the required object
                    var refAttribute = prop.GetCustomAttributesData().Where(x => x.AttributeType.Name == "BsonRefAttribute").FirstOrDefault();
                    if (refAttribute != null && modelName == prop.Name)
                    {
                        DeleteReferences(pk, prop.Name, model.Name);
                    }
                }
            }
        }

    }
}
