Ext.define('ExtAddonEditor.Wrapper', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.layout.container.Card',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'ExtAddonEditor.Editor',
        'ExtAddonEditor.Previewer',
        'ExtAddonTogetherJS.Collaborate',
        'Ext.ux.IFrame'
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
                var me = btn.up('extaddoneditorwrapper'),
                    editorId = me.down('extaddoneditor').getId(),
                    editor = ace.edit(editorId);

                //pass in the snippet to the configs of wrapper, editor and previewer
                me.setSnippet(editor.getSession().getValue());
                me.down('extaddoneditor').setSnippet(me.getSnippet());
                me.down('extaddonpreviewer').setSnippet(me.getSnippet());
                
                //toggle preview button
                if(btn.getText() == "Preview"){
                    btn.setText("Editor");
                    me.getLayout().setActiveItem(1);
                } else {
                    btn.setText("Preview");
                    me.getLayout().setActiveItem(0);
                }
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
            xtype:'extaddonpreviewer',
            framework: this.getFramework(),
            snippet: this.getSnippet(),
            mode: this.getMode()
        }];

        this.add(items);
    }
});