using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Basically.Models;
using LiteDB;

namespace Basically.Infrastructure
{
    public class Connector
    {
        private IConfiguration configuration;
        public Connector(IConfiguration _configuration) {
            configuration = _configuration;
        }
   
        public LiteCollection<T> List<T>() {
            using (var db = new LiteDatabase(configuration.GetSection("Settings").GetSection("LiteDBFile").Value))
            {
                return db.GetCollection<T>(typeof(T).ToString());
            }
        }

        public string Set() {
            return "";
        }

        public string Get() {
            return "";
        }

        public string Update() {
            return "";
        }
    }
}
