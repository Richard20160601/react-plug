//���ظ���
/*
 ����˵��
 hasmore�����и��ࣿ
 isloading: ���ڼ��أ�
 onLoadmore: ���ظ����¼�
 ���÷���<Loadmore isload=true onLoadmore={this.onLoadmore} >
 */
var React = require('react');

var Loadmore=React.createClass({
        render:function({
        return (
            <a href="javascript:;" className={"btn btn-loadmore "+this.props.hasmore?"":"hiden"} onClick={this.props.onLoadmore}>
                <i className={"fa fa-spinner fa-1x loading "+this.props.isloading?"":"hiden"}></i> ���ظ���
            </a>
        );
    });
});

module.exports=Loadmore;