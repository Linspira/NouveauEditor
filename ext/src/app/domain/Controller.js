/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-11-27 16:09:06 (442b014c6577919c9fc45878b2cf7670dd932e86)
*/
/**
 * This class implements the controller event domain. All classes extending from
 * {@link Ext.app.Controller} are included in this domain. The selectors are simply id's or the
 * wildcard "*" to match any controller.
 * 
 * @private
 */
Ext.define('Ext.app.domain.Controller', {
    extend: 'Ext.app.EventDomain',
    singleton: true,

    requires: [
        'Ext.app.Controller'
    ],

    type: 'controller',
    idProperty: 'id',

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.app.Controller);
    }
});
