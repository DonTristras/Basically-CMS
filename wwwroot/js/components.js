//Base model ajax binder
Vue.component('model', {
    created: function () {

    },
    props: ['controller', 'action', 'id'],
    data: function () {
        return {
            "a": "b"
        }
    },
    methods: {
        get: function () {

        },
        update: function () {

        },
        create: function () {

        },
        remove: function () {

        },
        call: function (params) {
            return axios.get(params.url)
        }
    })
});