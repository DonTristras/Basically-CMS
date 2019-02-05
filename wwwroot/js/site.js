// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//PW: Configure each jTable handler
$(function () {
    //PW: Configure sites
    $('#jtable-site').jtable({
        title: 'Sites',
        paging: true, //Enable paging
        pageSize: 2, //Set page size (default: 10)
        sorting: true, //Enable sorting
        defaultSorting: 'name ASC', //Set default sorting
        actions: {
            listAction: '/Site/List',
            createAction: '/Site/Create',
            updateAction: '/Site/Update',
            deleteAction: '/Site/Delete'
        },
        fields: {
            _id: {
                key: true,
                list: false,
                list: true
            },
            name: {
                title: 'Site Name',
                width: '50%',
                list: true,
                edit: true
            },
            domain: {
                title: 'Domain Name',
                width: '50%',
                list: true,
                edit: true
            }

        }
    });
    var x = $('#jtable-site').jtable('load');
})