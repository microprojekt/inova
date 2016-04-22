var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToMoveEditor: 1,
    autoCancel: false
});
Ext.define('inova.view.sa.strateski', {
    extend: 'Ext.window.Window',
    xtype: 'strat',
    height: 500,
    width: Ext.getBody().getWidth() - 60,
    minHeight: 300,
    minWidth: 300,
    layout: 'fit',
    modal: 'true',
    buttonAlign: 'left',
    title: 'Strateški dokumenti i akti',
    titlePosition: 2,
    requires: [
        'inova.view.sa.strateskiController',
        'inova.view.sa.strateskiModel',
        'inova.store.StrateskiDokumenti',
        'Ext.data.proxy.Rest',
        'Ext.form.field.File',
        'Ext.form.Panel',
        'Ext.window.MessageBox',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],


    controller: 'sa-strateski',
    viewModel: {
        type: 'sa-strateski'
    },
    tbar: [{
        text: 'Upload file',
        buttonAlign: 'left',
        icon: 'ext/examples/classic/shared/icons/fam/addFile.png',
        handler: function() {
            console.log("Novi unos");
            var grid = this.up().up().down('.grid');
            store = grid.store;
            var r = store.getProxy().getModel();
            var r = Ext.create('inova.store.stratDocModel');
            store.insert(0, r);
        }

    }, {
        text: 'Delete',
        buttonAlign: 'right',
        handler: function() {
            console.log("Delete");
            var grid = this.up().up().down('.grid');
            store = grid.store;
            store.remove(store.first());
            
        }
    }],

    items: [{
            xtype: 'grid',
            plugins: [rowEditing],
            id: 'abc',
            store: {
                type: 'strDoc'
            },
            columns: [{
                    text: 'Id',
                    dataIndex: 'id',
                    flex: 1
                }, {
                    text: 'Naziv  dokumenta',
                    dataIndex: 'docname',
                    flex: 2
                }, {
                    text: 'Naziv datoteke',
                    dataIndex: 'filename',
                    flex: 2
                }, {
                    text: 'Autor',
                    dataIndex: 'autor',
                    flex: 2
                }, {
                    text: 'Preuzimanje',
                    xtype: 'actioncolumn',
                    flex: 1,
                    items: [{
                        icon: 'ext/examples/classic/shared/icons/fam/folder_go.png',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            filename = rec.get('filename');
                            //window.open('http://127.0.0.1:10010/downDoc/'+filename+'');

                            Ext.Ajax.request({
                                url: 'http://127.0.0.1:10010/downDoc/' + filename + '',
                                method: 'GET',
                                binary: true,
                                success: function(response) {
                                    var blob = new Blob([response.responseBytes]);
                                    var url = window.URL.createObjectURL(blob);
                                    console.log(url);
                                    var id = Ext.id();
                                    Ext.create('Ext.window.Window', {
                                        html: '<div height="100%" id="' + id + '" ><div height="100%" id="iframelayer' + id + '"></div></div>',
                                        height: 600,
                                        width: 800,
                                        id: 'aktiWin',
                                        modal: 'true',
                                        maximizable: true,
                                        draggable: true,
                                        fixedcenter: true,
                                        layout: 'fit'

                                    }).show();
                                    setTimeout("Ext.get('iframelayer" + id + "').update('<iframe src=\"" + url + "\" style=\"margin:0px; border: 0px; width: 100%; height: 589px \"></iframe>');", 400);


                                },
                                failure: function() {

                                }
                            })
                        }
                    }]

                }, {
                    xtype: 'actioncolumn',
                    text: 'Upload',
                    icon: 'ext/examples/classic/shared/icons/fam/boobs.png',
                    handler: function(grid, rowIndex, colIndex) {
                        console.log("aaa");
                        Ext.create('Ext.window.Window', {
                            height: 250,
                            width: 400,
                            modal: true,
                            fixedcenter: true,
                            items: [{
                                xtype: 'form',
                                id: 'formItem',
                                items: [{
                                    xtype: 'filefield',
                                    id: 'filefield',
                                    fieldLabel: 'Dokument:',
                                    name: 'file',
                                    labelWidth: 100,
                                    anchor: '100%',
                                    buttonText: 'Select File...',
                                    allowBlank: false
                                }]
                            }],
                            buttons: [{
                                text: 'Upload to server',
                                handler: function() {
                                    var myField = Ext.getCmp('formItem');
                                    var forma = myField.getForm();


                                    //console.log(data);
                                    if (forma.isValid()) {
                                        //var domFileItem = document.getElementById(aaaa.fileInputEl.id);
                                        var domFileItem = document.getElementById(this.up(".window").down('.filefield').fileInputEl.id);
                                        var uploadFile = domFileItem.files[0];

                                        var formData = new FormData();
                                        formData.append('document', uploadFile, uploadFile.name);
                                        //formData.append('textfield',textfieldData)

                                        xhr = new XMLHttpRequest();
                                        xhr.open('POST', 'http://127.0.0.1:10010/uploadDoc', true);
                                        var token = localStorage.getItem('token');
                                        xhr.setRequestHeader('Authorization', token);
                                        xhr.onload = function() {
                                            if (xhr.status === 200) {
                                                console.log('Upload Done', xhr.responseText);
                                            } else {
                                                alert('An error occurred!');
                                            }
                                        };
                                        xhr.send(formData);
                                        //console.log("poslan xhr");                                        
                                        /*
                                        Ext.Ajax.request({
                                            url: 'http://127.0.0.1:10010/uploadDoc',
                                            data: formData,
                                            processData: false,
                                            contentType: false,
                                            isUpload:true,
                                            method: 'POST',
                                            success: function(data) {
                                                alert(data);
                                            }
                                        });*/

                                    }
                                }
                            }]

                        }).show();

                    }
                }

            ],
        }]
        /*initComponent: function() {

            this.dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Novi unos',
                    scale: 'medium',
                    iconCls: 'addInvest',
                    handler: function() {
                        var grid = this.down('.grid');
                        store = grid.store;
                        var r = Ext.create('inova.store.stratDocModel');
                        store.insert(0, r);
                        //grid.cellEditing.startEdit(row:0,l0);
                        //store.sync();
                        //store.load({params: {id:1}});

                    },
                    scope: this
                }]
            }]

            this.callParent(arguments)
        }*/

});
