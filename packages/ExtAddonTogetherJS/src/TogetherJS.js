Ext.define('ExtAddonTogetherJS.Collaborate', {
	extend: 'Ext.Component',
	xtype: 'extaddoncollaborate',
	cls: 'extaddoncollaborate',

	html: 'TODO: Collaborate - The toggle button will be included in this plugin. TODO2: Bug? Autostart can not be disabled?',

	initComponent: function(){
		
		TogetherJSConfig_useMinimizedCode = true;
		TogetherJSConfig_disableWebRTC = true;
		TogetherJSConfig_autoStart = false;
		TogetherJSConfig_siteName = "Nouveau Code Editor";
		TogetherJSConfig_toolName = "Collaboration";
		TogetherJSConfig_includeHashInUrl = true;
		TogetherJSConfig_dontShowClicks = true;
		TogetherJSConfig_suppressJoinConfirmation = true;
		TogetherJSConfig_suppressInvite = true;
		TogetherJSConfig_cloneClicks = true;

		Ext.Loader.loadScript({
		    url: 'packages/ExtAddonTogetherJS/src/libs/togetherjs/build/togetherjs-min.js',
		    scope: this,
		    onLoad: function() {
		    },
		    onError: function() {
		       console.error("error loading", arguments);
		    } 
		});

	},
	toggleWidget: function(){
		TogetherJS();
	}
});