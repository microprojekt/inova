Ext.define('inova.store.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.users',
    storeId: 'store1',

    fields: [
        'name', 'email', 'phone'
    ],
    proxy: {
        type: 'rest',
        url: 'http://127.0.0.1:10010/bookmarks',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }

    },
    autoLoad:true,
    autoSync:true
});
