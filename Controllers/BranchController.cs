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
    public class BranchController : Controller
    {
        private IConnector db;
        public BranchController(IConnector Connector)
        {
            db = Connector;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Root([FromBody]dynamic payload)
        {
            try
            {
                Guid tree_id = (Guid)payload.tree_id;
                var Branch = db.List<Branch>();
                Branch.Include(x => x.is_root);
                //Branch.Include(x => x.tree._id == tree_id);
                return Json(new { status = "OK", record = Branch.FindOne(Query.All())});
            }
            catch (Exception ex)
            {
                return Json(new { status = "ERROR", message = ex.Message });
            }
        }

    }
}