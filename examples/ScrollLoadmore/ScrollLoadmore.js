var React = require("react");
var ScrollLoadmore = require("ScrollLoadmore");
//dataUrl2 Ϊ���Լ��ظ�������
React.render(
    <ScrollLoadmore dataUrl="./data.js" dataUrl2="./data2.js" />,
    document.getElementById('main-container')
);