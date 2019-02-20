//PW: Module for document form
//you can find form controlles in form-controllers.js ad add your own controllers
//
var formControllers = (function () {
    "use strict"

    var config = {
        element: null,
        itemClass: "form-control",
        documentID: null,
        dynamicModelID: null,
        controllers: []
    };

    var init = function (settings) {
        $.each(settings, function (index, value) {
            config[index] = value;
        });
        //pw: add controls
        config.controllers = Object.assign({}, controllerList);
        bindModel();
    };

    //PW: model builder
    var bindModel = function () {
        callDynamicModel();
        buildForm();
        bindForm();
    };

    var generateModelLayout = function (model) {
        formHeaderTemplate(model);
        $.each(model.form_controls, function (index, value) { //append each form control     
            var control = outerFormControlTemplate(value);
            $(config.element).append(control); // append control to target dom
        });
    };

    var formHeaderTemplate = function (model) {
        var elem = $("<h1></h1>").text(model.name);
        $(config.element).append(elem);
    };

    var outerFormControlTemplate = function (model) {
        var elem = $("<div></div>").addClass(config.itemClass);
        $(elem).data(model);
        return elem;
    };

    //PW: Call de DynamicObject definition
    var callDynamicModel = function () {
        $.ajax({
            url: 'https://api.jsonbin.io/b/5c6aab551198012fc89dc9ee/3',
            type: 'GET',
            async: false,
            dataType: "json",
            crossDomain: true,
            data: { 'model_id': config.dynamicModelID },
            success: function (data) {
                if (data.Result == "OK") {
                    generateModelLayout(data.Record);
                }
            },
            error: function () {
                errorHandler();
            }
        });
    };

    //PW: create
    var saveDocumentData = function () {
        $.ajax({
            url: 'https://api.jsonbin.io/b/5c6aab551198012fc89dc9ee/3',
            type: 'GET',
            async: false,
            dataType: "json",
            crossDomain: true,
            data: { 'model_id': config.dynamicModelID },
            success: function (data) {
                if (data.Result == "OK") {
                    generateModelLayout(data.Record);
                }
            },
            error: function () {
                errorHandler();
            }
        });
    };

    //PW: Call de document data
    var callDocumentData = function () {
        var result;
        $.ajax({
            url: 'https://api.jsonbin.io/b/5c6ae84f9dfbb91d71820e70/2',
            type: 'GET',
            async: false,
            dataType: "json",
            crossDomain: true,
            data: { 'model_id': config.dynamicModelID, "document_id": config.documentID },
            success: function (data) {
                if (data.Result == "OK") {
                    result = data.Record;
                }
            },
            error: function () {
                errorHandler();
            }
        });
        return result;
    };

    // build controller for each model property and bind data
    var buildForm = function () {
        $("." + config.itemClass, config.element).each(function (index, elem) {
            var controller = config.controllers[$(elem).data().control_name];
            controller.build(elem);
        });
    };

    //PW: Bind the data from the dynamic object to the form
    var bindForm = function () {
        var document = callDocumentData();
        $("." + config.itemClass, config.element).each(function (index, elem) {
            var controller = config.controllers[$(elem).data().control_name];
            controller.setValue(elem, document[$(elem).data().name]);
        });
    };

    //PW: Read the form and return the dynamic object
    var readForm = function () {
        var document = {};
        $("." + config.itemClass, config.element).each(function (index, elem) {
            var controller = config.controllers[$(elem).data().control_name];
            document[$(elem).data().name] = controller.getValue(elem);
        });
        return document;
    };

    var errorHandler = function () {
        alert("error");
    };

    return {
        init: init,
        bindForm: bindForm,
        readForm: readForm
    };
})();