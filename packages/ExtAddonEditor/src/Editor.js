Ext.define('ExtAddonEditor.Editor', {
	extend: 'Ext.Component',
	xtype: 'extaddoneditor',
	cls: 'extaddoneditor',

	initComponent: function(){
		
		if(!this.isScriptLoaded()){
			Ext.Loader.loadScript({
			    url: 'packages/ExtAddonEditor/src/libs/ace/ace-min.js',
			    scope: this,
			    onLoad: function() {
			    	this.initEditor();
			    },
			    onError: function() {
			       console.error("error loading", arguments);
			    } 
			});
		}

	},
	isScriptLoaded: function(){
		var s = document.getElementsByTagName("script");
		var header_already_added = false;

		for (var i=0; i< s.length; i++){
		      if (s[i].src.indexOf('ace-min.js') !== -1){
				header_already_added = true;
		      }
		}
		return header_already_added;
	},
	initEditor: function(pre){
    	var pre = Ext.query('pre.runnable'),
    		i = 0;

    	for(i; i<pre.length; i++){
    		var editor = ace.edit(pre[i]);
			editor.setTheme("ace/theme/textmate");
			editor.setFontSize(16);
			editor.setDisplayIndentGuides(true);
			editor.renderer.setShowPrintMargin(false);
			editor.session.setTabSize(4);
			this.setEditorMode(pre[i], editor);
    	}
	},
	setEditorMode: function(pre, editor){
		var pre = Ext.get(pre),
			mode = "ace/mode/javascript";


		if(pre.hasCls('xml')){
			mode = "ace/mode/xml";
		} else if(pre.hasCls('json')){
			mode = "ace/mode/json";
		} else if(pre.hasCls('css')){
			mode = "ace/mode/css";
		} else if(pre.hasCls('sass')){
			mode = "ace/mode/sass";
		} else if(pre.hasCls('html')){
			mode = "ace/mode/html";
		} else if(pre.hasCls('readonly')){
			mode = "ace/mode/text";
			editor.setReadOnly(true);

		} else if(pre.hasCls('touch')){
			//TODO
		}
		editor.getSession().setMode(mode);
	}
});