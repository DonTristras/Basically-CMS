using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basically.Models;

namespace Basically.Infrastructure
{
    public class TreeDocumentRepository
    {
        private IEnumerable<Document> _documents;
        public TreeDocumentRepository(IEnumerable<Document> documents) {
            _documents = documents;
        }

        public List<TreeDocument> GetDocumentTree(int parentId) {
            Document parent = _documents.Where(x => x._id == parentId).SingleOrDefault();
            List<Document> children = _documents.Where(x => x.parent_id == parentId).ToList();
            List<TreeDocument> treeDocuments = new List<TreeDocument>();
            foreach (var d in _documents) {
                treeDocuments.Add(new TreeDocument() { Document = d, ChildDocuments = GetDocumentTree(parent._id)  });
            }
            return treeDocuments;
        }
    }
}
