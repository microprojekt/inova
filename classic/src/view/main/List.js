/**
 * This view is an example list of people.
 */
Ext.define('inova.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'inova.store.Users',
        'Ext.data.proxy.Rest'
    ],   
    store: {
        type: 'users'
    },
    
    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ]
    
});
