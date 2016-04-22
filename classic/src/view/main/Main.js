Ext.define('inova.view.main.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    xtype: 'app-main',
    controller: 'main',
    viewModel: 'main',
    requires: [
        'inova.view.main.MainController',
        'inova.view.main.MainModel',
        'inova.view.main.List'
    ],

    items: [

        {
            title: 'Inova',
            titleAlign: 'center',
            region: 'north'
        }, {
            title: 'Navigation',
            region: 'west',
            floatable: false,
            margin: '0,0,0,0',
            width: 150,
            minWidth: 100,
            maxWidth: 250,
            collapsible: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'button',
                text: 'LogOut',
                handler: 'doLogout'
            }, {
                xtype: 'button',
                text: 'Osnovni podaci',
                handler: 'newWind',
                comp: 'opd'
            }, {
                xtype: 'button',
                text: 'Strateski dokumenti',
                handler: 'newWind',
                comp: 'strat'
            }]
        }, {
            title: 'Main Content',
            collapsible: false,
            region: 'center',
            items: [
                { xtype: 'mainlist' }
            ]
        }
    ]
});
