using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Basically.Models;
using Basically.Infrastructure;
using LiteDB;

namespace Basically.Controllers
{
    public class SiteController : Controller
    {
        private IConnector db;
        public SiteController(IConnector Connector)
        {
            db = Connector;
        }

        [HttpPost]
        public JsonResult List(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = " ")
        {
            try
            {
                //PW: return ordered list, sliced, chucked and ordered
                string[] OrderOptions = jtSorting.ToLower().Split(" ");
                var SiteList = db.List<Site>().FindAll();
                int TotalRecords = SiteList.Count();
                IEnumerable<Site> OrderedList; 
                if (OrderOptions[1] == "asc") {
                    OrderedList = SiteList.OrderBy(s => s.GetType().GetProperty(OrderOptions[0]).GetValue(s));
                } else {
                    OrderedList = SiteList.OrderByDescending(s => s.GetType().GetProperty(OrderOptions[0]).GetValue(s));
                }
                var ChunkedSiteList = OrderedList.Skip(jtStartIndex).Take(jtPageSize);
                return Json(new { Result = "OK", Records = ChunkedSiteList, TotalRecordCount = SiteList.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create(Site Model) {

            try
            {
                db.Create(Model);
                return Json(new { Result = "OK" });
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
                db.Delete<Site>(_id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(Site Model)
        {
            try
            {
                //PW: Update model
                db.Update<Site>(Model);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}