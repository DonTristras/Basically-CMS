using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Basically.Infrastructure;
using System.ComponentModel.DataAnnotations;
using LiteDB;

namespace Basically.Models
{
    public class Leaf : IModel
    {
        public Guid _id { get; set; }
        public string name { get; set; }
        public List<FormDefinition> form_controls { get; set; }
    }
}
