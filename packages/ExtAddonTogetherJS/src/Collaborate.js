Ext.define('ExtAddonTogetherJS.Collaborate', {
	extend: 'Ext.form.Field',
	xtype: 'extaddoncollaborate',
	cls: 'extaddoncollaborate',

	onText: 'enabled',
	offText: 'disabled',
	fieldLabel: 'Collaborate',
	fieldName: 'onoffswitch',
	
	config: {
		checked: true
	},

	fieldSubTpl: [
        '<div class="onoffswitch">',
                '<input type="checkbox" class="onoffswitch-checkbox" id="{id}-input" name="{name}"',
                '<tpl if="checked"> checked="checked"</tpl>',
                '/>',
                '<label class="onoffswitch-label" for="{id}-input">',
                        '<span class="onoffswitch-inner" data-onText="{onText}" data-offText="{offText}"></span>',
                        '<span class="onoffswitch-switch"></span>',
                '</label>',
        '</div>'
    ],

	initComponent: function(){
		var me = this;
        me.callParent();

		TogetherJSConfig_useMinimizedCode = true;
		TogetherJSConfig_disableWebRTC = true;
		TogetherJSConfig_autoStart = false; //FIXME: DOESN'T WORK??? (note as soon as it works we need to store stuff in localstorage)
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

        me.listeners = {
		    el: {
		        change: function(ev, cb) {
		            me.checked = !me.checked;
		            me.setValue(me.checked);
		            TogetherJS();
		            
		        },
		        delegate: 'div.onoffswitch'
		    }
		};

	},
	beforeRender: function () {
	    var me = this;
	    me.callParent();

	    // Apply the renderData to the template args
	    Ext.applyIf(me.subTplData, {
	        onText: me.onText,
	        offText: me.offText,
	        name: me.fieldName,
	        checked: me.checked,
	        id: me.id
	    });
	}
});