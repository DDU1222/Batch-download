const fs = require("fs");
const path = require('path');
const async = require("async");
const request = require('request');
const tinify = require("tinify");
const exec = require('child_process').exec;
tinify.key = "7lyXEOAu_4rEnUpAZg-oq4gkk6N9mNa_";

const defaultOutputPath = path.resolve(__dirname, '../images/');
const defaultInputPath = path.resolve(__dirname, '../originalImages/');

//return {string} 数据的类型:NULL/UNDEFINED/STRING/NUMBER/ARRAY/FUNCTION/OBJECT
function getRealType (data) {
  return Object.prototype.toString.call(data).slice(8, -1).toUpperCase();
}

exports.downLoadImage = function (imageLinks, needTinify, OutputPath) {
  console.log('waitting...');
  const currentOutput = OutputPath || defaultOutputPath;
  // 如果用户自定义了图片路径
  checkDir(currentOutput, function() {
    // imageLinks 数组
    async.mapSeries(imageLinks, function(item, callback) {
      setTimeout(function() {
        // 符合图片链接
        if (/^((http|ftp|https)?:)?\/\//.test(item)) {
          let destImage = path.resolve(currentOutput, item.split("/")[item.split("/").length -1]);
          if (needTinify) {
            // 需要压缩
            tinify.fromUrl(item).toFile(destImage);
            console.log(destImage + '开始');

          } else {
            // 不需要压缩
            fs.access(destImage, function(err) {
              // err 不存在
              // 检查输出文件状态 不存在 下载
              err && downloadImage(item, destImage, function(err, data){
                console.log(destImage + '完成');
              });
            });
          }
        }
        callback(null, item);
      }, 100);
    }, function(err, results) {});
  });
}

// 有原始图片 只压缩图片
exports.tinifyImage = function(InputPath, OutputPath) {
  console.log('waitting...');

  const currentInput = InputPath || defaultInputPath;
  const currentOutput = OutputPath || defaultOutputPath;

  checkDir(currentOutput, function() {
    fs.readdir(currentInput, function(err, files){
      files.map((file) => {
        const fileInputPath = path.resolve(__dirname, currentInput, file);
        const fileOutputPath = path.resolve(__dirname, currentOutput, file);
        tinify.fromFile(fileInputPath).toFile(fileOutputPath);
        // 异步操作 
        console.log(file + '开始');
      });
    });
  });
}


// 检查输出目录 
// 有文件夹 清除文件夹
// 没有文件夹 新建文件夹
// 参数 原始图片目录 生成图片目录  完成时回调函数
function checkDir(dest, callback) {
  if (!dest || !getRealType(dest) === 'STRING') return;
  fs.stat(dest, function(err, stat){
    if(stat && stat.isDirectory()) {
      console.log('输出目录存在', dest);
      callback();
    } else {
      console.log('输出目录不存在', dest);
      fs.mkdir(dest, callback);
    }
  });
}

// 下载图片
// 参数 图片链接 图片目录  完成时回调函数
function downloadImage(src, dest, callback) {
  request.head(src, function(err, res, body) {
    if (src) {
      request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
          callback(null, dest);
      });
    }
  });
};
