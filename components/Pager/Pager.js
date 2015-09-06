//��ҳ���
/*
 {page}����ҳ��Ϣ����{pageNow:1,pageCount:32}
 {this.onPageChange}: ��ҳ�¼����׳�������
 ���÷���<Pager page={page} onPageChange={this.onPageChange} >
 */
var React = require("react");
var Pager= React.createClass({
        //��һҳ�¼�
        onPrevPage:function(){
            this.props.onPageChange(this.props.page.pageNow - 1);
        },
        //��һҳ�¼�
        onNextPage :function(){
            this.props.onPageChange(this.props.page.pageNow+1);
        },
        //��Ⱦ
        render:function(){
            //��һҳ
            var prev;
            if(this.props.page.pageNow>1){
                prev = (
                    <a href='javascript:;' onClick={this.onPrevPage} className='prev'><i className="fa fa-arrow-left"></i></a>
                 );
            }else{
                prev = (
                    <span className='prev'><i className="fa fa-arrow-left"></i></span>
                );
            }
            //��һҳ
            var next;
            if(this.props.page.pageNow==this.props.page.pageCount){
                next = (
                    <span className='next'><i className="fa fa-arrow-right"></i></span>
            );
            }else{
                next = (
                    <a href='javascript:;' onClick={this.onNextPage} className='next'><i className="fa fa-arrow-right"></i></a>
            );
        }
    //��Ⱦ
    return (
        <section>
            <div className="pager-outter">
                <div className="pager clearfix">
                    {prev}
                    <span className="page">{this.props.page.pageNow} / {this.props.page.pageCount}</span>
                    {next}
                </div>
            </div>
        </section>
    );
    }
});

module.exports=Pager;