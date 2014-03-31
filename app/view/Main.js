Ext.define('CodeEditor.view.Main', {
    //extend: 'Ext.tab.Panel',
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    //extjs will query for pre.runnable HTML tags to kickstart the editor
    //run somewhere in your application after loading views: 
    //ExtAddonEditor.WrapperStarter.init() (see Application.js)
    items: [
    {
        xtype: 'panel',
        title: 'Demo JS editor',
        html: '<pre class="runnable">alert("Boo!");</pre>',
        flex: 1,
    },
    {
        xtype: 'panel',
        title: 'Demo splitscreen',
        html: '<pre class="runnable" style="width:50%;">function foo(){ //code 1 }</pre><pre class="runnable" style="width:50%; left: 50%;">function foo(){ //code 2 }</pre>',
        flex: 2
    }, 
    {
        xtype: 'panel',
        title: 'Demo CSS editor',
        html: '<pre class="runnable css">.cls: { position: absolute; }</spre>',
        flex: 1
    }

    ]
});