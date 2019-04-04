﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Basically.Models;
using Basically.Infrastructure;
using LiteDB;
namespace Basically.Controllers
{
    public class TreeController : Controller
    {
        private IConnector db;
        public TreeController(IConnector Connector)
        {
            db = Connector;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Update()
        {
            return View();
        }


        [HttpPost]
        public JsonResult Get([FromBody]dynamic payload)
        {
            try
            {
                //PW: return model definition
                var Tree = db.List<Tree>().FindById((Guid)payload.id);
                return Json(new { status = "OK", record = Tree });
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
                var Trees = db.List<Tree>().FindAll();
                return Json(new { status = "OK", record = Trees });
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create([FromBody]Tree Model)
        {
            try
            {
                //PW: validate
                if (TryValidateModel(Model))
                {
                    db.Create(Model);
                    return Json(new { status = "OK" });
                }
                else {
                    return Json(new { status = "INVALID_DATA" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update([FromBody]Tree Model)
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
        public JsonResult Delete([FromBody]Tree Model)
        {
            try
            {
                //PW: remove model
                db.Delete<Tree>(Model._id);
                return Json(new { status = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }
    }
}