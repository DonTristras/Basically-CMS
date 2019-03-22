using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;

namespace Basically.Models
{
    public interface IModel
    {
        Guid _id { get; set; }
    }
}
