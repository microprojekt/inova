Ext.define('inova.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    doLogin: function() {
        var me = this,
            view = this.getView(),
            form = view.down('form');


        Ext.Ajax.request({
            url: 'http://127.0.0.1:10010/',
            method: 'POST',
            jsonData: form.getValues(),

            success: function(response) {
                var data = Ext.decode(response.responseText);

                if (data.success === false) {
                    me.clearToken();
                    Ext.Msg.alert(data.message, 'Please check you entered information!!!');
                }
                if (data.token) {
                    view.destroy();

                    me.saveToken(data.token);
                    Ext.create({
                        xtype: 'app-main'
                    });
                }
            },
            failure: function() {
                me.clearToken();
                Ext.Msg.alert('Error', 'Username or Password not valid!');
            }
        });
    },

    saveToken: function(token) {
        localStorage.setItem('token', token);
    },

    clearToken: function() {
        localStorage.removeItem('token');
    }
});
