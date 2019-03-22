﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using LiteDB;

namespace Basically.Models
{
    public class User : IModel
    {
        public Guid _id { get; set; }
        public string email { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public IList<int> site_id { get; set; }
    }
}
