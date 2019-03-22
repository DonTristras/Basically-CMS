//Base model ajax binder
var apiURL = "/api/";
Vue.component('model-area', {
    props: ['controller', 'modelId', 'path', 'culture'],
    data: function () {
        return { model: {}, models: {} };
    },
    beforeMount() {
        this.bind();
    },
    methods: {
        get: function () {
            let self = this;
            axios.get(apiURL).then(function (result) {
                self.model = result.data.model;
            });
        },
        update: function () {
            let self = this;
            axios.put(apiURL).then(function (result) {
                self.model = result.data.model;
            });
        },
        create: function () {
            let self = this;
            axios.post(apiURL).then(function (result) {
                self.model = result.data.model;
            });
        },
        remove: function () {
            let self = this;
            axios.delete(apiURL).then(function (result) {
                self.model = result.data.model;
            });
        },
        bind: function () {
            this.call();
        },
        call: function () {
            let self = this;
            axios.get(apiURL + this.controller).then(function (result) {
                self.model = result.data.model;
            });
        }
    }
});
