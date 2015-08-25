var React = require("react");
var $ = require("jquery");
var SliderItem = require("./SliderItem");

var SliderList = React.createClass({
    //��ʼ��״̬
    getInitialState :function(){
        return {
            isSlider : false
        }
    },
    //��Ⱦ
    render : function () {
        var $that = this;
        //��������õ�Ƭ��
        var SliderItems = this.props.sliders.map(function(sliderValue,index){
            //Ĭ����ҳ��ʾ
            var isShow = false;
            if(!$that.state.isSlider && index==0){
                isShow = true;
            }
            return (
                <SliderItem dataImage = {sliderValue} dataIndex = {index} dataIsShow = {isShow} />
            );
        })

        return (
            <div id="slider-inner">
                {SliderItems}
            </div>
        )
    }
});

module.exports = SliderList;