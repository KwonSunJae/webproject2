/* socket\app.js */

// express 기본 모듈 불러오기
// var express=require("express"),http=require("http").createServer(app);
// // express 미들웨어 불러오기
// var static =require("serve-static");
// //express 객체 생성
// var app=express();
// var router=express.Router();
// const io = require('socket.io')(http);


// router.route("/").get(function(req,res){
//     res.redirect("http://localhost:3000/src/pokemon.html");
// });
// app.use(static(__dirname)); //현재 폴더에 대한 정적 접근
// app.use(express.urlencoded());
// app.use(express.json());
// app.use('/',router);

// http.listen(3000, () => {
//   console.log('Connected at 3000');
// });

// express 기본 모듈 불러오기
var app=require("express")(),http=require("http").createServer(app),path=require("path");
// express 미들웨어 불러오기
var static =require("serve-static");
//express 객체 생성

var router=require("express").Router();

router.route("/").get(function(req,res){
    res.redirect("http://133.186.209.203:3000/src/pokemon.html");
});

router.route("/routetest").get(function(req,res){
    res.redirect("http://google.co.kr");
});
const io = require('socket.io')(http);
var cnt =0;
io.on('connection', (socket) => {
    console.log('a user connected');
    cnt+=1;
    io.emit('room',cnt);
    
    socket.on('keyDown', (msg) => {
        console.log(msg);
      io.emit('keyDown', msg);
    });
    socket.on('keyUp',(msg)=>{
        console.log(msg);
        io.emit('keyUp',msg);
    })
    socket.on('ball',(msg)=>{
        console.log(msg);
        io.emit('ball',msg);
    })
    socket.on('disconnect', () => {
        cnt-=1;
    console.log('user disconnected');
    });
  });
//기본 속성 설정
app.set("port",process.env.PORT||3000);
 //루프백

//웹 폴더에 저장된 모든 웹 페이지에 대한 정적 참조 허용
app.use(static(__dirname)); //현재 폴더에 대한 정적 접근
app.use(require("express").urlencoded());
app.use(require("express").json());
app.use("/",router);

// app.use(function(req,res,next){
//     console.log("첫번째 미들웨어에서 요청을 처리함. ");

//     req.user="mike";
//     next();
// });
 
// app.use("/",function(req,res,next){
//     console.log("두 번째 미들웨어에서 요청을 처리함. ");

//     res.writeHead("200",{"Content-type":"text/html;charset=utf8"});
//     res.end("<h1>Express 서버에서" +req.user+"가 응답한 결과입니다.</h1>");
// });

// 서버 생성          
http.listen(app.get("port"),app.get("host"),()=>{    //()=>  ==function() 
    console.log("Express server running at "+app.get("port")+app.get("host"));
});