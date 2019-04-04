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
        regex: String
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
            <input type="text" v-model="model[field]" v-on:keyup="validate()"></input>
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
        regex: String
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
            <textarea v-model="model[field]" v-on:keyup="validate()"></textarea>
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
        required: Boolean
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
            <input type="checkbox" v-model="model[field]" v-on:change="validate()"></textarea>
            <div class="field-warning" v-show="!valid">{{ validationMessage }}</div>
        </div>`
});