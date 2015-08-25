var React = require("react");

var SlideItem = React.createClass({
    getInitialState : function(){
        return { translateX : 0 }
    },
    getDefaultProps(){
        return {
            delateWidth  : 60,       //���η�Χ
            delateTrigger: 10,       //������Χ
            isTouchDown  : false,    //����Ƿ���
            startX       : 0,        //��꿪ʼ��λ��
            endX         : 0,        //����ͷŵ�λ��
            delateX      : 0,        //��껬���ľ���
            translateX   : 0,        //���η�Χ
            isUpdate     : false     //�Ƿ����
        }
    },
    onTouchStart : function(e){
        if(this.props.isTouchDown){
            return;
        }
        this.props.isTouchDown = true;
        var touch=window.event.touches[0]||window.event.changedTouches[0];
        this.props.startX = touch.pageX;
    },
    onTouchMove : function(e){
        if(!this.props.isTouchDown){
            return;
        }
        var touch=window.event.touches[0]||window.event.changedTouches[0];
        this.props.endX = touch.pageX;
        this.props.delateX = this.props.endX - this.props.startX;
        //��ȡ��������
        if(this.props.isTranslate){
            this.props.translateX = this.props.delateX < 0 ? -this.props.delateWidth :( this.props.delateX < this.props.delateWidth ? (this.props.delateX - this.props.delateWidth) : 0);
        }else{
            this.props.translateX = this.props.delateX > 0 ? 0 : (this.props.delateX > (-this.props.delateWidth) ? this.props.delateX : (-this.props.delateWidth));
        }
        //����״̬���������롿������������Ⱦ
        this.setState({
            translateX : this.props.translateX
        });
    },
    onTouchEnd : function(e){
        if(!this.props.isTouchDown){
            return;
        }

        /**
         * ����List����������״̬������������ȾList
         */
        if(this.props.delateX !=0){
            if((!this.props.isTranslate&&(this.props.delateX<(-this.props.delateTrigger)))
                     ||(this.props.isTranslate&&(this.props.delateX>this.props.delateTrigger))
            ){
                //�����ɹ����л�isTranslate״̬
                this.props.setTranslateFunc(this.props.dataIndex,!this.props.isTranslate);
            }else{
                this.props.setTranslateFunc(this.props.dataIndex,this.props.isTranslate);
            }
        }
    },
    onDelete : function(e){
        /**
         * ���ɾ��ʱ����
         * �������Է������׵�List����ɾ���¼���������Ⱦ
         */
        e.stopPropagation();
    },
    componentWillUpdate : function(){
        /**
         * ������Ⱦ��ʱ�򴥷�
         * ����ѡ��״̬Ϊ����
         */
        this.props.isUpdate = true;
    },
    render : function(e) {
        var styleElement;
        //�Ƿ�Ϊ����
        if (this.props.isUpdate) {
            styleElement = {
                transform: "translate(" + this.state.translateX + "px, 0px)"
            }
        }

        //�жϵ�ǰ���isTranslate ״̬
        if (this.props.dataIndex == this.props.deleteIndex&&this.props.isTranslate&&!this.props.isUpdate) {
            styleElement = {
                transform: "translate(" + (-this.props.delateWidth) + "px, 0px)"
            }
        }

        //�¼����
        var Events = {
            onTouchStart : this.onTouchStart,
            onTouchMove : this.onTouchMove,
            onTouchEnd : this.onTouchEnd
        }

        return (
                <li className="list-slip-item clearfix">
                    <div className="slip-item" {...Events}   style={styleElement}>
                    <div className="plus-desc">
                    <h2><i className={"fa fa-"+this.props.dataValue.letter}></i>{this.props.dataValue.name}</h2>
                    <p>{this.props.dataValue.keyword}</p>
                    </div>
                    <a href="javascript:;" className=" delete-item" onClick={this.onDelete}><i className="fa fa-trash-o fa-2x"></i></a>
                    </div>
                </li>
            )
    }
});
//�������
module.exports = SlideItem;