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
 * This class is used as a base class from which to derive Models used in Trees.
 */
Ext.define('Ext.data.TreeModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.NodeInterface'
    ],

    mixins: {
        queryable: 'Ext.Queryable'
    },

    /**
     * @cfg {String} [childType]
     * The class name of child nodes to create when reading child nodes from
     * raw data. By default the type configured into the TreeStore is used.
     *
     * This is one way of creating heterogeneous nodes in a tree.
     *
     * To do this through data types passed from the server, use the {@link Ext.data.reader.Reader#typeProperty}.
     *
     * for example in the case of a hidden root node, you'd use the default type at level zero. See {@link Ext.tree.Panel TreePanel}'s
     * documentation for an example.
     *
     * *Important*
     * If you are using this declaration on your tree models, and have a {@link Ext.tree.Panel#hiddenRoot hidden root node}, you
     * MUST create a special root model definition which declares the type of its children.
     *
     * If you allow the TreeStore to create a root node of the same type as the first level of *visible* nodes
     * then the reader will atempt to read the wrong type of child node for the root.
     *
     * Example:
     *
     *    Ext.define('myApp.World', {
     *        childType: 'Territory'
     *    });
     *
     *    ...
     *
     *    store: {
     *        id: 'myTreeStore',
     *        model: 'myApp.World' // The hidden root will know to create 'Territory' type children.
     *    }
     *
     * If the root is hidden, and the first level of visible nodes are going to be the `myApp.Territory` class,
     * then the hidden root must not be of the `myApp.Territory` class. Otherwise, it would try to read in the
     * territory data as its childType - most likely 'Country'.
     *
     */

     getRefItems: function() {
         return this.childNodes;
     },

     getRefOwner: function() {
         return this.parentNode;
     }
},
function () {
    Ext.data.NodeInterface.decorate(this);
});