//Mixins
var crudBaseMixin = {
    methods: {
        controllerName: function (action) {
            return "/" + this.$options.name.split("-")[0] + "/" + action;
        },
        get: function (id) {
            let self = this;
            axios.get(this.controllerName("get"), id).then(function (result) {
                self.model = result.data.model;
            });
        },
        update: function (model) {
            let self = this;
            axios.put(this.controllerName("update"), model).then(function (result) {
                self.model = result.data.model;
            });
        },
        create: function (model) {
            let self = this;
            axios.get(this.controllerName("create"), model).then(function (result) {
                if (result.status == "OK") {
                    alert("OKAY!!");
                } else {
                    alert("There has been an error");
                }
            });
        },
        remove: function (model) {
            let self = this;
            axios.post(this.controllerName("delete"), model).then(function (result) {
                if (result.data.status == "OK") {
                    self.records.splice(self.records.indexOf(model), 1);
                }
            });
        },
        list: function () {
            let self = this;
            axios.post(this.controllerName("list")).then(function (result) {
                if (result.data.status == "OK") {
                    self.records = result.data.record;
                }
            });
        }
    }
};
