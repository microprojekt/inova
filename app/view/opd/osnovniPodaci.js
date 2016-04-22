Ext.define('inova.view.opd.osnovniPodaci', {
    extend: 'Ext.window.Window',
    xtype: 'opd',
    height: 500,
    width: Ext.getBody().getWidth() - 60,
    minHeight: 300,
    minWidth: 300,
    layout: 'fit',
    modal: 'true',
    requires: [
        'inova.view.opd.osnovniPodaciController',
        'inova.view.opd.osnovniPodaciModel',
        'Ext.form.Panel'
    ],

    controller: 'opd-osnovnipodaci',
    viewModel: {
        type: 'opd-osnovnipodaci'
    },
    title: 'Osnovni Podaci',
    closable: true,
    items: [{
        itemId: 'formItem',
        xtype: 'form',
        items: [{
            xtype: 'textfield',
            name: 'full_name',
            fieldLabel: 'Puni naziv društva (tvrtke)'
        }, {
            xtype: 'textfield',
            name: 'short_name',
            fieldLabel: 'Skraćeni naziv društva (tvrtke)'
        }, {
            xtype: 'textfield',
            name: 'mb',
            fieldLabel: 'Matični broj subjekta'
        }, {
            xtype: 'textfield',
            name: 'oib',
            fieldLabel: 'OIB'
        }, {
            xtype: 'textfield',
            name: 'address',
            fieldLabel: 'Adresa'
        }, {
            xtype: 'textfield',
            name: 'fax',
            fieldLabel: 'Fax'
        }],
        buttons: [{
            text: 'Save',
            handler: function() {
                var form = this.up('.form');
                var data = form.getForm().getValues();
                Ext.Ajax.request({
                    url: 'http://127.0.0.1:10010/osnovni_podaci',
                    method: 'POST',
                    jsonData: data,
                    success: function(response) {
                        data = Ext.decode(response.responseText);
                        form.getForm().setValues(data);
                        Ext.Msg.alert('Success', 'Data saved');
                    },
                    failure: function() {
                        Ext.Msg.alert('Error', 'Greška u spremanju podataka');
                    }
                });
            }
        }]
    }]

});
