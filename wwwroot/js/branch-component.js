//Base model ajax binder
//https://jsfiddle.net/q59s90oy/13/ tree effect posibility
//CSS branching https://codepen.io/yukulele/pen/KCvbi
// CSS triangles : https://codepen.io/yukulele/pen/KCvbi

Vue.component('branch-component', {
    beforeMount() {
    
    },
    created() {
        this.$on('success', function (message) {

        });
        this.$on('failure', function (message) {

        });
        this.$on('invalid', function (message) {

        });
        this.$on('created', function (message) {

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

//Component version to load recursive tree

Vue.component('branch-recursive-component', {
    props: {
        "parentId": {
            type: String,
            required: false,
            default: ""
        },
        "load": {
            type: Boolean,
            required: false,
            default: false
        },
        "root": {
            type: Boolean,
            required: false,
            default: false
        },
        "treeId": {
            required: true,
            type: String,
        }
    },
    beforeMount() {
        if (this.root) {
            this.getRoot();
        } else if (this.parentId !== "") {

        }
    },
    created() {
        this.$on('success', function (message) {

        });
        this.$on('failure', function (message) {

        });
        this.$on('invalid', function (message) {
    
        });
        this.$on('created', function (message) {

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
        getRoot: function () {
            let self = this;
            axios.post(this.controllerName("root"), { tree_id: this.treeId }).then(function (result) {
                if (result.data.status == "OK") {
                    self.records.push(result.data.record);
                    self.$emit("retrieved");
                } else {
                    self.$emit("failure", "Retrieving failed");
                }
            });
        }
    },
    template: `<ul class="branch-list">
                    <li v-for="branch in records">
                        <div>{{branch.name}}</div>
                        <branch-recursive-component :parent-id="record._id" :load="false" v-id="load"></branch-recursive-component>
                    </li>
               </ul>`,
    mixins: [crudBaseMixin]
});
