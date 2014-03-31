Ext.define('ExtAddonEditor.Previewer', {
	extend: 'Ext.Component',
	xtype: 'extaddonpreviewer',
	cls: 'extaddonpreviewer',

	config: {
		mode: null,
		snippet: null,
		urls: {
			touch: {
				cssUrls: [
					'//extjs.cachefly.net/touch/sencha-touch-2.3.1/gpl/resources/css/sencha-touch.css'
				],
				libraryUrl: '//extjs.cachefly.net/touch/sencha-touch-2.3.1/gpl/sencha-touch-all-debug.js',
			},
			ext: {
				cssUrls: ['//cdn.sencha.io/ext/gpl/4.2.0/resources/css/ext-all-neptune.css'],
				libraryUrl: '//cdn.sencha.com/ext/gpl/4.2.0/ext-all-debug.js',
			}
		},
	},

	renderTpl: [
		'<iframe height="100%" width="100%" frameBorder="0"><!DOCTYPE html></iframe>',
    ],

	initializeHead: function(iframe) {
		console.log(iframe);
		iframe.head.innerHTML = "";

		var me = this,
			css = document.createElement('link'),
			scriptFramework = document.createElement('script');

		css.rel = 'stylesheet';
		scriptFramework.type = 'text/javascript';	
		css.href = me.urls.touch.cssUrls[0];
		scriptFramework.src = me.urls.touch.libraryUrl;

		iframe.write('<!doctype HTML>\n' + iframe.head.outerHTML + iframe.body.outerHTML);
		iframe.head.appendChild(css);
		iframe.head.appendChild(scriptFramework);
	},
	appendMyCode: function(iframe){
		var me = this,
			script = iframe.createElement('script');
		
		iframe.body.innerHTML = "";
		script.type = 'text/javascript';
		
		//script.innerHTML = "Ext.onReady(function() { " +
		//	this.getSnippet() + 
		//"});";
		//script.innerHTML = this.getSnippet();

		script.innerHTML = "Ext.application({name : 'Fiddle', launch : function() { " +
			this.getSnippet() +
    	"}});"

		iframe.body.appendChild(script);
	},
    onRender: function () {
        var me = this,
        	iframe = me.el.dom.lastChild.contentDocument;
       
        me.callParent();
        me.initializeHead(iframe);
    },
    show: function(){
		var me = this,
			iframe = me.el.dom.lastChild.contentDocument; 
	   me.callParent();

       console.log(iframe);
       me.appendMyCode(iframe); 	
    }
});