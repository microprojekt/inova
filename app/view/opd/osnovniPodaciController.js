Ext.define('inova.view.opd.osnovniPodaciController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.opd-osnovnipodaci',

    init: function() {
        Ext.Ajax.request({
            url: 'http://127.0.0.1:10010/osnovni_podaci',
            method: 'GET',
            success: function(data) {
                var form = Ext.ComponentQuery.query('#formItem')[0];
                data = JSON.parse(data.responseText);
                //console.log(data);
                form.getForm().setValues(data);
            }
        })
    }

});
