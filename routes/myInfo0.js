const express = require("express");
const router = express.Router();
const multer = require('multer');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('../lib/myInfotemplate.js');

var path = require('path');
var sanitizeHtml = require('sanitize-html');
//const image = <img src=${user.photoURL}/>;
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
router.get('/', (req, res) => res.render('index'));
router.get('/index', (req, res) => res.render('index'));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/checkid", (req, res) => res.render("checkid", {page: "checkid"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.get("/menuCloset", (req, res) => res.render("menuCloset", {page: "menuCloset"}));
router.get("/addItem", (req, res) => res.render("addItem", {page: "addItem"}));

router.get('/myinfo', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  var _url = request.url;
      var queryData = url.parse(_url, true).query;
      var pathname = url.parse(_url, true).pathname;
        // if(pathname === myInfo){
          db.query(`SELECT * FROM userinfo where userid=?`,[userLogin], function(error,userinfo){
            if(error){
              throw error;
            }
              var username = userinfo[0].username; //title
              var password = userinfo[0].password; //description
              var list = template.list(userinfo);
              var html = template.HTML(`
                <a class="nav-link active" href="/editUsername">EDIT</a>
                <br>&nbsp&nbsp&nbsp이름 <br>&nbsp&nbsp&nbsp${(userinfo[0].username)}`, list,
                ` `,
                ``);
                //console.log(queryData.id);
                response.writeHead(200);
                response.end(html);
          }); //end db.query
            // } //end if queryData
          }); //end get
                              router.get('/editUsername', function(request, response, next) {
                                var userLogin=request.session.login; //로그인한 사용자 아이디
                                var _url = request.url;
                                    var queryData = url.parse(_url, true).query;
                                    var pathname = url.parse(_url, true).pathname;
                                      // if(pathname === myInfo){
                                        db.query(`SELECT * FROM userinfo where userid=?`,[userLogin], function(error,userinfo){
                                          if(error){
                                            throw error;
                                          }
                                          
                                            var username = userinfo[0].username; //title
                                            var password = userinfo[0].password; //description
                                            var list = template.list(userinfo);
                                            var html = template.HTML(``, list,
                                              `
                                              <form action="editUsernamePro" method="post">
                                              &nbsp&nbsp&nbsp

                                              <input type="text" name="username" class="form-control"
                                                placeholder="" autocomplete="off" data-parsley-required
                                                data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="12"
                                                data-parsley-minlength-message="이름을 입력해주세요." value="${(userinfo[0].username)}"
                                                />
                                                <br><p><input type="submit" class="btn btn-light" value="수정"></p>
                                                <input type="button" class="btn btn-light" value="취소" onclick=" location.href='/myinfo'">
                                                </form>

                                              `,
                                              `
                                                `);
                                              //console.log(queryData.id);
                                              response.writeHead(200);
                                              response.end(html);
                                        }); //end db.query
                                          // } //end if queryData
                                        }); //end get


                                        router.get('/uploadProfilepic', function(request, response, next) {
                                          var userLogin=request.session.login; //로그인한 사용자 아이디
                                          var _url = request.url;
                                              var queryData = url.parse(_url, true).query;
                                              var pathname = url.parse(_url, true).pathname;
                                                // if(pathname === myInfo){
                                                  db.query(`SELECT * FROM userinfo where userid=?`,[userLogin], function(error,userinfo){
                                                    if(error){
                                                      throw error;
                                                    }
                                                      var username = userinfo[0].username; //title
                                                      var password = userinfo[0].password; //description
                                                      var list = template.list(userinfo);
                                                      var html = template.HTML(`<form action="/uploadProfilepicPro" method="post" enctype="multipart/form-data"
                                                    class="form-group"
                                                    data-parsley-validate
                                                    >
                                                        <div class="custom-file">
                                                  <input type="file" name="profilepic" class="custom-file-input" id="inputGroupFile01"
                                                  data-parsley-required
                                                  data-parsley-trigger="keyup"
                                                  data-parsley-minlength-message="이미지를 선택해주세요."
                                                  >
                                                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                </div>
                                                <br><br><p><input type="submit" class="btn btn-light" value="수정"></p>
                                                <input type="button" class="btn btn-light" value="취소" onclick=" location.href='/myinfo'">
                                                </form>`, list,
                                                        `
                                                        `,
                                                        `  `);
                                                        //console.log(queryData.id);
                                                        response.writeHead(200);
                                                        response.end(html);
                                                  }); //end db.query
                                                    // } //end if queryData
                                                  }); //end get


                                        router.get('/editPasswordForm', function(request, response, next) {
                                          var userLogin=request.session.login; //로그인한 사용자 아이디
                                          var _url = request.url;
                                              var queryData = url.parse(_url, true).query;
                                              var pathname = url.parse(_url, true).pathname;
                                                // if(pathname === myInfo){
                                                  db.query(`SELECT * FROM userinfo where userid=?`,[userLogin], function(error,userinfo){
                                                    if(error){
                                                      throw error;
                                                    }
                                                      var username = userinfo[0].username; //title
                                                      var password = userinfo[0].password; //description
                                                      var list = template.list(userinfo);
                                                      var html = template.HTML(``, list,
                                                        `<br>&nbsp&nbsp&nbsp이름 <br>&nbsp&nbsp&nbsp${(userinfo[0].username)}`,
                                                        ` <form action="editPasswordChk" method="post">
                                                        &nbsp&nbsp&nbsp<input type="password" name="passwordchk" class="form-control"
                                                          placeholder="현재 비밀번호" autocomplete="off" data-parsley-required
                                                          data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="12"
                                                          data-parsley-minlength-message="현재 비밀번호를 입력해주세요."
                                                          />
                                                          <br><p><input type="submit" class="btn btn-light" value="확인"></p>
                                                          <input type="button" class="btn btn-light" value="취소" onclick=" location.href='/myinfo'">
                                                          </form>`);
                                                        response.writeHead(200);
                                                        response.end(html);
                                                  }); //end db.query
                                                    // } //end if queryData
                                                  }); //end get

                                                      router.get('/changePasswordForm', function(request, response, next) {
                                                              var userLogin=request.session.login; //로그인한 사용자 아이디
                                                              var _url = request.url;
                                                                  var queryData = url.parse(_url, true).query;
                                                                  var pathname = url.parse(_url, true).pathname;
                                                                    // if(pathname === myInfo){
                                                                      db.query(`SELECT * FROM userinfo where userid=?`,[userLogin], function(error,userinfo){
                                                                        if(error){
                                                                          throw error;
                                                                        }
                                                                          var username = userinfo[0].username; //title
                                                                          var password = userinfo[0].password; //description
                                                                          var list = template.list(userinfo);
                                                                          var html = template.HTML(``, list,
                                                                            `<br>&nbsp&nbsp&nbsp이름 <br>&nbsp&nbsp&nbsp${(userinfo[0].username)}`,
                                                                            ` <form action="changePasswordPro" method="post">
                                                                              <input type="password" class="form-control newPassword" id="password" name="password" data-parsley-required placeholder="새 비밀번호" autocomplete="off"
                                                                              data-parsley-trigger="keyup" data-parsley-minlength="4" data-parsley-maxlength="12"
                                                                              data-parsley-minlength-message="4~12자로 입력하세요."
                                                                              />

                                                                              <br>
                                                                              <input type="password" class="form-control newPassword"id="passwordrepeat" name="repeatpassword" data-parsley-required placeholder="새 비밀번호" autocomplete="off"
                                                                              data-parsley-trigger="keyup" data-parsley-minlength="4" data-parsley-maxlength="12"
                                                                              />




                                                                              <br><p><input type="submit" class="btn btn-light" value="확인" id="submit"></p>
                                                                              <input type="button" class="btn btn-light" value="취소" onclick=" location.href='/myinfo'">
                                                                              </form>`);
                                                                            response.writeHead(200);
                                                                            response.end(html);
                                                                      }); //end db.query
                                                                        // } //end if queryData
                                                                      }); //end get



module.exports = router;
