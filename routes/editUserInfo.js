const express = require("express");
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/updateItemView.js');

var _storage = multer.diskStorage({
  destination: function (req, file, cb) { //저장할 디렉토리 지정
    cb(null, 'profilePic/') //callback함수
  },
  filename: function (req, file, cb) { // 파일명
    cb(null,Date.now()+'.jpg')
  }
})
var upload=multer({storage:_storage}) //uploads폴더에 저장
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

//update
router.post('/editUsernamePro', function(req, res, next) {
  var userLogin=req.session.login; //로그인한 사용자 아이디
  // var _url = request.url;
  // var queryData = url.parse(_url, true).query;
  var username = req.body['username'];

  //var filename=_storage.filename;

  db.query(
    `UPDATE userinfo set username=? WHERE userid=?`,
  [username,userLogin],
  function (error, result) {
    if(error){
      throw error;
    }else
    console.log(username);
  }) //end query
  res.redirect('/myInfo');
console.log('등록');
});

router.post('/editPasswordChk', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  // var _url = request.url;
  //     var queryData = url.parse(_url, true).query;
      // var pathname = url.parse(_url, true).pathname;
      var passwordchk = request.body['passwordchk'];

        // if(pathname === myInfo){
          db.query(`select * from userinfo where userid=? and password=?`,
            [userLogin,passwordchk], function(err,userinfo){
                if(err){
                  throw err;
                  }

                  if(userinfo[0]!==undefined){
            response.redirect('/changePasswordForm');
              }
              else{
                console.log(passwordchk);
                response.send('비밀번호가 일치하지 않습니다. <a href="/editPasswordForm">다시 입력하기</a>');
              }

          }); //end db.query
            // } //end if queryData
          }); //end get

router.post('/changePasswordPro', function(req, res, next) {
  var userLogin=req.session.login; //로그인한 사용자 아이디
  // var _url = request.url;
  // var queryData = url.parse(_url, true).query;
  var password = req.body['password'];

  //var filename=_storage.filename;

  db.query(
          `UPDATE userinfo set password=? WHERE userid=?`,
            [password,userLogin],
            function (error, result) {
              if(error){
                throw error;
              }else
              console.log(password);
            }) //end query
            res.redirect('/myInfo');
          console.log('password changed');
          });

router.post('/uploadProfilepicPro',upload.single('profilepic'), function(req, res, next) {

    var userLogin=req.session.login;
    var profilepic=[req.file.path];
    //var filename=Date.now()+'jpg';

    db.query( //기존 프로필 이미지 삭제
      `delete from profile WHERE userid=?`,
    [userLogin],
    function (error, result) {
      if(error){
        throw error;
        console.log('profilepic err : '+profilepic);
      }else
      console.log('profilepic : '+profilepic);
    }) //end query

            db.query(
              `insert into profile (userid,profilepic) values (?,?)`,
            [userLogin,profilepic],
            function (error, result) {
              if(error){
                throw error;
                console.log('profilepic err : '+profilepic);
              }else
              console.log('profilepic : '+profilepic);
            }) //end query
            res.redirect('/myInfo');

});

module.exports = router;
