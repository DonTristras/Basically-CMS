//PW: Model editor 
//Requires VUE.JS
var model = {};
populateModel();

var dynamicModelApp = new Vue({
    el: '#dynamicmodel',
    components: {
        "model": model
    },
    data: model,
    methods: {
        addField: function (item) {
            item.push({ wea: 4 });
        },
        deleteField: function (item, index) {
            item.splice(index, 1);
        }
    },
    computed: {
        controllerNames: function () {
            return Object.getOwnPropertyNames(controllerList);
        }
    }
})

function populateModel() {
    $.ajax({
        url: '/DynamicModel/Get',
        type: 'POST',
        async: false,
        dataType: "json",
        data: { "model_id": 5 },
        success: function (data) {
            if (data.Result == "OK") {
                //data.Record["controllerList"] = controllerList;
                model = data.Record;
            }
        }
    });
}

function updateModel() {
    $.ajax({
        url: '/DynamicModel/Update',
        type: 'POST',
        async: false,
        dataType: "json",
        data: { "model_id": 5 },
        success: function (data) {
            if (data.Result == "OK") {
                
            }
        }
    });
}