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
 * @class Ext.fx.target.CompositeElement
 * 
 * This class represents a animation target for a {@link Ext.CompositeElement}. It allows
 * each {@link Ext.Element} in the group to be animated as a whole. In general this class will not be
 * created directly, the {@link Ext.CompositeElement} will be passed to the animation and
 * and the appropriate target will be created.
 */
Ext.define('Ext.fx.target.CompositeElement', {

    /* Begin Definitions */

    extend: 'Ext.fx.target.Element',

    /* End Definitions */

    /**
     * @property {Boolean} isComposite
     * `true` in this class to identify an object as an instantiated CompositeElement, or subclass thereof.
     */
    isComposite: true,
    
    constructor: function(target) {
        target.id = target.id || Ext.id(null, 'ext-composite-');
        this.callParent([target]);
    },

    getAttr: function(attr, val) {
        var out      = [],
            target = this.target,
            elements = target.elements,
            length   = elements.length,
            i,
            el;

        for (i = 0; i < length; i++) {
            el = elements[i];

            if (el) {
                el = target.getElement(el);
                out.push([el, this.getElVal(el, attr, val)]);
            }
        }

        return out;
    },
    
    setAttr: function(targetData){
        var target = this.target,
            ln = targetData.length,
            elements = target.elements,
            ln3 = elements.length,
            value, k,
            attrs, attr, o, i, j, ln2;
            
        for (i = 0; i < ln; i++) {
            attrs = targetData[i].attrs;
            for (attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    ln2 = attrs[attr].length;
                    for (j = 0; j < ln2; j++) {
                        value = attrs[attr][j][1];
                        for (k = 0; k < ln3; ++k) {
                            el = elements[k];
                            if (el) {
                                el = target.getElement(el);
                                this.setElVal(el, attr, value);
                            }
                        }
                    }
                }
            }
        }
    },
    
    remove: function() {
        this.target.remove();
    }
});
