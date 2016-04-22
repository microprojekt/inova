/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('inova.Application', {
    extend: 'Ext.app.Application',    
    
    name: 'inova',  

    views: [
        'login.Login',        
        'inova.view.main.Main'        
    ],
        
    launch: function () {
        var token = localStorage.getItem('token');        
        if(token){
            Ext.Ajax.setDefaultHeaders({
                'Authorization': token
            });    
            Ext.create({
                xtype: 'app-main'
            }); 
        }
        else {
            Ext.widget('login');                       
        }  
    }
});
