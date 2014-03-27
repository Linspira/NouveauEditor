Ext.define('ExtAddonEditor.Editor', {
	extend: 'Ext.container.Container',
	xtype: 'extaddoneditor',
	cls: 'extaddoneditor',

    config: {
        snippet: '',
        framework: 'ext',
        mode: 'ace/mode/javascript'
    },

	initComponent: function(){
		var me = this;
        me.callParent();

		me.on('afterrender', function(){
        	var height = me.el.parent().parent().getHeight();
        	me.setHeight(height);
        });
        me.on('resize', function(){
        	var editor = ace.edit(me.getId());
         	editor.setTheme("ace/theme/textmate");
			editor.setFontSize(16);
			editor.setDisplayIndentGuides(true);
			editor.renderer.setShowPrintMargin(false);
			editor.session.setTabSize(4);
			editor.getSession().setMode(me.getMode());
			editor.resize();
        });
	}
});