/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-11-27 16:09:06 (442b014c6577919c9fc45878b2cf7670dd932e86)
*/
/**
 * History management component that allows you to register arbitrary tokens that signify application
 * history state on navigation actions.  You can then handle the history {@link #change} event in order
 * to reset your application UI to the appropriate state when the user navigates forward or backward through
 * the browser history stack.
 *
 * ## Initializing
 *
 * The {@link #init} method of the History object must be called before using History. This sets up the internal
 * state and must be the first thing called before using History.
 */
Ext.define('Ext.util.History', {
    singleton: true,
    alternateClassName: 'Ext.History',
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @property
     * True to use `window.top.location.hash` or false to use `window.location.hash`. Must be set before {@link #init} is called
     * because the hashchange event listener is added to the window at initialization time.
     */
    useTopWindow: true,

    /**
     * @property
     * The id of the iframe required by IE to manage the history stack.
     */
    iframeId: Ext.baseCSSPrefix + 'history-frame',

    constructor: function() {
        var me = this,
            hash,
            newHash;

        // Must track history in an iframe to prevent back button from navigating away from the page in IE6, 7 and (8 & 9 quirks)
        me.oldIEMode = Ext.isIE7m || Ext.isIEQuirks && (Ext.isIE8 || Ext.isIE9);
        me.iframe = null;
        me.hiddenField = null;
        me.ready = false;
        me.currentToken = null;
        me.mixins.observable.constructor.call(me);
        me.onHashChange = function () {
            newHash = me.getHash();
            if (newHash !== hash) {
                hash = newHash;
                me.handleStateChange(hash);
            }
        };
    },

    getHash: function() {
        return this.win.location.hash.substr(1);
    },

    setHash: function (hash) {
        try {
            this.win.location.hash = hash;
        } catch (e) {
            // IE can give Access Denied (esp. in popup windows)
        }
    },

    handleStateChange: function(token) {
        this.currentToken = token;
        this.fireEvent('change', token);
    },

    updateIFrame: function(hash) {
        var iframe = this.iframe,
            doc = iframe && iframe.contentWindow && iframe.contentWindow.document;

        doc.open().close();
        doc.location.hash = hash;
        return true;
    },

    checkIFrame: function () {
        var me = this,
            contentWindow = me.iframe.contentWindow,
            oldToken, oldHash;

        if (!contentWindow || !contentWindow.document) {
            Ext.Function.defer(me.checkIFrame, 10, me);
            return;
        }

        oldToken = contentWindow.location.hash.substr(1);
        oldHash = me.getHash();

        Ext.TaskManager.start({
            run: function () {
                var newToken = contentWindow.location.hash.substr(1),
                    newHash = me.getHash();

                if (newToken !== oldToken) {
                    oldToken = newToken;
                    me.handleStateChange(newToken);
                    me.setHash(newToken);
                    oldHash = newToken;
                } else if (newHash !== oldHash) {
                    oldHash = newHash;
                    me.updateIFrame(newHash);
                }
            },
            interval: 50,
            scope: me
        });
        me.ready = true;
        me.fireEvent('ready', me);
    },

    startUp: function () {
        var me = this;

        me.currentToken = me.getHash();

        if (me.oldIEMode) {
            me.checkIFrame();
        } else {
            if (Ext.supports.Hashchange) {
                Ext.EventManager.on(me.win, 'hashchange', me.onHashChange);
            }
            else {
                Ext.TaskManager.start({
                    run: me.onHashChange,
                    interval: 50
                });
            }
            me.ready = true;
            me.fireEvent('ready', me);
        }
    },

    /**
     * Initializes the global History instance.
     * @param {Function} [onReady] A callback function that will be called once the history
     * component is fully initialized.
     * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
     * Defaults to the browser window.
     */
    init: function (onReady, scope) {
        var me = this;

        if (me.ready) {
            Ext.callback(onReady, scope, [me]);
            return;
        }

        if (!Ext.isReady) {
            Ext.onReady(function() {
                me.init(onReady, scope);
            });
            return;
        }

        me.win = me.useTopWindow ? window.top : window;
        if (me.oldIEMode) {
            me.iframe = Ext.getDom(me.iframeId);
            if (!me.iframe) {
                me.iframe = Ext.DomHelper.append(document.body, {
                    tag: 'iframe',
                    role: 'presentation',
                    id: me.iframeId,
                    style: 'display:none;',
                    src: Ext.SSL_SECURE_URL
                });
            }
        }

        me.addEvents(
            /**
             * @event ready
             * Fires when the Ext.util.History singleton has been initialized and is ready for use.
             * @param {Ext.util.History} The Ext.util.History singleton.
             */
            'ready',
            /**
             * @event change
             * Fires when navigation back or forwards within the local page's history occurs.
             * @param {String} token An identifier associated with the page state at that point in its history.
             */
            'change'
        );

        if (onReady) {
            me.on('ready', onReady, scope, {single: true});
        }
        me.startUp();
    },

    /**
     * Add a new token to the history stack. This can be any arbitrary value, although it would
     * commonly be the concatenation of a component id and another id marking the specific history
     * state of that component. Example usage:
     *
     *     // Handle tab changes on a TabPanel
     *     tabPanel.on('tabchange', function(tabPanel, tab){
     *          Ext.History.add(tabPanel.id + ':' + tab.id);
     *     });
     *
     * @param {String} token The value that defines a particular application-specific history state
     * @param {Boolean} [preventDuplicates=true] When true, if the passed token matches the current token
     * it will not save a new history step. Set to false if the same state can be saved more than once
     * at the same history stack location.
     */
    add: function (token, preventDuplicates) {
        var me = this;

        if (preventDuplicates !== false) {
            if (me.getToken() === token) {
                return true;
            }
        }

        if (me.oldIEMode) {
            return me.updateIFrame(token);
        } else {
            me.setHash(token);
            return true;
        }
    },

    /**
     * Programmatically steps back one step in browser history (equivalent to the user pressing the Back button).
     */
    back: function() {
        var win = this.useTopWindow ? window.top : window;
        win.history.go(-1);
    },

    /**
     * Programmatically steps forward one step in browser history (equivalent to the user pressing the Forward button).
     */
    forward: function(){
        var win = this.useTopWindow ? window.top : window;
        win.history.go(1);
    },

    /**
     * Retrieves the currently-active history token.
     * @return {String} The token
     */
    getToken: function() {
        return this.ready ? this.currentToken : this.getHash();
    }
});