var React = require("react");
var SignUp = require("SignUp");
var Tip = require("Tip");
var ReactRouter = require("react-router");
var { Route, DefaultRoute, RouteHandler, Link } = ReactRouter;
/**
 * ·�ɶ���
 */


var SignUpTest = React.createClass({
        onTelnoCheck : function(){

        },
        render : function(){
            return (
                <SignUp dataIsExist="./data_isexist.js" dataCode="./data_code.js" onSubmit ={this.onTelnoCheck}  />
            )
        }
})

var Pwd = React.createClass({
    getInitalState : function(){

    },
    getDefaultProps : function(){
        return {
            isShowTip   : false,        //�Ƿ���ʾ��ʾ��
            message     : ""            //��ʾ��Ϣ
        }
    },
    onSubmit : function(){

    },
    render :function(){
        return (
            <div className="login-panel">
                <div className="logo"></div>
                <form className="login-regit-form">
                    <div className="form-line mt20 ">
                        <input type="password" placeholder="����������" name="password" ref="password" validate="req password" />
                    </div>
                    <div className="form-line mt10">
                        <input type="password" placeholder="��ȷ������" name="rePassword" ref="rePassword" validate="req password" />
                    </div>
                    <div className="form-line mt20">
                        <a href="javascript:;" className="btn btn-login" onClick={this.onSubmit}>�趨����</a>
                    </div>
                </form>
                <Tip isShow={this.props.isShowTip} onCloseTip={this.onCloseTip} message={this.props.message} />
            </div>
        );
    }
})

var App = React.createClass({
    render : function(){
        return (
            <RouteHandler />
        );
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={SignUpTest}/>
        <Route name="SetPwd" path="pwd" handler={Pwd} />
    </Route>
);



ReactRouter.run(routes, ReactRouter.HashLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('main-container'))
});