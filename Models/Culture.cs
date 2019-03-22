using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using LiteDB;

namespace Basically.Models
{
    public class Culture : IModel
    {
        [Required]
        public Guid _id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public int code { get; set; }
        [Required]
        public byte[] flag_image { get; set; }
    }
}
