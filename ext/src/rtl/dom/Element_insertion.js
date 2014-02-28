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
Ext.define('Ext.rtl.dom.Element_insertion', {
    override: 'Ext.dom.Element',

    wrap: function() {
        var parent = this.parent(),
            rtlCls = Ext.baseCSSPrefix + 'rtl',
            ltrCls = Ext.baseCSSPrefix + 'ltr',
            wrapEl = this.callParent(arguments),
            cls;

        // if the parentNode of the element being wrapped has the "x-rtl" or "x-ltr" css
        // class, then add that class to the wrapper as well.  This ensures that descendant
        // and child selectors still apply e.g. ".x-rtl > .x-foo" or ".x-ltr .x-foo"
        if (parent.hasCls(rtlCls)) {
            cls = rtlCls;
        } else if (parent.hasCls(ltrCls)) {
            cls = ltrCls;
        }

        if (cls) {
            // superclass method may return dom, so use fly() to access the wrap el
            Ext.fly(wrapEl, '_wrap').addCls(cls);
        }

        return wrapEl;
    }
});