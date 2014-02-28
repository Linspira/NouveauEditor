Ext.define('CodeEditor.view.Main', {
    extend: 'Ext.tab.Panel',
    requires:[
        'Ext.tab.Panel',
        'ExtAddonEditor.Editor'
    ],
    
    layout: 'fit',

    xtype: 'app-main',
    deferredRender: false,

    items: [
    {
        xtype: 'extaddoneditor',
        title: 'JS editor',
        html: '<pre class="runnable">function foo(){ //example 1 }</pre>',
    },
    {
        xtype: 'extaddoneditor',
        title: '2 editors splitscreen',
        html: '<pre class="runnable" style="width:50%;">function foo(){ //code 1 }</pre><pre class="runnable" style="width:50%; left: 50%;">function foo(){ //code 2 }</pre>',
    }, {
        xtype: 'extaddoneditor',
        title: 'XML editor',
        html: '<pre class="runnable xml"><xml><option>CSS</option><option>XML</option><option>JSON</option><option>Sass</option><option>HTML</option></xml></spre>'
    },
    {
        xtype: 'extaddoneditor',
        title: 'CSS editor',
        html: '<pre class="runnable css">.cls: { position: absolute; }</spre>'
    },
    {
        xtype: 'extaddoneditor',
        title: 'Readonly',
        html: '<pre class="runnable readonly">Readonly</spre>'
    }

    ]
});