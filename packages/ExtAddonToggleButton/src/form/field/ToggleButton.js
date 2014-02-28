/* based on: http://proto.io/freebies/onoff/ */
Ext.define('ExtAddonToggleButton.form.field.ToggleButton', {
	extend: 'Ext.form.Field',
	xtype: 'extaddontogglebutton',
	
	onText: 'on',
	offText: 'off',
	fieldName: 'onoffswitch',
	
	config: {
		checked: false
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

	initComponent: function() {
	        var me = this;
	        me.callParent();

	        me.listeners = {
		    el: {
		        change: function(ev, cb) {
		            if(me.preventDefault){
		                Ext.EventObject.preventDefault();
		            }
		            me.checked = !me.checked;
		            me.setValue(me.checked);
		            
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