using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Basically.Models;
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

        public void Create<T>(T Model) {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                var q = db.GetCollection<T>(typeof(T).Name);
                q.Insert(Model);
            }   
        }

        public void Delete<T>(int id)
        {
            using (var db = new LiteDatabase(DbFileLocation))
            {
                var q = db.GetCollection<T>(typeof(T).Name);
                IntegrityResolver.DeleteRecursive(id, typeof(T).Name, this);
                q.Delete(id);              
            }
        }

        public void DeleteReferences(int id, string referencedType, string targetType)
        {
            using (var db = new LiteDatabase(DbFileLocation))
            {              
                var q = db.GetCollection(targetType);
                var fkList = q.Find(Query.EQ(referencedType + ".$id", id));
                foreach (var k in fkList)
                {
                    IntegrityResolver.DeleteRecursive(k.Get("_id").First(), targetType, this);
                    q.Delete(k.Get("_id").First());
                }                               
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
    }
}
