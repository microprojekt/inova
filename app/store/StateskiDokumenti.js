Ext.define('inova.store.stratDocModel',{
    extend:'Ext.data.Model',
    fields: [
        'id','docname', 'filename', 'autor'
    ]
});
Ext.define('inova.store.StrateskiDokumenti', {
    model:'inova.store.stratDocModel',
    extend: 'Ext.data.Store',
    alias: 'store.strDoc',
    storeId: 'TestStore',
    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        },
        url: 'http://127.0.0.1:10010/documents'
    },
    autoLoad: true,
    autoSync: true
});
