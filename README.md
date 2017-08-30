##批量下载图片工具使用方法
拉下代码后，安装依赖

```
npm i

```

examples index.js引入下载工具：
```
const fs = require("fs");
const tools = require('../src/index.js');
```

无原始图片 ，需按链接下载调用方法tools.downLoadImage();
传入链接数组, 第二个参数为是否压缩
压缩后的图片保存在images文件夹下，每次运行前会清空images文件夹
若需自定义保存图片位置， 可传入第三个参数 相对路径 如'../aaaa'

```
fs.readFile('image.txt', function (err, data) {
  if (err) {
    return console.error(err);
  }
  imageLinks = data.toString().split(',');
  // 输入数组
  tools.downLoadImage(imageLinks, true);
  // tools.downLoadImage(imageLinks, true, '../aaaa');
});
```


有原始图片，只需压缩图片调用方法tools.tinifyImage();
originalImages 保存原始图片
压缩后的图片保存在images文件夹下，每次运行前会清空images文件夹
如需自定义输入和输出目录 第一个参数为输入目录 第二个参数为输出目录

```
tools.tinifyImage();
// tools.tinifyImage('../originalImages', '../aaaa');
```







