Ext.define('ExtAddonEditor.Wrapper', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.layout.container.Card',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'ExtAddonEditor.Editor',
        'ExtAddonEditor.Previewer',
        'ExtAddonTogetherJS.Collaborate',
    ],

    xtype: 'extaddoneditorwrapper',
    cls: 'extaddoneditorwrapper',

    config: {
        snippet: '',
        framework: 'ext',
        mode: 'ace/mode/javascript'
    },

    tbar: [{
        xtype: 'combobox',
        store: [
            [0, 'Ext JS'],
            [1, 'Touch']
        ],
        value: 0,
        forceSelection: true,
        listeners: {
            change: function(combo){
                combo.up('extaddoneditorwrapper').getLayout().setActiveItem(combo.getValue());
            }
        }

    }, 
    {
        xtype: 'button',
        text: 'Preview',
        listeners: {
            click: function(btn){
                var me = btn.up('extaddoneditorwrapper');
                me.fireEvent('preview',me.getSnippet(), me.getFramework());
                me.getLayout().setActiveItem(1);
            }
        }
    },
    {
        xtype: 'tbfill'
    }, {
        xtype: 'extaddoncollaborate',
        title: 'Collaborate'
    }],

    layout: {
        type: 'card'
    },
    height: '100%',
    width: '100%',

    initComponent: function() {
        this.callParent();

        var items = [
        {
            xtype: 'extaddoneditor',
            snippet: this.getSnippet(),
            mode: this.getMode(),
            html: this.getSnippet()
        },
        {
            //xtype: 'extaddonpreviewer',
            xtype: 'container',
            layout: 'fit',
            style: 'background:blue',
            html: 'B'
        }];

        this.add(items);
    }
});