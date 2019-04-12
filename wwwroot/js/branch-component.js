//Base model ajax binder
//https://jsfiddle.net/q59s90oy/13/ tree effect posibility
//CSS branching https://codepen.io/yukulele/pen/KCvbi
// CSS triangles : https://codepen.io/yukulele/pen/KCvbi

Vue.component('branch-component', {
    props: {
        "parentId": {
            type: String,
            required: true
        },
        "load": {
            type: Boolean,
            required: true
        }
    },
    beforeMount() {
    
    },
    created() {
        //Event called when CRUD operation run successfully
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
    watch: {
        load: function (newVal, oldVal) {
            if (newVal) {
                this.list();
            }
        }   
    },
    methods: {

    },
    template: `<ul class="branch-list">
                    <li v-for="branch in records">
                        <div>{{branch.name}}</div>
                        <branch-component :parent-id="" :load="false"></branch-component>
                    </li>
               </ul>`,
    mixins: [crudBaseMixin]
});
