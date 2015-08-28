/**
 *�����༭
 */
var React = require("react");

var HoldEdit = React.createClass({
    getDefaultProps : function(){
        return{
            isTouchmove     : false,    //�Ƿ��л���
            timeTouchStart  : 0,        //��ʼ����ʱ��
            timeTouchEnd    : 0         //��������ʱ��
        }
    },
    onTouchStart : function(e){
        
        this.timeTouchStart = new Date().getTime();
    },
    onTouchMove : function(e){
        e.preventDefault();
        this.props.isTouchmove =  true;
    },
    onTouchEnd : function(e){
        e.preventDefault();
        if(!this.isTouchmove){
            this.timeTouchEnd = new Date().getTime();
            if(this.timeTouchEnd-this.timeTouchStart > 300){
                var data = null;
                this.props.onHold(data);
            }
        }
        this.props.isTouchmove = false;
        this.props.timeTouchStart = 0;
        this.props.timeTouchEnd = null;
    },
    render : function(){
        //�¼����
        var Events = {
            onTouchStart : this.onTouchStart,
            onTouchMove : this.onTouchMove,
            onTouchEnd : this.onTouchEnd
        }
        return (
            <li className="list-slip-item list-hold-item clearfix" {...Events}>
                <div className="slip-item">
                    <div className="plus-desc">
                        <h2><i className={"fa fa-"+this.props.HoldItem.letter}></i>{this.props.HoldItem.name}</h2>
                        <p>{this.props.HoldItem.keyword}</p>
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = HoldEdit;