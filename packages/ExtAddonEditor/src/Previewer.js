Ext.define('ExtAddonEditor.Previewer', {
	extend: 'Ext.Component',
	xtype: 'extaddonpreviewer',
	cls: 'extaddonpreviewer',

	config: {
		mode: null,
		snippet: null,
	},

	renderTpl: [
		'<iframe height="100%" width="100%" frameBorder="0"></iframe>',
    ],

	initializeHead: function(iframe) {

		var css = document.createElement('link'),
			script = document.createElement('script');

		css.rel = 'stylesheet';
		//css.href = url;
		script.type = 'text/javascript';
		//script.src = urls.libraryUrl;
		script.innerHTML = this.getSnippet();

		//iframe.head.appendChild(css);
		iframe.head.appendChild(script);
	},

    show: function () {
        var me = this;
        me.callParent();

        console.log(me.getSnippet(), me.getMode());
        var iframe = me.el.dom.lastChild.contentDocument;
        me.initializeHead(iframe);

    }
});