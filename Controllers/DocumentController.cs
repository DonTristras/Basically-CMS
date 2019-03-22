using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Basically.Models;
using Basically.Infrastructure;
using LiteDB;

namespace Basically.Controllers
{
    public class DocumentController : Controller
    {
        private IConnector db;
        public DocumentController(IConnector Connector)
        {
            db = Connector;
        }

        public IActionResult Index(int? site_id)
        {
            //PW: return document list, as herarchy tree
            ViewBag.SiteID = site_id;
            return View();
        }

        [HttpPost]
        public JsonResult List()
        {
            try
            {
                //PW: return ordered list, sliced, chucked and ordered
                IEnumerable<Document> CurrentSiteTree = db.List<Document>().Find(Query.EQ("site.$id",18));
               // var ChunkedSiteList = SiteList.OrderByDynamic(jtSorting).Skip(jtStartIndex).Take(jtPageSize);
                return Json(new { Result = "OK", Records = CurrentSiteTree });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult GetRoot(int? site_id)
        {
            try
            {
                //PW: return root document for site_id
                Document RootDocument = db.List<Document>().Find(Query.And(Query.EQ("site.$id", site_id), Query.EQ("is_root", true))).FirstOrDefault();
                return Json(new { Result = "OK", Record = RootDocument });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult ListChildren(int? parent_id)
        {
            try
            {
                //PW: return child documents with its children count
                var Children = db.List<Document>().Find(Query.EQ("parent_id", parent_id)).ToList();
                var CountedChildren = from c in Children
                                      select new { document = c, childCount = db.List<Document>().Find(Query.EQ("parent_id", c._id)).Count() };
                return Json(new { Result = "OK", Records = CountedChildren });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create(Document Model) {

            try
            {
                Tree site = db.List<Tree>().FindById(Int32.Parse(Model.content));
                Model.site = site;
                db.Create(Model);
                return Json(new { Result = "OK",  Record = Model});
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(int _id)
        {
            try
            {
                //PW: Delete model
                //db.Delete<Document>(_id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(Document Model)
        {
            try
            {
                //PW: Update model
                db.Update<Document>(Model);
                return Json(new { Result = "OK"});
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}