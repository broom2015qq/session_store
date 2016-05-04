//照着大神敲，还是不咋理解。。。
var fs = require('fs');
var path = require('path');
//构造函数
function myStore(session){
    var Store = session.Store;
    var spath="./sessions";
    //options传过来的是’sessions‘
    function FileStore(options) {
        var self = this;
        spath = options;
        Store.call(self, options);
        //这是判断options.paht是不是合法路径，获得一个绝对路径吗？
        // fs.mkdirsSync(self.options.path);
        // helpers.scheduleReap(self.options);
    }

    //判断路径是否存在
    function isDirectoryornot(spath){
        var pathexist = fs.existsSync(path.normalize(spath));
        if (!pathexist)  return false;
        
       
        var stat = fs.statSync(path.normalize(spath));
        if (!stat.isDirectory()) return false;
        return true;

    }
    FileStore.prototype.__proto__ = Store.prototype;
     //拼接出出文件路径和文件名
     function sid2Path(sid)
      {
      //path.normalize输出规范格式的path字符串。
        var filePath = path.normalize(path.join(spath,sid)+'.json');
        return filePath;
      }
    //读取json文件
    FileStore.prototype.get = function(sid,callback)
      {
        
        var filePath = sid2Path(sid);
        var sjson = fs.readFileSync(filePath,'utf8');
        var session = JSON.parse(sjson);
        callback(null,session);
      }

    FileStore.prototype.set = function(sid,session,callback)
      {
        console.log("set");
        if (!isDirectoryornot(spath))
          fs.mkdirSync(spath);

     //写入session路径
        var filePath = sid2Path(sid);
        var sjson = JSON.stringify(session);
        fs.writeFileSync(filePath,sjson,'utf8');
        callback(null);
      }
    FileStore.prototype.destroy = function(sid,callback)
      {
        var filePath = sid2Path(sid);
        fs.unlinkSync(filePath);
        callback(null);
      }
  return FileStore;
}

module.exports = myStore;