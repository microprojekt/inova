Ext.define('inova.view.logiran.Logiran', {
    extend: 'Ext.tab.Panel',
    xtype: 'logiran',
    requires: [
        'inova.view.logiran.LogiranController',
        'inova.store.Users',
        'Ext.data.proxy.Rest'
        ],
        
    plugins: 'viewport',

    controller: 'logiran',

    layout: 'center',
    tabBar: {
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'button',
                text: 'LogOut',
                listeners: {
                        click: 'doLogout'
                }
            }]
        },    
    items: [

        {
            xtype: 'grid',
            title: 'Bookmarks',
            store: {
                    type: 'users'
                   },             
            columns: [
                { text: 'Name',  dataIndex: 'name', flex: 1 },
                { text: 'Email', dataIndex: 'email', flex: 1 },
                { text: 'Phone', dataIndex: 'phone', flex: 1 }
            ]          
        }
    ]
});