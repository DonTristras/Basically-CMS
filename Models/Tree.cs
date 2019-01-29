using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Basically.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Basically.Models
{
    public class Tree : IModel
    {
        public int _id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Content { get; set; }
        [BsonRef("Site")]
        [Required]
        public Site Site { get; set; }
    }
}
