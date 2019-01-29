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
        private Connector _Conn;
        public HomeController(Connector Connector) {
            _Conn = Connector;
        }
        public IActionResult Index()
        {
            //Site _Site = new Site { Cultures = "en|es".Split("|").ToArray(), Name = "MySite" };
            //_Conn.Create(_Site);
            //Tree _tree = new Tree { Content = "some content", Name = "MyTree", Site = _Site };
            //_Conn.Create(_tree);


            //_Conn.Delete<Site>(_Site._id);
            var x = _Conn.List<Site>();
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
