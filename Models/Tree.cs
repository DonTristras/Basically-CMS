using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using System.ComponentModel.DataAnnotations;

namespace Basically.Models
{
    public class Tree : IModel
    {
        [Required]
        [BsonId]
        public Guid _id { get; set; }

        [Required]
        [MaxLength(128)]
        public string name { get; set; }
    }
}
