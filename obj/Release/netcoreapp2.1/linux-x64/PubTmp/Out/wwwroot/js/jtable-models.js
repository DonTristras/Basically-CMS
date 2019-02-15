// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//PW: Configure each jTable handler
$(function () {
    //PW: Configure sites
    $('#jtable-site').jtable({
        title: 'Sites',
        paging: true, //Enable paging
        pageSize: 10, //Set page size (default: 10)
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
                visible: false,
                list: false,
                list: true
            },
            name: {
                title: 'Name',
                width: '45%',
                list: true,
                edit: true
            },
            domain: {
                title: 'Domain Name',
                width: '45%',
                list: true,
                edit: true
            },
            Tree: {
                title: 'Tree',
                width: '10%',
                sorting: false,
                edit: false,
                create: false,
                display: function (data) {
                    return $('<a href="/Document/Index?site_id=' + data.record._id + '"><i class="fas fa-stream"></i></a>');
                }
            }

        }
    }).jtable('load');

    //PW: Configure documents
    $('#jtable-document').jtable({
        title: 'Sites',
        paging: true, //Enable paging
        pageSize: 10, //Set page size (default: 10)
        sorting: true, //Enable sorting
        defaultSorting: 'name ASC', //Set default sorting
        actions: {
            listAction: '/Document/List',
            createAction: '/Document/Create',
            updateAction: '/Document/Update',
            deleteAction: '/Document/Delete'
        },
        fields: {
            _id: {
                key: true,
                visible: false,
                list: false,
                list: true
            },
            name: {
                title: 'Name',
                list: true,
                edit: true
            },
            order: {
                title: 'Order',
                list: true,
                edit: true
            },
            level: {
                title: 'Level',
                list: true,
                edit: true
            },
            content: {
                title: 'Content',
                list: true,
                edit: true,
                defaultValue: $("#site-id").val()
            },
            parent_id: {
                title: 'Parent',
                list: true,
                edit: true
            },
            site: {
                title: 'Site',
                edit: false,
                list: false,
                display: false,
                defaultValue: $("#site-id").val()
            }
        }
    }).jtable('load');
})