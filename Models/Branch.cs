using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Basically.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Basically.Models
{
    public class Branch : IModel
    {
        [Required]
        public Guid _id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string order { get; set; }
        [Required]
        public string content { get; set; }
        [Required]
        public int level { get; set; }
        public bool is_root { get; set; }
        public Guid parent_id { get; set; }
        [BsonRef("Leaf")]
        [Required]
        public string Leaf { get; set; }
        [BsonRef("Site")]
        [Required]
        public Tree site { get; set; }
    }
}
