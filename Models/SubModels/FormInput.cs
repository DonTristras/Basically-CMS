using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basically.Models
{
    public class formInput
    {
        public string name { get; set; }
        public List<ConfigField> config_fields { get; set; }
        public string form_control { get; set; }
    }
}
