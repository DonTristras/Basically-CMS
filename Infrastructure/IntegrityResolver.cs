using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basically.Models;
using System.Reflection;
using Microsoft.Extensions.Configuration;

namespace Basically.Infrastructure
{
    public static class IntegrityResolver
    {
        //PW: static method which provides a recursive deletetion for referenced objects in the LiteDB mapping
        public static void DeleteRecursive(int pk, string modelName, IConnector Connector)
        {
            //PW: Fetches Model objects in runtime
            var Models = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.Namespace == "Basically.Models" && t.IsClass && t.GetInterfaces().Where(i => i.Name == "IModel").Count() > 0);

            foreach (var model in Models)
            {
                //PW: Loops througt properties
                foreach (var prop in model.GetProperties())
                {
                    //PW: Check if property has a reference attribute and proceeds to delete the reference before deleting the required object
                    var refAttribute = prop.GetCustomAttributesData().Where(x => x.AttributeType.Name == "BsonRefAttribute").FirstOrDefault();
                    if (refAttribute != null && modelName == prop.Name) {
                        Connector.DeleteReferences(pk, prop.Name, model.Name);
                    }
                }
            }
        }
    }
}
