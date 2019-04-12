using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basically.Models;

namespace Basically.Infrastructure
{
    public class TreeDocument
    {
        public Tree Tree { get; set; }
        public IEnumerable<TreeDocument> ChildDocuments { get; set; }
    }
}
