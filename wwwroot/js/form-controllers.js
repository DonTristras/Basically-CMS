//PW: In this file you will find all form controllers for form inputs.
//You can add your own controllers here.

//PW: Module for document tree
var formControllers = (function () {
    "use strict"

    var config = {
        element: null,
        itemClass: ".form-control",
        documentID: null,
        formDefinition: null
    };

    var init = function (config) {
        config = config;
        bindModel();
    };

    //PW: model binder and builder handler
    var bindModel = function () {
        callDynamicModel();
        buildProperties();
    };

    var renderModelLayout = function (model) {
        $.each(model.form_controls, function (index, value) { //append each form control
            $(config).append(formControlTemplate(value));
        });
    };

    var formControlTemplate = function (control) {
        var elem = $("<div></div>");
        $(elem).attr("data-model", control.form_control);
        $.each(control.config_fields, function (index, value) { //append each custom property
            $(elem).attr("data-x-" + value.name, value.value);
        });
    }
    //PW: Call de DynamicObject definition
    var callDynamicModel = function () {
        $.ajax({
            url: '/DynamicObject/Index',
            type: 'POST',
            async: true,
            dataType: "json",
            data: { 'model_id': $(parentElement).attr("data-id") },
            success: function (data) {
                if (data.Result == "OK") {
                    renderModelLayout(data.Record);                  
                }
            },
            error: function () {
                errorHandler();
            }
        });
    };

    var loadedList = [];
    var buildProperties = function () {
        $(config.itemClass, config.element).each(function (elem) {
            loadedList.push(controllerList[$(elem).attr("data-formcontroller")].build(elem));
        });
    };
    var errorHandler = function () {
        alert("error");
    };

    return {
        init: init
    };
})();

var controllerList = {
    //PW: basic text input
    textBox: function () {
        // Mandatory
        var properties = {
            displayName: "Display Name"
        };
        // Mandatory
        var getValue = function () {
            return $(element).val();
        };
        // Mandatory
        var setValue = function (value) {
            $(element).val(value);
        };
        // Mandatory
        var element;
        var build = function (dom) {
            element = dom;
            $(element).append("<input></input>");
        };

        // Mandatory
        var bindData = function (value) {
            setValue(value);
        };

        // Define public methods
        return {
            getValue: getValue,
            setValue: setValue,
            build: build,
            bindData: bindData
        };
    }
};

