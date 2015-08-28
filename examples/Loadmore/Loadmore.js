var React = require("react");
var Loadmore = require("../../components/Loadmore/Loadmore.js");
var $ =require("jquery");
//���ü��ظ���
var TestLoadmore = React.createClass({
    getInitialState : function(){
        return {
            isUpdate : false
        }
    },
    getDefaultProps : function(){
        return {
            dataUrl :"",
            datas : [],
            isLoading : false,
            hasMore : false
        }
    },
    componentWillMount:function(){
        //��ʼ������
        this.props.dataUrl="./data.js";
        this.loadData();
    },
    onLoadmore : function(){
        this.props.dataUrl="./data2.js";
        setTimeout(this.loadData,5000);
    },
    loadData:function(){
        var data_url = this.props.dataUrl;
        var $that = this;
        $.ajax({
            url : data_url,
            dataType : 'json',
            async : false,
            success : function(data) {
                $that.props.datas = $that.props.datas.concat(data.datas);
                $that.props.hasMore = data.hasMore;
                $that.setState({
                    isUpdate : !$that.state.isUpdate
                })
            }
        });
    },
   render : function(){
       var sliderItems = this.props.datas.map(function(sliderValue,index){
           return (
               <li className="list-slip-item clearfix">
                   <div className="slip-item">
                   <div className="plus-desc">
                        <h2><i className={"fa fa-"+sliderValue.letter}></i>{sliderValue.name}</h2>
                        <p>{sliderValue.keyword}</p>
                   </div>
                   </div>
                </li>
            )
       });

       return (
           <div>
                <ul className="list-slide-group list-slide-delete">
                    {sliderItems}
                </ul>
                <Loadmore hasMore={this.props.hasMore} onLoadmore ={this.onLoadmore} />
            </div>
       );
   }
});

React.render(
<TestLoadmore />,
    document.getElementById("main-container")
);