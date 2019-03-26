Vue.component('text-box-input', {
    props: ["validationMessage", "label", "model", "field"],
    methods: {
        validate: function () {
            alert(this.field);
        }
    },
    template: 
        `<div class="form-field">
                <div v-on:click="validate">fire field</div>
            <div class="field-warning">{{ validationMessage }}</div>
            <label>{{ label }}</label>
            <input type="text" v-model="model[field]"></input>
        </div>`
});