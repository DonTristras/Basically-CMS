//PW: Module for document tree
var documentApp = (function () {
    "use strict"
    var self = this;
    var element = null;
    var target = null;
    var site_id = null;

    var classes = {
        liClass: "document-item",
        ulClass: "document-list",
        loadMore: "load-more",
        loadLess: "load-less",
        childLoader: "child-loader"
    }

    var config = {
        //PW: definition
        element: null,
        targetWindow: null,
        site_id: null
    }
    //PW: initialization of module
    var init = function (config) {
        element = $(config.element);
        target = $(config.targetWindow);
        site_id = config.site_id;
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
                    //PW: Trigger load more event for root
                    $(classes.childLoader + ":first", element).trigger("click");
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
        bindClickEvent(loadMore, loadChildElements);
        bindClickEvent(loadMore, loadContent);
    };

    //PW:Click event binder for dom elements
    var bindClickEvent = function (elem, func) {
        $(elem).on("click", function () { func(elem); });
    };

    //PW: load content of document handler
    var loadContent = function (elem) {
        var form = formControllers;
        form.init({
            element: elem,
            documentID: $(elem).attr("data-id"),
            formDefinition: $(elem).attr("data-id")
        });
    };

    //PW: load or unload child document handler
    var loadChildElements = function (elem) {
        var liElem = $(elem).parent();//PW get parent li element
        if ($(elem).hasClass(classes.loadMore)) {
            getChildElements(liElem);
            $(elem).removeClass(classes.loadMore).addClass(classes.loadLess);//switch class
        } else if ($(elem).hasClass(classes.loadLess)){
            removeChildElements($(liElem).children("ul"));
            $(elem).removeClass(classes.loadLess).addClass(classes.loadMore);//switch class
        }
    };
    //PW: remove child docuemnts from tree
    var removeChildElements = function (parentElement) {
        $(parentElement).remove();
    };

    //PW: Invoke child documents and render in parent
    var getChildElements = function (parentElement) {
        $.ajax({
            url: '/Document/ListChildren',
            type: 'POST',
            async: true,
            dataType: "json",
            data: { 'parent_id': $(parentElement).attr("data-id") },
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
            bindClickEvent(loadMore, loadContent);
            if (value.childCount > 0) {
                var loadMore = loadMoreTemplate();
                $(document).append(loadMore);
                bindClickEvent(loadMore, loadChildElements);
            }
        });
        $(parentElement).append(renderedParent);
    };

    //PW: template for read more button
    var loadMoreTemplate = function () {
        var template = $("<span></span>").addClass(classes.loadMore).addClass(classes.childLoader);
        return template;
    };

    //PW: template for each list item element
    var renderTemplate = function (elem) {
        var template = $("<li></li>").addClass(classes.liClass).attr("data-id", elem.document._id).text(elem.document.name);
        return template;
    };

    //PW: template for each list element
    var renderWrapTemplate = function () {
        var template = $("<ul></ul>").addClass(classes.ulClass)
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
