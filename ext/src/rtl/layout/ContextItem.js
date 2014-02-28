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
 * @override Ext.rtl.layout.ContextItem
 * This override adds RTL support to Ext.layout.ContextItem.
 */
Ext.define('Ext.rtl.layout.ContextItem', {
    override: 'Ext.layout.ContextItem',

    addPositionStyles: function(styles, props) {
        var x = props.x,
            y = props.y,
            count = 0;

        if (x !== undefined) {
            styles[this.parent.target.getHierarchyState().rtl ? 'right' : 'left'] = x + 'px';
            ++count;
        }
        if (y !== undefined) {
            styles.top = y + 'px';
            ++count;
        }
        return count;
    }

});