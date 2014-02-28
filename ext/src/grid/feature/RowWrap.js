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
 */
Ext.define('Ext.grid.feature.RowWrap', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.rowwrap',
    
    rowWrapTd: 'td.' + Ext.baseCSSPrefix + 'grid-rowwrap',
    
    // turn off feature events.
    hasFeatureEvent: false,
    
    tableTpl: {
        before: function(values, out) {
            if (values.view.bufferedRenderer) {
                values.view.bufferedRenderer.variableRowHeight = true;
            }
        },
        priority: 200
    },

    wrapTpl: [
        '<tr data-boundView="{view.id}" data-recordId="{record.internalId}" data-recordIndex="{recordIndex}" class="{[values.itemClasses.join(" ")]} ', Ext.baseCSSPrefix, 'grid-wrap-row" {ariaRowAttr}>',
            '<td class="', Ext.baseCSSPrefix, 'grid-rowwrap ', Ext.baseCSSPrefix, 'grid-td" {ariaCellAttr}>',
                '<table class="', Ext.baseCSSPrefix, '{view.id}-table ', Ext.baseCSSPrefix, 'grid-table" border="0" cellspacing="0" cellpadding="0" style="width:100%" {ariaCellInnerTableAttr}>',
                    '{[values.view.renderRowWrapColumnSizer(out)]}',
                    '{%',
                        'values.itemClasses.length = 0;',
                        'this.nextTpl.applyOut(values, out, parent)',
                    '%}',
                '</table>',
            '</td>',
        '</tr>', {
            priority: 200
        }
    ],

    getTargetSelector: function () {
        return this.itemSelector;
    },

    init: function(grid) {
        var me = this,
            view = me.view;

        view.addTableTpl(me.tableTpl);
        view.addRowTpl(Ext.XTemplate.getTpl(me, 'wrapTpl'));
        view.renderRowWrapColumnSizer = me.view.renderColumnSizer;
        view.renderColumnSizer = Ext.emptyFn;

        // Let the view know that it should use the itemSelector ancestor to retrieve the node
        // rather than the datarow selector.
        view.isRowWrapped = true;

        // When looking up the target selector, wrapped rows should always use the itemSelector.
        view.getTargetSelector = me.getTargetSelector;
    }});
