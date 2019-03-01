var controllerList = {
    //PW: basic text input
    textBox: (function () {
        "use strict"
        // Mandatory
        var properties = [
            "displayName"
        ];
        // Mandatory
        var getValue = function (elem) {
            return $("input", elem).val();
        };
        // Mandatory
        var setValue = function (elem, value) {
            $("input", elem).val(value);
        };
        var build = function (elem) {
            // Add your html render here
            $(elem).append("<label></label>").text($(elem).data().config_fields.displayName);
            $(elem).append("<input></input>");
        };

        // Define public methods
        return {
            getValue: getValue,
            setValue: setValue,
            build: build,
            properties: properties
        };
    })(),
    textArea: (function () {
        "use strict"
        // Mandatory
        var properties = {
            "displayName": { value: "" }
        };
        // Mandatory
        var getValue = function (elem) {
            return $("textarea", elem).val();
        };
        // Mandatory
        var setValue = function (elem, value) {
            $("textarea", elem).val(value);
        };
        var build = function (elem) {
            // Add your html render here
            $(elem).append("<label></label>").text($(elem).data().config_fields.displayName);
            $(elem).append("<textarea></textarea>");
        };

        // Define public methods
        return {
            getValue: getValue,
            setValue: setValue,
            build: build,
            properties: properties
        };
    })()
};