Ext.define('CodeEditor.view.Main', {
    extend: 'Ext.tab.Panel',
    requires:[
        'Ext.tab.Panel',
        'Ext.form.field.Checkbox',
        'ExtAddonEditor.Editor',
        'ExtAddonTogetherJS.Collaborate'
    ],
    
    layout: 'card',
    xtype: 'app-main',
    deferredRender: false,
    tabPosition: 'left',

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
                combo.up('app-main').getLayout().setActiveItem(combo.getValue());
            }
        }

    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'extaddoncollaborate',
        title: 'Collaborate'
    }],


    items: [
    {
        xtype: 'extaddoneditor',
        title: 'Demo JS editor',
        html: '<pre class="runnable">function foo(){ //example 1 }</pre>',
    },
    {
        xtype: 'extaddoneditor',
        title: 'Demo splitscreen',
        html: '<pre class="runnable" style="width:50%;">function foo(){ //code 1 }</pre><pre class="runnable" style="width:50%; left: 50%;">function foo(){ //code 2 }</pre>',
    }, 
    {
        xtype: 'extaddoneditor',
        title: 'Demo CSS editor',
        html: '<pre class="runnable css">.cls: { position: absolute; }</spre>'
    },
    {
        xtype: 'extaddoneditor',
        title: 'Demo Text',
        html: '<pre class="runnable readonly">Readonly</spre>'
    }

    ]
});