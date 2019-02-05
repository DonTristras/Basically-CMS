using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using System.ComponentModel.DataAnnotations;

namespace Basically.Models
{
    public class Site : IModel
    {
        public int _id { get; set; }
        [Required]
        [MaxLength(128)]
        public string name { get; set; }
        [Required]
        [MaxLength(128)]
        public string domain { get; set; }
    }
}
