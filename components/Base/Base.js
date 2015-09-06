/**
 *
 * ͨ�÷���
 */
var $ = require("jquery");
var Base = {
    /**
     * ͨ��������ʽ
     */
    regStr :{
        telno       : /^1[3|4|5|8][0-9]\d{8}$/,                             //�ֻ���������
        email       : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,     //��������
        password    : /^[\w\W\d]{6,16}$/                                    //��������
    },
    /**
     * ��ȡ�����ǰ׺֧��
     *
     */
    prefixStyle : function(){
        var prefixStyle="";
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            transform = vendors[i] + 'ransform';
            if ( transform in document.createElement('div').style) {
                prefixStyle = ("-"+vendors[i].substr(0, vendors[i].length-1)+"-").replace("--","");
            }
        }
        return prefixStyle;
    },
    /**
     *
     * �ַ���
     * ����
     */
    isTest : function (value,regStr){
        if (regStr.test(value)) {
            return true;
        }
        return false;
    },
    /**
     *
     * ajax����·��
     * key
     */
    loadUrl : function(url,key,params){
        var result;
        $.ajax({
            url : url,
            data : params,
            dataType : 'json',
            async : false,
            success : function(data) {
                result = data[key];
            }
        });
        return result;
    }
}

module.exports = Base;