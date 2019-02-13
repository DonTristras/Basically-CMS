//PW: In this file all the jquery written modules

//PW: Module for document tree
var documentApp = (function () {
    "use strict"
    var self = this;
    var element = null;
    var target = null;
    var site_id = $("#site-id").val();
    var liClass = "document-item";
    var ulClass = "document-list";

    var config = {
        //PW: definition
        element: null,
        targetWindow: null
    }
    //PW: initialization of module
    var init = function (config) {
        element = $(config.element);
        target = $(config.targetWindow);
        //PW: check if base element and target element exists in DOM
        if ($(element).length > 0 || $(target).length > 0 ) {
            loadRootElement();
        }
    };
    //PW: ajax root element request and render invoker (loads once)
    var getRootElement = function () {
        $.ajax({
            url: '/Document/GetRoot',
            type: 'POST',
            async: true,
            dataType: "json",
            data: { 'site_id': site_id },
            success: function (data) {
                if (data.Result == "OK") {
                    renderRootElement({ document: data.Record });
                }
            },
            error: function () {
                errorHandler();
            }
        });
        return;
    };
    //PW: root document handler caller
    var loadRootElement = function () {
        getRootElement();
    };
    //PW: Root document rendered and bind event listeners
    var renderRootElement = function (elem) {
        var renderedList = renderWrapTemplate();
        var renderedDocument = renderTemplate(elem);
        var loadMore = loadMoreTemplate();
        $(renderedDocument).append(loadMore);
        $(renderedList).append(renderedDocument);
        $(element).append(renderedList); 
        //PW: Bind listeners
        $(loadMore).on("click", loadChildElements(loadMore));
        $(renderedDocumentv).on("click", loadContent(renderedDocument));
    };

    //PW: load content of document handler
    var loadContent = function (elem) {

    };

    //PW: load or unload child document handler
    var loadChildElements = function () {
        if ($(this).hasClass("load-more")) {
            getChildElements(this);
        } else if($(this).hasClass("load-less")){
            removeChildElements(this);
        }
    };
    //PW: remove child docuemnts from tree
    var removeChildElements = function (parentElement) {

    };

    //PW: Invoke child documents and render in parent
    var getChildElements = function (parentElement) {
        $.ajax({
            url: '/Document/ListChildren',
            type: 'POST',
            async: true,
            dataType: "json",
            data: { 'parent_id': $(parentElement).attr(data - parentId) },
            success: function (data) {
                if (data.Result == "OK") {
                    renderChildElements(data.Records, parentElement);
                }
            },
            error: function () {
                errorHandler();
            }
        });
        return;
    };

    //PW: render child elements after ajax call and bind event listeners
    var renderChildElements = function (records, parentElement) {
        var renderedParent = renderWrapTemplate();
        $.each(records, function (index, value) {
            var document = renderTemplate(value);
            $(renderedParent).append(document);
            $(document).on("click", loadContent(document));
            if (record.childCount > 0) {
                var loadMore = loadMoreTemplate();
                $(document).append(loadMore);
                $(loadMore).on("click", loadChildElements(loadMore));
            }
        });
        $(parentElement).append(renderedParent);
    };

    //PW: template for read more button
    var loadMoreTemplate = function () {
        var template = $("<span></span>").addClass("load-more").text("+");
        return template;
    };

    //PW: template for each list item element
    var renderTemplate = function (elem) {
        var template = $("<li></li>").addClass(liClass).attr("data-id", elem.document._id).text(elem.document.name);
        return template;
    };

    //PW: template for each list element
    var renderWrapTemplate = function () {
        var template = $("<ul></ul>").addClass(ulClass)
        return template;
    };

    //PW: general error handler for ajax
    var errorHandler = function(){
        alert("Unable to load content");
    }

    return {
        init: init
        //anything else you want available
        //through myMessageApp.function()
        //or expose variables here too
    };

})();

//PW: Global Helpers
