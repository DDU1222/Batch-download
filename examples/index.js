const fs = require("fs");
const tools = require('../src/index.js');

/*
 * 无原始图片 ，需按链接下载调用方法tools.downLoadImage();
 * 传入链接数组
 * images 保存压缩后的图片
 */

// fs.readFile('image.txt', function (err, data) {
//   if (err) {
//     return console.error(err);
//   }
//   imageLinks = data.toString().split(',');
//   // 输入数组
//   tools.downLoadImage(imageLinks, false, '../aaa');
// });


/*
 * 有原始图片，只需压缩图片调用方法tools.tinifyImage();
 * originalImages 保存原始图片
 * images 保存压缩后的图片
 */
tools.tinifyImage(null, '../aa');