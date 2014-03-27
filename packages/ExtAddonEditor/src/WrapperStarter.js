Ext.define('ExtAddonEditor.WrapperStarter', {
    singleton: true,
    requires: ['ExtAddonEditor.Wrapper'],

    init: function(){
        this.loadScripts(function(){
            var pre = Ext.query('pre.runnable'),
            i = 0;

            for(i; i<pre.length; i++){

                var p = Ext.get(pre[i]),
                    snippet = p.getHTML(),
                    parent = p.parent(),
                    mode,  //defaults to ace/mode/javascript
                    framework; //defaults to ext

                if(p.hasCls('touch')) framework = touch;

                if(p.hasCls('xml')){
                    mode = "ace/mode/xml";
                } else if(p.hasCls('json')){
                    mode = "ace/mode/json";
                } else if(p.hasCls('css')){
                    mode = "ace/mode/css";
                } else if(p.hasCls('sass')){
                    mode = "ace/mode/sass";
                } else if(p.hasCls('html')){
                    mode = "ace/mode/html";
                } else if(p.hasCls('readonly')){
                    mode = "ace/mode/text";
                }

                var w = Ext.create('ExtAddonEditor.Wrapper', {
                    snippet: snippet,
                    mode: mode,
                    framework: framework,
                    //contentEl: p.id
                    renderTo: parent
                });
                
                p.remove();
            };
        });
    },

    loadScripts: function(callback){
        if(!this.isScriptLoaded()){
            Ext.Loader.loadScript({
                url: 'packages/ExtAddonEditor/src/libs/ace/ace-min.js',
                scope: this,
                onLoad: function() {
                    callback();
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
    }
});