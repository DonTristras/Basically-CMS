//Create your own form inputs using vue components and reuse it anywhere
Vue.component('text-box-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        validationMessage: String,
        label: String,
        maxLength: Number,
        minLength: Number,
        required: Boolean,
        regex: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateMaxLength(this.model[this.field], this.maxLength)) {
                this.valid = false; return;
            }
            if (!this.validateMinLength(this.model[this.field], this.minLength)) {
                this.valid = false; return;
            }
            if (!this.validateRequired(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
            if (!this.validateRegex(this.model[this.field], this.regex)) {
                this.valid = false; return;
            }
        }
    },
    mixins: [validationMixin],
    template:
        `<div class="form-field">
            <label>{{ label }}</label>
            <input type="text" v-model="model[field]" v-on:keyup="validate()" :disabled="disabled"></input>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});

Vue.component('text-area-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        validationMessage: String,
        label: String,
        maxLength: Number,
        minLength: Number,
        required: Boolean,
        regex: String,
        wysiwyg: Boolean
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true,
            quillField: {}
        }
    },
    created: function () {
        let self = this;
        //Add required resources for wysiwyg with resource handler and run necesairy scripts
        if (typeof this.wysiwyg !== "undefined" && this.wysiwyg) {
            this.addResource("https://cdn.quilljs.com/1.3.6/quill.snow.css", "css");
            this.addResource("https://cdn.quilljs.com/1.3.6/quill.min.js", "js").then(function () {
                self.$data.quillField = new Quill(self.$el.getElementsByClassName("quilleditor")[0], {
                    modules: {
                        toolbar: [
                            ['bold', 'italic'],
                            ['link', 'blockquote', 'code-block', 'image'],
                            [{ list: 'ordered' }, { list: 'bullet' }]
                        ]
                    },
                    theme: 'snow'
                });
                // Update Quill editor with model data
                self.$data.quillField.root.innerHTML = self.model[self.field];
                // If Quill loaded make sure we update the model when WYSIWYG data has been updated
                self.$data.quillField.on('text-change', function (delta, source) {
                    self.model[self.field] = self.$data.quillField.root.innerHTML;
                });
            });
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateMaxLength(this.model[this.field], this.maxLength)) {
                this.valid = false; return;
            }
            if (!this.validateMinLength(this.model[this.field], this.minLength)) {
                this.valid = false; return;
            }
            if (!this.validateRequired(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
            if (!this.validateRegex(this.model[this.field], this.regex)) {
                this.valid = false; return;
            }
        }
    },
    mixins: [validationMixin, resourceHandlerMixin],
    template:
        `<div class="form-field">        
            <label>{{ label }}</label>
            <div v-if="wysiwyg" class="quilleditor"></div>
            <textarea v-if="!wysiwyg" v-model="model[field]" v-on:keyup="validate()"></textarea>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});

Vue.component('check-box-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        validationMessage: String,
        label: String,
        required: Boolean,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateChecked(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
        }
    },
    mixins: [validationMixin],
    template:
        `<div class="form-field">
            <label>{{ label }}</label>
            <input type="checkbox" v-model="model[field]" v-on:change="validate()" :disabled="disabled"/>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});

Vue.component('radio-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            required: true
        },
        validationMessage: String,
        label: String,
        path: String,
        required: Boolean,
        leaf: String,
        top: Number,
        size: Number,
        depth: Number,
        options: {},
        defaultOption: {},
        cmsController: String,
        cmsAction: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true,
            optionList: {} //Can be Array or object list
        }
    },
    created: function () {
        if (typeof this.options !== "undefined") { // check if there is a option list defined manually and use it
            this.optionList = this.options;
        } else if (typeof this.cmsController !== "undefined" && typeof this.cmsAction !== "undefined") { //check if there is a custom controller/action defined for CMS usage only
            this.cmsCall();
        } else if (typeof this.leaf !== "undefined") { //check leaf defined for dynamic usage
            this.leafCall();
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateRequired(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
        },
        setValue: function (value) {
            this.model[this.field] = value;
        },
        cmsCall: function () {
            let self = this;
            axios.post(this.cmsController + "/" + this.cmsAction, model).then(function (result) {
                if (result.data.status == "OK") {
                    self.$data.optionList = result.data.result;
                };
            });
        },
        leafCall: function () {
            let self = this;
            axios.post("/api/" + this.cmsController + "/" + this.cmsAction, model).then(function (result) {
                if (result.data.status == "OK") {
                    self.$data.optionList = result.data.result;
                };
            });
        }
    },
    mixins: [validationMixin],
    template:
        `<div class="form-field">
            <label>{{ label }}</label>
            <div v-if="typeof defaultOption !== 'undefined'">
                <input type="radio" :name="field" v-on:click="setValue(defaultOption.Key)" :disabled="disabled" :checked="typeof model[field] === 'undefined' || model[field] === '' ? true: false"/> {{ defaultOption.Value }}
            </div>
            <div v-if="!Array.isArray(optionList)" v-for="name, key in optionList">
                <input type="radio" :name="field" v-on:click="setValue(key)" :disabled="disabled" :checked="model[field] === key ? true : false "/> {{ name }}
            </div>
            <div v-if="Array.isArray(optionList)" v-for="key in optionList">
                <input type="radio" :name="field" v-on:click="setValue(key)" :disabled="disabled" :checked="model[field] === key ? true : false "/> {{ key }}
            </div>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});


