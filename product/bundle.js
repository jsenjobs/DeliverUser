!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=9)}([function(e,n){e.exports=require("log4js")},function(e,n){e.exports=require("bluebird")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("fs")},function(e,n,t){"use strict";n.userClient=t(7).userClient,n.userServer=t(7).userServer},function(e,n){e.exports=require("os")},function(e,n){e.exports={appStatus:{params:[{name:"info",type:"任意",des:"详细信息",necessary:!1}],_links:"/app/status",method:"GET",des:"服务器信息"},listinfo:{params:[],_links:"/app/listinfo",method:"GET",des:"显示api信息"},getLog:{params:[{name:"filename",type:"string",des:"日志文件名字",necessary:!1}],_links:"/app/getLog",method:"GET",des:"获取日志文件，beta"},login:{params:[{name:"account",type:"string",des:"用户注册"},{name:"password",type:"string",des:"用户密码",necessary:!1}],_links:"/login/:account/:password",method:"GET",des:"用户登入"},adminUserLogin:{params:[{name:"account",type:"string",des:"用户id"},{name:"password",type:"string",des:"用户密码"}],_links:"/xxv1/1vxx/admin/login/:account/:password",method:"GET",des:"管理员登入"},adminCreateUser:{params:[{name:"account",type:"string",des:"用户id"},{name:"password",type:"string",des:"用户密码"}],_links:"/xxv1/1vxx/admin/user/create/:account/:password",method:"GET",des:"创建用户",headers:[{name:"token",type:"string",des:"用户密码"}]},adminResetPassword:{params:[{name:"account",type:"string",des:"用户id"},{name:"password",type:"string",des:"用户密码"}],_links:"/xxv1/1vxx/admin/user/reset/:account/:password",method:"GET",des:"重置用户密码",headers:[{name:"token",type:"string",des:"用户密码"}]}}},function(e,n,t){"use strict";var r=t(11),o=r.Schema,s=new o({_id:{type:String},password:{type:String},register_date:{type:Date},last_login:{type:Date}}),i=new o({_id:{type:String},password:{type:String},register_date:{type:Date},last_login:{type:Date}});n.userClient=r.model("userClient",s),n.userServer=r.model("userServer",i)},function(e,n,t){"use strict";var r=t(34),o=t(1);n.Enc=function(e){return new o(function(n,t){r.hash(e,10,function(e,r){e&&t(!1),n(r)})})},n.compare=function(e,n){return new o(function(t,o){r.compare(e,n,function(e,n){e&&o(!1),t(n)})})}},function(e,n,t){"use strict";var r=t(15),o=t(5).cpus().length,s=t(2);t(12).boot(s.resolve("./etc"),s.resolve("../etc"));var i=t(14),c=t(13);if(r.isMaster){console.log(" Fork %s worker(s) from master",o);for(var a=0;a<o;a++)r.fork();r.on("online",function(e){console.log("worker is running on %s pid",e.process.pid)}),r.on("exit",function(e,n,t){console.log("worker with %s is closed",e.process.pid)})}else r.isWorker&&(console.log("worker (%s) is running",r.worker.process.pid),i.boot());r.on("death",function(e){console.log("worker "+e.pid+" died. restart..."),r.fork()});var u=t(3),d=s.join(process.cwd(),"runtime","lock");if(!function(e){try{u.accessSync(e,u.F_OK)}catch(e){return!1}return!0}(d)){var p=u.createWriteStream(d);p.write("lock"),p.end(),c.RegisterTask()}},function(e,n){e.exports=require("jsonwebtoken")},function(e,n){e.exports=require("mongoose")},function(e,n,t){"use strict";var r=t(17),o=t(18);n.boot=function(e,n){r.boot(e,n),o.boot()}},function(e,n,t){"use strict";n.RegisterTask=t(27).RegisterTask},function(e,n,t){"use strict";(function(e){function r(){"test"!==v.get("env")&&v.listen(h,function(){i.info("服务器端口："+h)})}function o(){w.close()}var s=t(0),i=s.getLogger("server"),c=t(39),a=t(41),u=(t(2),t(35)),d=t(37),p=t(1),f=(p.promisifyAll(t(3)),t(6)),l=t(24),g=t(22),m=t(29),v=c();m.boot(v),v.use(u.urlencoded({extended:!0})),v.use(u.json()),v.use(d());var y=t(38);v.use(y()),g.boot(v),l.boot(),v.all("*",function(e,n){n.status(404).json({code:404,msg:"没有此Api",_links:f})}),v.use(function(e,n,t,r){return"UnauthorizedError"===e.name?void t.status(401).json({code:401,errCode:401e3,msg:"未许可Api"}):t.headersSent?r(e):(t.status(500),void t.json({code:500,msg:"发生未知错误",_links:f}))});var h=process.env.PORT||3e3,w=a.createServer(v);w.on("error",function(e){i.error(e)}),process.on("uncaughtException",function(e){i.error(e),i.error(e.stack)}),n.app=v,n.boot=r,n.shutdown=o,n.port=h,t.c[t.s]===e?t(9):console.log("Running app as a module")}).call(n,t(32)(e))},function(e,n){e.exports=require("cluster")},function(e,n,t){"use strict";var r=process.env,o=t(1),s=o.promisifyAll(t(3)),i=t(2),c=function(e){try{s.accessSync(e,s.F_OK)}catch(e){return!1}return!0},a=function(e){if(c(e)){var n=s.readFileSync(e,"utf8");if(n){var t=JSON.parse(n);u(r,"",t)}}},u=function e(n,t,r){if(r instanceof Array)n[t]=r;else if(r instanceof Object)for(var o in r)e(n,t+o,r[o]);else n[t]=r};n.ENVSET=function(e,n){e&&(a(i.join(e,"project.json")),a(i.join(e,"db.json")),a(i.join(e,"cluster.json"))),n&&(a(i.join(n,"project.json")),a(i.join(n,"db.json")),a(i.join(n,"cluster.json"))),"production"===process.env.model&&(e&&(a(i.join(e,"production","project.json")),a(i.join(e,"production","db.json")),a(i.join(e,"production","cluster.json"))),n&&(a(i.join(n,"production","project.json")),a(i.join(n,"production","db.json")),a(i.join(n,"production","cluster.json"))))}},function(e,n,t){"use strict";var r=t(16);n.boot=function(e,n){r.ENVSET(e,n)}},function(e,n,t){"use strict";var r=t(19);n.boot=function(){r.set()}},function(e,n,t){"use strict";var r=t(2),o=process.env.name;o=o||"app";var s=r.join(process.cwd(),"logs",o),i={appenders:{STDOUT:{type:"stdout",layout:{type:"ENCODER_PATTERN",separator:","},filter:{level:"error"}},FILE:{type:"dateFile",filename:r.join(s,"common"),pattern:"_yyyy-MM-dd.log",compress:!0,alwaysIncludePattern:!0,layout:{type:"ENCODER_PATTERN",separator:","}},error:{type:"dateFile",filename:r.join(s,"error"),pattern:"_yyyy-MM-dd.log",compress:!0,alwaysIncludePattern:!0,levelFilter:{level:"error"},layout:{type:"ENCODER_PATTERN",separator:","}},ERROR_FILE:{type:"logLevelFilter",appender:"error",level:"error"}},categories:{default:{appenders:["STDOUT","FILE","ERROR_FILE"],level:"info"}}},c=t(43);n.set=function(){var e=t(0);e.addLayout("ENCODER_PATTERN",function(e){return function(e){return c(e.startTime).format("YYYY-MM-DD HH:MM:ss.SSS")+" [main] "+e.level.levelStr+" "+e.categoryName+" - "+e.data}}),e.configure(i)}},function(e,n,t){"use strict";var r=t(0),o=r.getLogger("ControllerApp"),s=t(5),i=t(36).exec,c=t(33),a=new Date,u=t(2),d=t(1),p=d.promisifyAll(t(3));n.status=function(e,n){o.info("Status Api Call");var t=e.app;if(e.query.info){var r={};c.parallel([function(e){i("netstat -an | grep :80 | wc -l",function(n,t){r[80]=parseInt(t,10),e()})},function(e){i("netstat -an | grep :"+t.set("port")+" | wc -l",function(n,o){r[t.set("port")]=parseInt(o,10),e()})}],function(e){n.json({status:"up",version:t.get("version"),sha:t.get("git sha"),started_at:a,node:{version:process.version,memory:Math.round(process.memoryUsage().rss/1024/1024)+"M",uptime:process.uptime()},system:{loadavg:s.loadavg(),freeMemory:Math.round(s.freemem()/1024/1024)+"M"},env:"production",hostname:s.hostname(),connections:r,swap:void 0})})}else n.json({status:"up"})};var f=t(6),l={code:0,data:f,model:process.env.model,PVersion:process.env.PVersion,state:process.env.state};n.listinfo=function(e,n){return n.status(200).json(l)};var g=function(e){return p.accessAsync(e,p.F_OK).then(function(e){return!0},function(e){return!1})},m=function(e){return p.readFileAsync(e,"utf8").then(function(e){if(e)return e})},v=function(e,n){var t=u.join(process.cwd(),"runtime","logs",e);g(t).then(function(e){return e?m(t).then(function(e){return e?n.status(200).json({code:0,data:e}):n.status(200).json({code:1})}):n.status(200).json({code:1})})};n.getLog=function(e,n){o.info("getLog api call"),e.query.filename?v(e.query.filename,n):v("latest.log",n)}},function(e,n,t){"use strict";var r=t(0),o=r.getLogger("ControllerClient");n.login=function(e,n){o.info("login Api Call");var t=e.params,r=t.account,s=t.password;if(!r||!s)return n.status(200).json({code:1,msg:"参数错误"});e.models.client.login(r,s).then(function(e){return e?n.status(200).json(e):n.status(200).json({code:1,msg:"unknown"})})}},function(e,n,t){"use strict";var r=t(20),o=t(21),s=t(23),i=t(40),c=(t(10),process.env.JWTJWT_SECRET),a=process.env.JWTACTIVE+c,u=i({secret:function(e,n,t){console.log(n),e.headers.uid=JSON.parse(n.sub).id,t(null,a)},credentialsRequired:!0,getToken:function(e){return e.headers.token?e.headers.token:null}});n.boot=function(e){e.use("/xxv1/1vxx/admin/user",u),e.get("/app/status",r.status),e.get("/app/listinfo",r.listinfo),e.get("/app/getLog",r.getLog),e.get("/login/:account/:password",o.login),e.get("/xxv1/1vxx/admin/login/:account/:password",s.adminLogin),e.get("/xxv1/1vxx/admin/user/create/:account/:password",s.createUser),e.get("/xxv1/1vxx/admin/user/reset/:account/:password",s.resetPassword)}},function(e,n,t){"use strict";var r=t(0),o=r.getLogger("ControllerServer");n.adminLogin=function(e,n){o.info("adminLogin Api Call");var t=e.params,r=t.account,s=t.password;if(!r||!s)return n.status(200).json({code:1,msg:"参数错误"});e.models.server.login(r,s).then(function(e){return e?n.status(200).json(e):n.status(200).json({code:1,msg:"unknown"})})},n.createUser=function(e,n){o.info("createUser Api Call");var t=e.params,r=t.account,s=t.password;if(!r||!s)return n.status(200).json({code:1,msg:"参数错误"});e.models.server.createUser(r,s).then(function(e){return e?n.status(200).json(e):n.status(200).json({code:1,msg:"unknown"})})},n.resetPassword=function(e,n){o.info("resetPassword Api Call");var t=e.params,r=t.account,s=t.password;if(!r||!s)return n.status(200).json({code:1,msg:"参数错误"});e.models.server.resetPassword(r,s).then(function(e){return e?n.status(200).json(e):n.status(200).json({code:1,msg:"unknown"})})}},function(e,n,t){"use strict";n.boot=function(){t(25).boot()}},function(e,n,t){"use strict";var r=t(0),o=r.getLogger("MongoseIniter"),s=(t(1),t(11));s.Promise=t(1),n.boot=function(){var e=t(26).getParams(process.env.MongoUrl),n="mongodb://127.0.0.1:27017";e.host&&e.port&&(n="mongodb://"+e.host+":"+e.port);var r={server:{socketOptions:{keepAlive:1}},useMongoClient:!0};s.connect(n+"/"+(e.db||"template"),r);var i=s.connection;i.on("error",function(e){o.error(e)}),i.once("open",function(){o.info("MongoDB open:"+e.db)})}},function(e,n,t){"use strict";n.getParams=function(e){if(!e)return{};var n=e.split(/:\/\/|:|@|\/|\?/);return{type:n[0],username:n[1],password:n[2],host:n[3],port:n[4],db:n[5],param:n[6]}}},function(e,n,t){"use strict";function r(){var e=0;o.scheduleJob("*/1 * * * * *",function(){if(e+6e4<Date.now()){e=Date.now();var n=encodeURIComponent(process.env.Address),t=encodeURIComponent(process.env.name),r=encodeURIComponent(process.env.desc);c("http://"+process.env.Register+"/register/register?address="+n+"&name="+t+"&desc="+r,"GET",function(o,s,c,a){if(o||!s)return e=0,void i.error("Failure",o);var u="";try{u=JSON.parse(s)}catch(n){e=0,console.log(s)}o||!u||0==!u.code?(e=0,i.error("no register server at:http://"+process.env.Register+"/register/register?address="+n+"&name="+t+"&desc="+r)):i.info("register succeed at time:"+new Date)})}})}var o=t(44),s=t(0),i=s.getLogger("Task"),c=t(42);n.RegisterTask=function(){r()}},function(e,n,t){"use strict";var r=t(0),o=(r.getLogger("ServiceClient"),t(4).userClient),s=t(8);n.login=function(e,n){return o.findOne({_id:e}).then(function(t){if(t)return s.compare(n,t.password).then(function(n){return n?(o.findOneAndUpdate({_id:e},{last_login:Date.now()}),{code:0}):{code:1,msg:"登入失败"}}).catch(function(e){return{code:1,msg:"处理出错-1"}})}).catch(function(e){return{code:1,msg:"处理出错-2"}})}},function(e,n,t){"use strict";var r=t(28),o=t(30),s={client:r,server:o};n.boot=function(e){e.use(function(e,n,t){return e.models=s,t()})}},function(e,n,t){"use strict";var r=t(0),o=(r.getLogger("ServiceServer"),t(4).userServer),s=t(4).userClient,i=t(8),c=t(31);n.createUser=function(e,n){return console.log(n),i.Enc(n).then(function(n){var t=Date.now();return new s({_id:e,password:n,register_date:t,last_login:t}).save().then(function(e){return e?{code:0}:{code:1,msg:"保存用户数据失败"}}).catch(function(e){return{code:1,msg:"用户存在"}})}).catch(function(e){return{code:1,msg:"加密密码失败"}})},n.resetPassword=function(e,n){return i.Enc(n).then(function(n){return console.log(e),s.findOneAndUpdate({_id:e},{password:n}).then(function(e){return console.log(e),e?{code:0}:{code:0,msg:"没有更改"}})}).catch(function(e){return{code:1,msg:"加密密码失败"}})},n.login=function(e,n){return o.findOne({_id:e}).then(function(t){return t?i.compare(n,t.password).then(function(n){return n?(o.findOneAndUpdate({_id:e},{last_login:Date.now()}),{code:0,token:c.createToken({_id:e,password:t.password})}):{code:1,msg:"登入失败"}}).catch(function(e){return{code:1,msg:"处理出错-1"}}):{code:1,msg:"用户不存在"}}).catch(function(e){return{code:1,msg:"处理出错-2"}})}},function(e,n,t){"use strict";var r=t(10),o=process.env.JWTJWT_SECRET,s=process.env.JWTACTIVE+o;n.createToken=function(e){var n=JSON.stringify(e);return r.sign(e,s,{algorithm:"HS256",jwtid:"jwt",issuer:"chaos",subject:n})},n.createToken2=function(e,n){var t=JSON.stringify(e);return r.sign(e,s,{algorithm:"HS256",jwtid:"jwt",issuer:"chaos",expiresIn:n,subject:t})},n.verify=function(e){return r.verify(e,s,{algorithm:"HS256",issuer:"chaos"})},n.decode=function(e){return r.decode(e,{complete:!0})}},function(e,n){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,n){e.exports=require("async")},function(e,n){e.exports=require("bcrypt")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("child_process")},function(e,n){e.exports=require("cors")},function(e,n){e.exports=require("errorhandler")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("express-jwt")},function(e,n){e.exports=require("http")},function(e,n){e.exports=require("httpinvoke")},function(e,n){e.exports=require("moment")},function(e,n){e.exports=require("node-schedule")}]);