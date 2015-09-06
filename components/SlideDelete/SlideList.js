var React = require("react");
var SlideItem = require("./SlideItem.js");

var SlideList = React.createClass({
    getInitialState : function(){
        return {
            isReset : false         //�Ƿ�����
        }
    },
    getDefaultProps : function(){
        return {
            deleteIndex : -1       //��ǰλ��
        }
    },
    setTranslateIndex : function(index,isTranslate){
        /**
         * ��������ѡ��isTranslate״̬
         */
        this.props.deleteIndex = index;
        this.props.slides[index].isTranslate = isTranslate;

        /**
         * ��������state��������Ⱦ
         */
        this.setState({
            isReset : !this.state.isReset
        });

    },
    render : function(){
        var $that = this;
        var slideItems = this.props.slides.map(function(slipValue,index){
            /**
             *��ȡѡ��� isTranslate ״̬
             */
            var isTranslate = $that.props.deleteIndex == index ? $that.props.slides[index].isTranslate : false;
            return (
              <SlideItem dataValue = {slipValue}
                        dataIndex={index}
                        isTranslate={isTranslate}
                        deleteIndex={$that.props.deleteIndex}
                        setTranslateFunc={$that.setTranslateIndex} />
            );
        })
        return (
            <ul className="list-slide-group list-slide-delete">
            {slideItems}
            </ul>
        )
    }
});

module.exports = SlideList;