//Base model ajax binder
//https://jsfiddle.net/q59s90oy/13/ tree effect posibility
//CSS branching https://codepen.io/yukulele/pen/KCvbi
// CSS triangles : https://codepen.io/yukulele/pen/KCvbi

Vue.component('tree-component', {
    created() {
        //Event called when CRUD operation ran successfully
        this.$on('success', function (message) {
            //Add your success CRUD handling here
            alert(message);
        });
        //Event called when CRUD operation failed
        this.$on('failure', function (message) {
            //Add your failure CRUD handling here
            alert(message);
        });  
        //Event called when form is invalidated
        this.$on('invalid', function (message) {
            //Add your validation message
            alert(message);
        }); 
        this.$on('created', function (message) {
            //Reload form once created
            this.record = {};
        });
        this.$on('listed', function (message) {

        });
        this.$on('removed', function (message) {

        });
        this.$on('updated', function (message) {

        });
        this.$on('retrieved', function (message) {

        });
    },
    methods: {

    },
    mixins: [crudBaseMixin]
});
