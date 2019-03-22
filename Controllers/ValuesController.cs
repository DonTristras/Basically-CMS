using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Basically.Infrastructure;
using Basically.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Basically.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private IConnector db;
        public ValuesController(IConnector Connector)
        {
            db = Connector;
        }

        // GET: api/<controller>
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var controllerName = this.ControllerContext.RouteData.Values["controller"].ToString();
                IEnumerable<Tree> SiteList = db.List<Tree>().FindAll();
                //int TotalRecords = SiteList.Count();
                //var ChunkedSiteList = SiteList.OrderByDynamic(jtSorting).Skip(jtStartIndex).Take(jtPageSize);
                return Json(new { Result = "OK", Records = SiteList});
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            try
            {
                Tree SiteList = db.List<Tree>().FindById(id);
                return Json(new { Result = "OK", Model = SiteList });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
