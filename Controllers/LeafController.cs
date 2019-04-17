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
    public class LeafController : Controller
    {
        private IConnector db;
        public LeafController(IConnector Connector)
        {
            db = Connector;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Update()
        {
            return View();
        }
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Get([FromBody]dynamic payload)
        {
            try
            {
                //PW: return model definition
                var Leaf = db.List<Leaf>().FindById((Guid)payload.id);
                return Json(new { status = "OK", record = Leaf });
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult List()
        {
            try
            {
                //PW: return model definition
                var Trees = db.List<Leaf>().FindAll();
                return Json(new { status = "OK", record = Trees });
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create([FromBody]Leaf Model)
        {
            try
            {
                //PW: validate
                if (TryValidateModel(Model))
                {
                    Guid GeneratedTreeId = db.Create(Model);

                    return Json(new { status = "OK" });
                }
                else
                {
                    return Json(new { status = "INVALID_DATA" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update([FromBody]Leaf Model)
        {
            try
            {
                //PW: Validate
                if (TryValidateModel(Model))
                {
                    db.Update(Model);
                    return Json(new { status = "OK" });
                }
                else
                {
                    return Json(new { status = "INVALID_DATA" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete([FromBody]Leaf Model)
        {
            try
            {
                //PW: remove model
                db.Delete<Leaf>(Model._id);
                return Json(new { status = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }
    }
}