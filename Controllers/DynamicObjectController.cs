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
    public class DynamicObjectController : Controller
    {
        private IConnector db;
        public DynamicObjectController(IConnector Connector)
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
            var model = new DynamicObject()
            {
                name = "RootObject",             
                form_controls = formDefinition
            };
            //var updatable = db.GetByID<DynamicObject>(1);
            //updatable.form_controls[0].config_fields = fieldParams;
            //updatable.form_controls[1].config_fields = fieldParams;
            db.Create(model);
            return View();
        }

        [HttpPost]
        public JsonResult Get(int? model_id)
        {
            try
            {
                //PW: return model definition
                var Model = db.GetByID<DynamicObject>(model_id.Value);
                return Json(new { Result = "OK", Record = Model });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}