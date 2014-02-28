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
 * @private
 * A set of overrides required by the presence of the BufferedRenderer plugin.
 * 
 * These overrides of Ext.tree.View take into account the affect of a buffered renderer and
 * divert execution from the default course where necessary.
 */
Ext.define('Ext.grid.plugin.BufferedRendererTreeView', {
    override: 'Ext.tree.View',

    onRemove: function(store, records, indices, isMove, removeRange) {
        var me = this,
            bufferedRenderer = me.bufferedRenderer;

        // If there's a BufferedRenderer...
        if (me.rendered && bufferedRenderer) {

            // If it's a contiguous range, the replace processing can handle it.
            if (removeRange) {
                bufferedRenderer.onReplace(store, indices[0], records, []);
            }

            // Otherwise it's a refresh
            else {
                bufferedRenderer.refreshView();
            }
        } else {
            me.callParent([store, records, indices]);
        }
    }
});
