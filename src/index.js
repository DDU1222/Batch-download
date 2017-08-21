const fs = require("fs");
const path = require('path');
const async = require("async");
const request = require('request');
const tinify = require("tinify");
const exec = require('child_process').exec;
tinify.key = "7lyXEOAu_4rEnUpAZg-oq4gkk6N9mNa_";

exports.downLoadImage = function (imageLinks, needTinify) {
  console.log('waitting...')
  exec('rm -r ../images/*',function(err, out) {
    async.mapSeries(imageLinks, function(item, callback) {
      setTimeout(function() {
        if (/^((http|ftp|https)?:)?\/\//.test(item)) {
          let destImage = path.resolve("../images/", item.split("/")[item.split("/").length -1]);
          if (needTinify) {
            const source = tinify.fromUrl(item);
            source.toFile(destImage);
            console.log(destImage + '完成');
          } else {
            fs.readdir("../images/",function(err, files){
               if (files.indexOf(destImage) > -1) {
                return false;
               }
            });
            downloadImage(item, destImage, function(err, data){
                console.log(destImage + '完成');
            });
          }
        }
        callback(null, item);
      }, 100);
    }, function(err, results) {});
  });
}

exports.tinifyImage = function() {
  console.log('waitting...');
  exec('rm -r ../images/*',function(err, out) { 
    fs.readdir("../originalImages/",function(err, files){
      files.map((file) => {
        const source = tinify.fromFile(`../originalImages/${file}`);
        source.toFile(`../images/${file}`);
        console.log(file + '完成');
      });
    });
  });
}

function downloadImage(src, dest, callback) {
  request.head(src, function(err, res, body) {
    if (src) {
      request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
          callback(null, dest);
      });
    }
  });
};
