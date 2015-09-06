var React = require("react");
var $ = require("jquery");
var SliderItem = require("./SliderItem");
var SliderPager = require("./SliderPager");

var SliderList = React.createClass({
        //��ʼ��״̬
        getInitialState :function(){
            return {
                isUpdate : false
            }
        },
        getDefaultProps :function(){
            return {
                isInit            : true,                     //�Ƿ��ǳ�ʼ״̬
                wWidth            : $(window).width(),        //��Ļ���
                wHeight           : $(window).height(),       //��Ļ�߶�
                sliderCount       : 0,                        //�õ�Ƭҳ��
                sliderIndex       : -1,                       //��ǰҳ
                sliderNext        : -1,                       //��һҳ
                indexDelate       : 0,                        //��ǰҳ��������
                nextDelate        : 0,                        //��һҳ��������
                isTouching        : false,                    //�Ƿ񻬶�����
                isTouchEnd        : false,                    //�Ƿ񻬶�����
                indexTranslate    : 0,                        //�л�λ��
                nextTranslate     : 0,                        //�л�λ��
                isSuccess         : false                     //�Ƿ��л��ɹ�
            }
        },
        /**
         * ҳ�滬��
         * @param index ��ǰҳλ��
         * @param isNext �Ƿ񻬵���һҳ
         * @param touchDelate   ��������
         */
        translatePage :function(index,isNext,touchDelate){
            this.props.isInit = false;
            this.props.sliderIndex = index;
            this.props.indexDelate = touchDelate/5;
            this.props.isTouching = true;
            this.props.isTouchEnd = false;
            this.props.sliderCount = this.props.sliders.length;
            this.props.isSuccess =false;
            /**
             * ��ȡ��������
             * ���»�������һ�ŵĳ�ʼλ��Ϊ  -this.props.wWidth
             * ���ϻ�������һ�ŵĳ�ʼλ��Ϊ  this.props.wWidth
             */
            if(isNext){
                this.props.sliderNext = index< (this.props.sliderCount-1) ? (this.props.sliderIndex + 1) : 0;
                this.props.nextDelate = this.props.isHorizontal ? (this.props.wWidth + touchDelate) : (this.props.wHeight + touchDelate);
            }else{
                this.props.sliderNext = index > 0 ? (this.props.sliderIndex - 1) : (this.props.sliderCount-1);
                this.props.nextDelate = this.props.isHorizontal ? (-this.props.wWidth + touchDelate) : (-this.props.wHeight + touchDelate);
            }
            /**
             * ����״̬
             */
            this.setState(
                {
                    isUpdate : !this.state.isUpdate
                }
            );
        },
        /**
         * �л��ɹ�
         * @param index ��ǰҳλ��
         * @param isNext �Ƿ񻬵���һҳ
         * @param touchDelate   ��������
         */
        translateSuccess : function(index, isNext,touchDelate){
            this.props.isSuccess = true;
            this.onTranslateEnd(index,isNext,touchDelate);
        },
        /**
         * �л�ʧ��
         * @param index ��ǰҳλ��
         * @param isNext �Ƿ񻬵���һҳ
         * @param touchDelate   ��������
         */
        translateFail : function(index, isNext,touchDelate){
            this.props.isSuccess = false;
            this.onTranslateEnd(index,isNext,touchDelate)
        },
        /**
         * ��������
         */
        onTranslateEnd : function(index,isNext,touchDelate,isSuccess){
            this.props.indexDelate = 0;
            this.props.isInit = false;
            this.props.sliderIndex = index;
            this.props.isTouching = false;
            this.props.isTouchEnd = true;
            /**
             * ������һҳ�������룺nextDelate��
             * ��ȡ����ʱ����һҳ�͵�ǰҳ��λ�ã�indexTranslate��nextTranslate
             */
            if(isNext){
                this.props.sliderNext = index< (this.props.sliderCount-1) ? (this.props.sliderIndex + 1) : 0;
                this.props.nextDelate = this.props.isHorizontal ? (this.props.wWidth + touchDelate) : (this.props.wHeight + touchDelate);
                if(this.props.isSuccess){
                    this.props.indexTranslate = this.props.isHorizontal ? (-this.props.wWidth) : (-this.props.wHeight);
                    this.props.nextTranslate = 0;
                }else{
                    this.props.nextTranslate = this.props.isHorizontal ? this.props.wWidth : this.props.wHeight;
                    this.props.indexTranslate = 0;
                }
            }else{
                this.props.sliderNext = index > 0 ? (this.props.sliderIndex - 1) : (this.props.sliderCount-1);
                this.props.nextDelate = this.props.isHorizontal ? (-this.props.wWidth + touchDelate) : (-this.props.wHeight + touchDelate);
                if(this.props.isSuccess){
                    this.props.indexTranslate = this.props.isHorizontal ? this.props.wWidth : this.props.wHeight;
                    this.props.nextTranslate = 0;
                }else{
                    this.props.nextTranslate = this.props.isHorizontal ? (-this.props.wWidth) : (-this.props.wHeight);
                    this.props.indexTranslate = 0;
                }
            }
            /**
             * ����״̬
             */
            this.setState(
                {
                    isUpdate : !this.state.isUpdate
                }
            );
        },

        render : function () {
            var $that = this;
            //��������õ�Ƭ��
            var SliderItems = this.props.sliders.map(function(sliderValue,index){

                //�Ƿ���ʾ
                var isShow = false;
                var zIndex = 0;
                var isTouchEnd = false;
                var endTranslate = 0;

                if($that.props.isInit && index==0){
                    isShow = true;
                }

                var dataTranslate = {
                    "translateDelate" : 0
                }
                if($that.props.sliderIndex == index){
                    dataTranslate = {
                        "translateDelate" : $that.props.indexDelate
                    }
                    isShow = true;
                    zIndex = 2;
                    isTouchEnd = $that.props.isTouchEnd;
                    endTranslate = $that.props.indexTranslate;
                }else if($that.props.sliderNext == index){
                    dataTranslate = {
                        "translateDelate" : $that.props.nextDelate
                    }
                    isShow =  true;
                    zIndex = 10;
                    isTouchEnd = $that.props.isTouchEnd;
                    endTranslate = $that.props.nextTranslate;
                }

                //�¼���
                var Events ={
                    onTranslatePage     : $that.translatePage,      //ҳ�����
                    onTranslateSuccess  : $that.translateSuccess,   //�л��ɹ�
                    onTranslateFail     : $that.translateFail    //�л�ʧ��
                }

                return (
                    <SliderItem image = {sliderValue}
                        {...dataTranslate}
                        {...Events}
                        zIndex = {zIndex}
                        index = {index}
                        isShow = {isShow}
                        isTouchEnd ={isTouchEnd}
                        isTouching = {$that.props.isTouching}
                        endTranslate = {endTranslate}
                        isHorizontal = {$that.props.isHorizontal}
                        />
                );
            })

            var Pager = "";
            if(this.props.isPager) {
                var Pager = this.props.sliders.map(function (sliderValue, index) {
                    var isActive = false;
                    if (($that.props.isInit && index == 0) || ($that.props.sliderNext == index && $that.props.isSuccess ) || ($that.props.sliderIndex == index && !$that.props.isSuccess)) {
                        isActive = true;
                    }

                    return (
                        < SliderPager isActive = {isActive} / >
                    )
                })
            }

            return (
                <div id="slider-inner">
                {SliderItems}
                    <div id="slider-page">
                        {Pager}
                    </div>
                </div>
            )
}
});

module.exports = SliderList;