var React = require("react");
var $ = require("jquery");
var Base =require("Base");
//浏览器前缀
var _prefixStyle = Base.prefixStyle();

var SlideList = React.createClass({
    getInitialState : function () {
        return {
            isUpdate : false
        }
    },
    getDefaultProps : function(){
        return {
            isTouchDown         : false,    //是否按下
            currentX            : 0,        //当前位置
            left                : 0,        //偏移位置
            startX              : 0,        //按下位置
            nowX                : 0,        //移动的位置
            delateX             : 0,        //偏移的位置
            minLeft             : 0         //最小偏移位置
        }
    },
    componentDidMount : function(){
        var $module= $(".module");
        var $content =$(".module-content ul");
        this.props.minLeft = $module.width() -  $content.width() - 20;
        $("#test").html(_prefixStyle);
    },
    onTouchStart : function(e){
        if(this.props.isTouchDown){
            return ;
        }
        this.props.isTouchDown = true;
        var event=e||window.event;
        this.props.startX = event.touches[0].pageX;
    },
    onTouchMove : function(e){
        if(!this.props.isTouchDown){
            return;
        }
        var event=e||window.event;
        this.props.nowX = event.touches[0].pageX;
        this.props.delateX = this.props.nowX - this.props.startX;
        this.props.left = this.props.currentX + this.props.delateX;
        this.setState({
           isUpdate : !this.state.isUpdate
        });
        e.preventDefault();
    },
    onTouchEnd : function(e){
        if(!this.props.isTouchDown){
            return;
        }
        this.props.isTouchDown = false;

        //判断超过最左边，最右边，如果超过则定定位到  极限位置
        if(this.props.delateX > 0 && this.props.left>0){
            this.props.left = 0;
            this.setState({
                isUpdate : !this.state.isUpdate
            });
        }else if(this.props.delateX < 0 && this.props.left<this.props.minLeft){
            this.props.left = this.props.minLeft;
            this.setState({
                isUpdate : !this.state.isUpdate
            });
        }
        this.props.currentX = this.props.left;
        this.props.startX = 0;
        this.props.nowX = 0;
        this.props.delateX = 0;
    },
    render : function(){
        $("#test").html($("#test").html()+"<br />render:"+this.props.left);

        var slideList = this.props.dataList.map(function(slideItem,index){
            return (
                <li>
                    <a href={slideItem.link}>
                        <img src={slideItem.faceimg} />
                        <p>{slideItem.title}</p>
                    </a>
                </li>
            );
        });

        var innerStyle ={
            left : this.props.left
        }
        if(!this.props.isTouchDown){
            innerStyle[_prefixStyle + "transition"] = "all 0.3s";
        }

        //事件组合
        var Events = {
            onTouchStart : this.onTouchStart,
            onTouchMove : this.onTouchMove,
            onTouchEnd : this.onTouchEnd
        }

        return (
            <div className="module">
            <div className="module-title">
                <i className="fa fa-list-ul"></i> 我的小说
            </div>
                <div className="module-content">
                    <ul className="clearfix" {...Events} style={innerStyle}>
                        {slideList}
                    </ul>
                </div>
            </div>
        );
    }
})



module.exports = SlideList;