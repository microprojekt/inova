Ext.define('inova.view.logiran.LogiranController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.logiran',
    init: function (){
    	var token = localStorage.getItem('token');
    	Ext.Ajax.setDefaultHeaders({
                    'Authorization': token
                });
    },
     doLogout: function(){
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


 }) 