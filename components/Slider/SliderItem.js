var React = require("react");

var SliderItem = React.createClass({
    getInitialState : function(){
      return {
          touchDelate : 0,        //��������
          startPos    : null,     //��ʼ����
          nowPos      : null,     //��������
          isTouchDown : false,    //�Ƿ����ڴ���
          isNext      : true      //�Ƿ���һҳ
      }
    },
    getDefaultProps : function(){
        return{
            delateWidth : 50,        //�ɹ�����
            isEnd       : false      //��������
        }
    },
    //��Ⱦ��ɺ�
    componentDidUpdate : function(){
        if(this.props.isTouchEnd){
            this.props.translateDelate = this.props.endTranslate;
            this.resetParam();
        }
    },
    resetParam : function(){
        /**
         * ���ò���
         */
        this.props.isTouchEnd = false;
        this.props.isEnd = true;
        this.setState({
            touchDelate : 0,
            startPos    : null,
            nowPos      : null,
            isTouchDown : false,
            isNext      : true
        });
    },
    onTouchStart : function(e){
        if(this.state.isTouchDown){
            return ;
        }
        this.state.isTouchDown = true;
        /**
         * ��ȡ��ʼ����������
         */
        var touch=window.event.touches[0]||window.event.changedTouches[0];

        this.setState({
            startPos : {
                x : touch.pageX,
                y : touch.pageY
            }
        });
    },
    onTouchMove : function(e){
        if(!this.state.isTouchDown){
            return;
        }
        //��ȡ��������
        var touch=window.event.touches[0]||window.event.changedTouches[0];
        this.setState({
            nowPos : {
                x : touch.pageX,
                y : touch.pageY
            }
        });

        if(this.props.isHorizontal){
            this.state.touchDelate = this.state.nowPos.x - this.state.startPos.x;
        }else{
            this.state.touchDelate = this.state.nowPos.y - this.state.startPos.y ;
        }

        this.state.isNext = this.state.touchDelate<0;

        if(Math.abs(this.state.touchDelate)>0){
            this.props.onTranslatePage(this.props.index, this.state.isNext, this.state.touchDelate);
        }


    },
    onTouchEnd : function(e){
        if(!this.state.isTouchDown){
            return;
        }
        //�ж��л��ɹ���
        if(Math.abs(this.state.touchDelate)>0) {
            if (Math.abs(this.state.touchDelate) > this.props.delateWidth) {
                this.props.onTranslateSuccess(this.props.index, this.state.isNext, this.state.touchDelate);
            } else {
                this.props.onTranslateFail(this.props.index, this.state.isNext, this.state.touchDelate);
            }
        }
    },
    render : function(){

        var translate = this.props.isHorizontal?'translate('+this.props.translateDelate+'px,0)' : 'translate(0,'+this.props.translateDelate+'px)';

        var styleElement ={
            "backgroundImage" : "url(" + this.props.image.src + ")",
            "transform" : translate,
            "zIndex" : this.props.zIndex
        }

        //Ϊ������ӹ���Ч��
        if(!this.props.isTouching){
            styleElement.transition = "all 0.3s";
        }
        var className  = this.props.isShow?"":"hide";

        //�¼����
        var Events = {
            onTouchStart : this.onTouchStart,
            onTouchMove : this.onTouchMove,
            onTouchEnd : this.onTouchEnd
        }

        return (
            <div className={"slider-item " + className }
                 style={styleElement}
                 {...Events}></div>
        )
    }
});

module.exports =  SliderItem;