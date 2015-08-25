/**
 * �õ�Ƭ���
 */
var React = require("react");
var $ = require("jquery");
var SliderList = require("./SliderList.js");

var Slider = React.createClass({
    render : function(){
        var datas=[];
        var data_url = this.props.dataUrl;
        //ajax���ز�������
        $.ajax({
            url : data_url,
            dataType : 'json',
            async : false,
            success : function(data) {
                datas=data.images;
            }
        });

        return (
            <div id="slider">
                 <div id="loading"><img src="/public/images/loading.png" /></div>
                 <SliderList sliders = {datas}/>
            </div>
        )

    }
});

module.exports = Slider;