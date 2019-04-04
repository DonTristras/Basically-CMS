//Mixins

// default crud routine mixins
var crudBaseMixin = {
    data: function () {
        return {
            record: {}, records: {}, options: {}
        };
    },
    props: {
        command: { //command can be CREATE|GET|UPDATE|DELETE|LIST
            type: String,
            required: true
        },
        id: { //Required when using CREATE|GET|UPDATE|DELETE command
            type: String
        },
        orderBy: { //Optional when using LIST command, accepts field name
            type: String
        },
        orderDirection: { //Optional when using LIST command, accepts [ASC,DESC]
            type: String
        },
        paginationSize: { //Optional when using LIST command
            type: Number
        }
    },
    beforeMount() {
        if (typeof this.command !== "undefined") {
            if (this.command === "LIST") {
                if (typeof this.orderDirection !== "undefined") {
                    this.$data.options["orderDirection"] = this.orderDirection;
                }
                if (typeof this.paginationSize !== "undefined") {
                    this.$data.options["paginationSize"] = this.paginationSize;
                }
                if (typeof this.orderBy !== "undefined") {
                    this.$data.options["orderBy"] = this.orderBy;
                }
                this.list();
            }
            if (this.command === "GET") {
                this.get(this.id);
            }
            if (this.command === "UPDATE") {
                this.get(this.id);
            }
        }
    },
    methods: {
        controllerName: function (action) {
            return "/" + this.$options.name.split("-")[0] + "/" + action;
        },
        get: function (id) {
            let self = this;
            axios.post(this.controllerName("get"), { "id": id }).then(function (result) {
                if (result.data.status == "OK") {
                    self.record = result.data.record;
                    self.$emit("retrieved");
                } else {
                    self.$emit("failure", "Retrieving failed");
                }
            });
        },
        update: function (model) {
            let self = this;
            let isValidated = true;
            //Check if all child components are validated
            this.$children.forEach(function (component) {
                //Check if child component is a valid form input and skip if false
                if (typeof component.isFormInput !== "undefined" && !component.isFormInput) {
                    return;
                }
                //Revalidate once more before checking
                component.validate();
                if (!component.valid) {
                    isValidated = false;
                    return;
                }
            })
            if (!isValidated) {
                this.$emit("invalid", "Validation failed");
                return;
            }
            axios.post(this.controllerName("update"), model).then(function (result) {
                if (result.data.status == "OK") {
                    self.$emit("success", "Updated successfully");
                    self.$emit("updated");
                } else {
                    self.$emit("failure", "Creation failed");
                }
            });
        },
        create: function (model) {
            let self = this;
            let isValidated = true;
            //Check if all child components are validated
            this.$children.forEach(function (component) {
                //Check if child component is a valid form input and skip if false
                if (typeof component.isFormInput !== "undefined" && !component.isFormInput) {
                    return;
                }
                //Revalidate once more before checking
                component.validate();
                if (!component.valid) {
                    isValidated = false;
                    return;
                }
            })
            if (!isValidated) {
                this.$emit("invalid","Validation failed");
                return;
            }
            axios.post(this.controllerName("create"), model).then(function (result) {
                if (result.data.status == "OK") {
                    self.$emit("success", "Created successfully");
                    self.$emit("created");
                } else {
                    self.$emit("failure", "Creation failed");
                }
            });
        },
        remove: function (model) {
            let self = this;
            axios.post(this.controllerName("delete"), model).then(function (result) {
                if (result.data.status == "OK") {
                    self.records.splice(self.records.indexOf(model), 1);
                    self.$emit("success", "Deleted successfully");
                    self.$emit("deleted");
                } else {
                    self.$emit("failure", "Deletion failed");
                }
            });
        },
        list: function () {
            let self = this;
            axios.post(this.controllerName("list")).then(function (result) {
                if (result.data.status == "OK") {
                    self.records = result.data.record;
                    self.$emit("listed");
                } else {
                    self.$emit("failure", "Listing failed");
                }
            });
        }
    }
};

//Validation mixins
var validationMixin = {
    methods: {
        //Validation for maximum string length
        validateMaxLength: function (value, length) {
            if (typeof length !== "undefined" && typeof value !== "undefined") {
                if (value.length > length) {
                    return false;
                }
                return true;
            }
            return true;
        },
        //Validation for minimum string length
        validateMinLength: function (value, length) {
            if (typeof length !== "undefined" && typeof value !== "undefined") {
                if (value.length < length) {
                    return false;
                }
                return true;
            }
            return true;
        },
        //Validation for required string value
        validateRequired: function (value, isRequired) {
            if (typeof isRequired !== "undefined" && isRequired) {
                if (typeof value === "undefined" || value === "") {
                    return false;
                }
            }
            return true;
        },
        //Validation for required boolean value
        validateChecked: function (value, isChecked) {
            if (typeof isChecked !== "undefined" && isChecked) {
                if (typeof value === "undefined" || !value) {
                    return false;
                }
            }
            return true;
        },
        //Validation for regex expression on value
        validateRegex: function (value, regex) {
            if (typeof regex !== "undefined") {
                return regex.test(value);
            }
            return true;
        }
    }
};
