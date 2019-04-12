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
    public class DynamicModelController : Controller
    {
        private IConnector db;
        public DynamicModelController(IConnector Connector)
        {
            db = Connector;
        }

        public IActionResult Index()
        {
            var fieldParams = new List<ConfigField>();
            fieldParams.Add(new ConfigField() { name = "someProp", value = "val1" });
            fieldParams.Add(new ConfigField() { name = "otherProp", value = "val2" });

            var formDefinition = new List<FormDefinition>();
            formDefinition.Add(new FormDefinition() { name = "Logo", config_fields = fieldParams, form_control = "textBox" });
            formDefinition.Add(new FormDefinition() { name = "Author", config_fields = fieldParams, form_control = "textBox" });
            
            //var updatable = db.GetByID<DynamicObject>(1);
            //updatable.form_controls[0].config_fields = fieldParams;
            //updatable.form_controls[1].config_fields = fieldParams;
            //db.Create(model);
            return View();
        }

        [HttpPost]
        public JsonResult Get(Guid model_id)
        {
            try
            {
                //PW: return model definition
                var Model = db.GetByID<Branch>(model_id);
                return Json(new { Result = "OK", Record = Model });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult List(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                //PW: return ordered list, sliced, chucked and ordered
                IEnumerable<Branch> SiteList = db.List<Branch>().FindAll();
                int TotalRecords = SiteList.Count();
                var ChunkedSiteList = SiteList.OrderByDynamic(jtSorting).Skip(jtStartIndex).Take(jtPageSize);
                return Json(new { Result = "OK", Records = ChunkedSiteList, TotalRecordCount = TotalRecords });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create(Branch Model)
        {

            try
            {
                db.Create(Model);
                return Json(new { Result = "OK", Record = Model });
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
                //db.Delete<DynamicModel>(_id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(Branch Model)
        {
            try
            {
                //PW: Update model
                db.Update<Branch>(Model);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}