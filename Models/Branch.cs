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
        public int order { get; set; }
        [Required]
        public string content { get; set; }
        [Required]
        public int level { get; set; }
        public bool is_root { get; set; }
        public Guid parent_id { get; set; }
        [BsonRef("Leaf")]
        [Required]
        public Leaf leaf { get; set; }
        [BsonRef("Tree")]
        [Required]
        public Tree tree { get; set; }
        [Required]
        public Guid leaf_data_id { get; set; }
    }
}
