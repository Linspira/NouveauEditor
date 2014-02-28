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
Ext.define('Ext.rtl.chart.Legend', {
    override: 'Ext.chart.Legend',
    
    init: function() {
        var me = this;   
        
        me.callParent(arguments);
        me.position = me.chart.invertPosition(me.position);    
        me.rtl = me.chart.getHierarchyState().rtl;  
    },
    
    updateItemDimensions: function() {
        var me = this,
            result = me.callParent(),
            padding = me.padding,
            spacing = me.itemSpacing,
            items = me.items,
            len = items.length,
            mfloor = Math.floor,
            width = result.totalWidth,
            usedWidth = 0,
            i, item, itemWidth;
            
        if (me.rtl && !me.isVertical) {
            for (i = 0; i < len; ++i) {
                item = items[i];
 
                // Set the item's position relative to the legend box
                itemWidth = mfloor(item.getBBox().width + spacing);
                item.x = -usedWidth + padding;
                usedWidth += itemWidth;
            }
        }
        return result;
    }
})
