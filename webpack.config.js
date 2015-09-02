/**
 * webpack �����ļ�
 * ���ö��������ļ����������Ϣ
 */
var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var components_dir = path.join(__dirname, 'components')+"/";
var examples_dir = path.join(__dirname,'examples');

//������
var deps = [
  'react/dist/react.min.js',
  'jquery/dist/jquery.min.js',
  'underscore/underscore-min.js'
];

//�ض����ļ�
var alias= {
  Base          : components_dir + 'Base/Base.js',
  Confirm       : components_dir + 'Confirm/Confirm.js',
  HoldEdit      : components_dir + 'HoldEdit/HoldEdit.js',
  ImageCut      : components_dir + 'ImageCut/ImageCut.js',
  Loadmore      : components_dir + 'Loadmore/Loadmore.js',
  Pager         : components_dir + 'Pager/Pager.js',
  ScrollLoadmore: components_dir + 'ScrollLoadmore/ScrollLoadmore.js',
  SlideDelete   : components_dir + 'SlideDelete/SlideDelete.js',
  SlideList     : components_dir + 'SlideList/SlideList.js',
  SlidePushMenu : components_dir + 'SlidePushMenu/SlidePushMenu.js',
  Slider        : components_dir + 'Slider/Slider.js',
  SlideTab      : components_dir + 'SlideTab/SlideTab.js',
  Tip           : components_dir + 'Tip/Tip.js'
};

//����ļ�
var entrys = ['Slider/Slider.js'];

var config = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server'
  ],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'Slider.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: []
  },
  module: {
    noParse : [],
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }]
  }
}

//���� alias��
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.module.noParse.push(depPath);
 });

//�ض����ļ���ֵ
config.resolve.alias = alias;

//��������ļ�
entrys.forEach(function(entry){
  var entryPath = path.resolve(examples_dir, entry);
  config.entry.push(entryPath);
});

module.exports = config;