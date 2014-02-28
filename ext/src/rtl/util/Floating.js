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
Ext.define('Ext.rtl.util.Floating', {
    override: 'Ext.util.Floating',
    requires: ['Ext.rtl.AbstractComponent'],
    
    constructor: function() {
        this.callParent(arguments);

        if (this.isLocalRtl()) {
            // set the rtl property on the Ext.Layer instance so it will use the correct
            // coordinate system when syncing shadow/shim
            this.el.setRtl(true);
        }
    }

});