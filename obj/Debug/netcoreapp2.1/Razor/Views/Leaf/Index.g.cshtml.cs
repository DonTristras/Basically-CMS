#pragma checksum "C:\Users\pweinberger\Desktop\banners\source\Views\Leaf\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "78fd300fdcc03bb79fbcb02f954d17be856a9803"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Leaf_Index), @"mvc.1.0.view", @"/Views/Leaf/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Leaf/Index.cshtml", typeof(AspNetCore.Views_Leaf_Index))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\pweinberger\Desktop\banners\source\Views\_ViewImports.cshtml"
using Basically;

#line default
#line hidden
#line 2 "C:\Users\pweinberger\Desktop\banners\source\Views\_ViewImports.cshtml"
using Basically.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"78fd300fdcc03bb79fbcb02f954d17be856a9803", @"/Views/Leaf/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b6c351cad88bef47036122ec8b0fdcddd4780bf7", @"/Views/_ViewImports.cshtml")]
    public class Views_Leaf_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\pweinberger\Desktop\banners\source\Views\Leaf\Index.cshtml"
  
    ViewData["Title"] = "Leaves";

#line default
#line hidden
            BeginContext(44, 541, true);
            WriteLiteral(@"
<h2>Index</h2>

<leaf-component inline-template command=""list"">
    <section>
        <div  class=""col-md-3"">
            <div class=""leaf-tooling"">

            </div>
            <div v-for=""record in records"">
                <span v-on:click="""">{{ record.name }} {{ record._id }}</span>
            </div>
        </div>
        <div  class=""col-md-9"">
            <iframe src=""/leaf/update/03c3e0a6-8805-41ba-8cc6-f38525b0c926"" style=""height:100vh;width:100%;""></iframe>
        </div>
    </section>
</leaf-component>");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
