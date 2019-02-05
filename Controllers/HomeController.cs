using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Basically.Models;
using Basically.Infrastructure;

namespace Basically.Controllers
{
    public class HomeController : Controller
    {
        private IConnector db;
        public HomeController(IConnector Connector)
        {
            db = Connector;
        }
        public IActionResult Index()
        {
            //Get list of Sites and return in a viewbag
            ViewBag.SiteList = db.List<Site>().FindAll();
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