Vue.component('dropdown-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            required: true
        },
        validationMessage: String,
        label: String,
        path: String,
        required: Boolean,
        leaf: String,
        top: Number,
        size: Number,
        depth: Number,
        options: {},
        defaultOption: {},
        cmsController: String,
        cmsAction: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true,
            optionList: {} //Can be Array or object list
        }
    },
    created: function () {
        if (typeof this.options !== "undefined") { // check if there is a option list defined manually and use it
            this.optionList = this.options;
        } else if (typeof this.cmsController !== "undefined" && typeof this.cmsAction !== "undefined") { //check if there is a custom controller/action defined for CMS usage only
            this.cmsCall();
        } else if (typeof this.leaf !== "undefined") { //check leaf defined for dynamic usage
            this.leafCall();
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateRequired(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
        },
        setValue: function (value) {
            this.model[this.field] = value;
        },
        cmsCall: function () {
            let self = this;
            axios.post(this.cmsController + "/" + this.cmsAction, model).then(function (result) {
                if (result.data.status == "OK") {
                    self.$data.optionList = result.data.result;
                };
            });
        },
        leafCall: function () {
            let self = this;
            axios.post("/api/" + this.cmsController + "/" + this.cmsAction, model).then(function (result) {
                if (result.data.status == "OK") {
                    self.$data.optionList = result.data.result;
                };
            });
        }
    },
    mixins: [validationMixin],
    template:
        `<div class="form-field">
            <label>{{ label }}</label>
                <select :disabled="disabled">
                    <option v-if="typeof defaultOption !== 'undefined'" :checked="typeof model[field] === 'undefined' || model[field] === '' ? true: false" :value="defaultOption.Key">  {{ defaultOption.Value }} </option>
                    <option v-if="!Array.isArray(optionList)" v-for="name, key in optionList"  :value="key" v-on:click="setValue(key)" :checked="model[field] === key ? true : false "> {{ name }} </option>
                    <option v-if="Array.isArray(optionList)" v-for="key in optionList"  :value="key" v-on:click="setValue(key)" :checked="model[field] === key ? true : false "> {{ key }} </option>
                </select>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});

Vue.component('calendar-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        validationMessage: String,
        label: String,
        required: Boolean,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateRequired(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
        }
    },
    mixins: [validationMixin],
    template:
        `<div class="form-field">
            <label>{{ label }}</label>
            <input type="date" v-model="model[field]" v-on:keyup="validate()" :disabled="disabled"></input>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});

Vue.component('input-selector-input', {
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        validationMessage: String,
        label: String,
        required: Boolean,
        defaultOption: {},
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            valid: true,
            isFormInput: true
        }
    },
    methods: {
        validate: function () {
            this.valid = true;
            if (!this.validateRequired(this.model[this.field], this.required)) {
                this.valid = false; return;
            }
        },
        formInputList: function () {
            let optionList = [];
            var components = Vue.options.components;
            for (var component in components) {
                //Check if child component is a valid form input and skip if false
                try {
                    var isFormInput = components[component].options.data().isFormInput;
                    if (typeof isFormInput !== "undefined" && isFormInput) {
                        //add form input to list
                        optionList.push(component);
                    }
                } catch (error) {
                   //Catch error to avoid system components undefined properties
                }
            }
            return optionList;
        }
    },
    mixins: [validationMixin],
    template:
        `<div class="form-field">
            <label>{{ label }}</label>
                <select :disabled="disabled">
                    <option v-if="typeof defaultOption !== 'undefined'" :checked="typeof model[field] === 'undefined' || model[field] === '' ? true: false" :value="defaultOption.Key">  {{ defaultOption.Value }} </option>
                    <option v-for="key in formInputList()"  :value="key" v-on:click="setValue(key)" :checked="model[field] === key ? true : false "> {{ key }} </option>
                </select>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});