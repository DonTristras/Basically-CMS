//Base model ajax binder
//https://jsfiddle.net/q59s90oy/13/ tree effect posibility
//CSS branching https://codepen.io/yukulele/pen/KCvbi
// CSS triangles : https://codepen.io/yukulele/pen/KCvbi

Vue.component('tree-component', {
    data: function () {
        return { record: {}, records: {} };
    },
    beforeMount() {
        this.list();
    },
    mixins: [crudBaseMixin]
});
