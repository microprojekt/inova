/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('inova.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    init: function() {
        var token = localStorage.getItem('token');
        Ext.Ajax.setDefaultHeaders({
            'Authorization': token
        });
    },
    newWind: function(ime) {
        Ext.widget(ime.comp).show();
    },
    doLogout: function() {
        var view = this.getView();

        Ext.MessageBox.show({
            title: "",
            msg: "Are you sure to Log Out",
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.OKCANCEL,

            fn: function(buttonId) {
                if (buttonId === "ok") {
                    localStorage.removeItem('token');
                    view.destroy();
                    Ext.Ajax.setDefaultHeaders({
                        'Authorization': ' '
                    });
                    Ext.widget('login');
                }
            }
        });
    }
});
