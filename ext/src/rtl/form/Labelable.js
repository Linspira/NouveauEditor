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
Ext.define('Ext.rtl.form.Labelable', {
    override: 'Ext.form.Labelable',

    getLabelStyle: function(){
        var me = this,
            labelPad = me.labelPad,
            labelStyle = '';

        // Calculate label styles up front rather than in the Field layout for speed; this
        // is safe because label alignment/width/pad are not expected to change.
        if (me.labelAlign !== 'top') {
            if (me.labelWidth) {
                labelStyle = 'width:' + me.labelWidth + 'px;';
            }
            if (labelPad) {
                labelStyle += 'margin-left:' + labelPad + 'px;';
            }
        }

        return labelStyle + (me.labelStyle || '');
    }
});
