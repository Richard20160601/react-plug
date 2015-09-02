var React = require("react");
var $ = require("jquery");
var Base =require("Base");
//�����ǰ׺
var _prefixStyle = Base.prefixStyle();
var SlideTab = React.createClass({
    getInitialState : function(){
        return {
            isUpdate : false
        }
    },
    getDefaultProps : function(){
        return {
            isInit          : true,         //�Ƿ��ǵ�һ�γ�ʼ��
            isTouchDown     : false,        //�Ƿ���
            currentIndex    : 0,            //��ǰ��ʾ��tab
            tabItemsCount   : 0,            //tab�ĸ���
            tabWidth        : 0,            //�������
            isNext          : true,         //�Ƿ�����һ��
            startX          : 0,            //������ʼ��λ��
            endX            : 0,            //����������λ��
            touchDelateX    : 0,            //ˮƽ��������
            currentX        : 0,            //��ǰx
            left            : 0             //λ��
        }
    },
    //��Ⱦǰ�Ĳ���
    componentWillMount : function(){
        //��ȡtab����
        this.props.tabItemsCount = this.props.Links.length;
        this.props.tabWidth = $("#main-container").width();
        //����Ĭ��λ��
        this.props.currentX = (0-this.props.currentIndex)*this.props.tabWidth;
        this.props.left = this.props.currentX;
    },
    componentDidUpdate:function(){
        this.props.left = 0;
    },
    //��ʼ����
    onTouchStart : function(){
        if(this.props.isTouchDown){
            return;
        }
        this.props.isTouchDown = true;
        var touch=window.event.touches[0]||window.event.changedTouches[0];
        this.props.startX = touch.pageX;

    },
    //��������
    onTouchMove : function(){
        if(!this.props.isTouchDown){
            return;
        }
        var touch=window.event.touches[0]||window.event.changedTouches[0];
        this.props.endX = touch.pageX;
        this.props.touchDelateX = this.props.endX - this.props.startX;
        this.props.left = this.props.currentX + this.props.touchDelateX;

        //����״̬������Ⱦ
        this.setState({
            isUpdate : !this.state.isUpdate
        });

    },
    //��������
    onTouchEnd : function(){
        if(!this.props.isTouchDown){
            return;
        }

        /**
         * �ж���һ��tab����/��һ��tab����
         */
        if((this.props.touchDelateX < -10 && (this.props.currentIndex+1) <= this.props.tabItemsCount-1)||
           (this.props.touchDelateX > 10 && (this.props.currentIndex-1) >= 0)
        ){
            this.props.currentIndex += this.props.touchDelateX>0 ? -1:1;
        }

        //����λ��
        this.props.currentX = (0-this.props.currentIndex)*this.props.tabWidth;
        this.props.left = this.props.currentX;
        this.props.isTouchDown = false;
        this.props.startX = 0;
        this.props.endX = 0;
        this.props.touchDelateX = 0;
        this.setState({
            isUpdate : !this.state.isUpdate
        });
    },
    TabTo : function(index){
        this.props.currentX = (0-index)*this.props.tabWidth;
        this.props.currentIndex = index;
        this.props.left = this.props.currentX;
        this.setState({
            isUpdate : !this.state.isUpdate
        });
    },
    TabEnd : function(){
        this.props.isTouchDown = false;
    },
    render : function(){

        //����tab��ť

        var $that = this;
        var tabLinks=this.props.Links.map(function(linkValue,index){
            return (
                <div className={ $that.props.currentIndex==index?"active":""}
                    onTouchStart = {function(){
                        $that.TabTo(index)
                    }}
                    onTouchEnd = {$that.TabEnd}>{linkValue}</div>
            )
        });
        //����tab����
        var tabItemStyle ={
            width :  this.props.tabWidth
        }
        var tabItems = this.props.Items.map(function(tabValue,index){
            return (
                <div className={"tab-item"} style={tabItemStyle}>
                    {tabValue}
                </div>
            )
        });


        var innerStyle ={
            left : this.props.left,
            width : this.props.tabItemsCount * this.props.tabWidth
        }
        if(!this.props.isTouchDown){
            innerStyle[_prefixStyle + "transition"] = "all 0.3s";
        }
        //�¼����
        var Events = {
            onTouchStart : this.onTouchStart,
            onTouchMove : this.onTouchMove,
            onTouchEnd : this.onTouchEnd
        }



        return (
            <div className="tab-panel">
            <div className="tab-header">
                {tabLinks}
            </div>
            <div className="tab-content">
                <div className="tab-content-inner clearfix" style={innerStyle} {...Events}>
                    {tabItems}
                </div>
            </div>
            </div>
        );
    }
});

module.exports = SlideTab;