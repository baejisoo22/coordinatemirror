const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
var template = require('../lib/indexView.js');
var mysql=require('mysql');
var db=mysql.createConnection({
host:'localhost',
user:'root',
password:'bjs135',
database:'testdb',
port:3307
});
db.connect();

//화면 가져오기
router.get("/", (req, res) => res.render("index", {page: "index"}));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/checkid", (req, res) => res.render("checkid", {page: "checkid"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.get("/menuCloset", (req, res) => res.render("menuCloset", {page: "menuCloset"}));
router.get("/addItem", (req, res) => res.render("addItem", {page: "addItem"}));

router.get('/index', function(request, response, next) {
  var userid=request.session.login; //로그인한 사용자 아이디
  db.query(`SELECT * FROM userinfo where userid=?`,[userid], function(error,userinfo){
    if(error){
      throw error;
    }
      var username = userinfo[0].username;
      var html = template.HTML(username);
        response.writeHead(200);
        response.end(html);
  }); //end db.query
})

//아이디 중복확인
router.post('/checkid', function(req, res, next) {
var checkid = req.body['userid'];
var username = req.body['username'];
db.query("select * from userinfo where userid=?",[checkid],function(err,data){

  if(data.length==0){
    res.redirect('/signup?checkid='+checkid+'&username='+username);

  }
  else {
    res.send('아이디가 존재합니다. <a href="/checkid">다시 입력하기</a>');
  }
})
});

//signup폼에서 사용자가 입력한 userid,password,username 가져오기
router.post('/signup', function(req, res, next) {

var userid = req.body['userid'];
var password = req.body['password'];
var username = req.body['username'];

//userinfo 테이블에 회원정보 추가
db.query(
  `INSERT INTO userinfo (userid, password, username)
              VALUES(?, ?, ?)`,[userid ,password, username],
    function(error, result){
      if(error){
        throw error;
      }else
      console.log('userid : '+userid);
    }) //end query
db.query(
    `insert into profile(userid)
select userid from userinfo where userid=?`,[userid],
function(error, result){
  if(error){
    throw error;
  }else
  console.log('userid(profile) : '+userid);
}) //end query;
res.redirect('/login');
});



module.exports = router;
