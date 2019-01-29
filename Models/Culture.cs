using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Basically.Models
{
    public class Culture : IModel
    {        
        public int _id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public int code { get; set; }
        [Required]
        public byte[] flag_image { get; set; }
    }
}
