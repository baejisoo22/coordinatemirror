const express = require("express");
const router = express.Router();
const multer = require('multer');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('../lib/template.js');
//var noteTemplate = require('../lib/noteTemplate.js');
var menuWidgetTemplate = require('../lib/menuWidgetTemplate.js');
var viewNotesTemplate = require('../lib/viewNotesTemplate.js');
const OpenWeatherMapHelper = require("openweathermap-node");
const helper = new OpenWeatherMapHelper(
    {
        APPID: 'c86048e8381e2288c6e31483eae47bd4',
        units: "imperial"
    }
);
var path = require('path');
var sanitizeHtml = require('sanitize-html');
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
router.get("/addItem", (req, res) => res.render("addItem", {page: "addItem"}));




router.get('/menuWidget', function(req, res, next) {

    var userLogin=req.session.login;
    var list = menuWidgetTemplate.list(userLogin);
    var html = menuWidgetTemplate.HTML(userLogin, list,
      ` `, //``,
      ``);

      res.writeHead(200);
      res.end(html);
    });


//메모 보기
router.get('/viewnotes', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  var _url = request.url;
      var queryData = url.parse(_url, true).query;
      var pathname = url.parse(_url, true).pathname;
        if(queryData.id === undefined){
          //메모 목록 보기 (현재 로그인한 사용자의 전체 메모)
            db.query(`SELECT * FROM usernote WHERE userid=?`,[userLogin], function(error,usernote){
              if(error){
                throw error;
              }
              if(usernote[0]!=null){
                db.query(`SELECT * FROM usernote WHERE userid=?`,[userLogin], function(error2,notes){
                  if(error2){
                    throw error2;
                  }
              var note = notes[0].note; //title
              var created = notes[0].created; //description
              var list = viewNotesTemplate.list(notes);
              var html = viewNotesTemplate.HTML(notes, list,
                ``, //``,
                ``);
                //console.log(queryData.id);
                response.writeHead(200);
                response.end(html);
              });
          }//if(usernote[0]!=null){
            else
            response.redirect('/addnote');
            });
  } // if(queryData.id === undefined)
  else{
    db.query(`SELECT * FROM usernote WHERE userid=?`,[userLogin], function(error,usernote){
      if(error){
        throw error;
      }
      if(usernote[0]!=null){
        db.query(`SELECT * FROM usernote WHERE userid=?`,[userLogin], function(error2,notes){
          if(error2){
            throw error2;
          }
      var note = notes[0].note; //title
      var created = notes[0].created; //description
      var list = viewNotesTemplate.list(notes);
      var html = viewNotesTemplate.HTML(notes, list,
        ``, //``,
        `<br><button type="button" class="btn btn-light" onclick=" location.href='/editnote?id=${queryData.id}'">EDIT</button>
        <form action="deletenote" method="post">
        <input type="hidden" Name="noteid" value="${queryData.id}">
        <input type="submit" class="btn btn-light" value="DEL"/>
        </form></div>
              `);
        //console.log(queryData.id);
        response.writeHead(200);
        response.end(html);
      });
  }//if(usernote[0]!=null){
    else
    response.send('등록된 메모가 없습니다. <a href="/addnote">메모 등록하기</a>');

    });
  } // id not null
});


//메모 등록 폼
router.get('/addnote', function(req, res, next) {

    var userLogin=req.session.login;
    var list = menuWidgetTemplate.list(userLogin);
    var html = menuWidgetTemplate.HTML(userLogin, list,
      ` `, //``,
      `<div class="container p-3 my-3 border">
            <form action="/addnotePro" method="post"
            class="form-group"
            data-parsley-validate
            >

            <p><label for="exampleInputEmail1">내용</label></p>
            <p><input type="textarea" name="note" class="form-control"
              placeholder="내용을 입력해주세요." autocomplete="off" data-parsley-required
              data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="200"
              data-parsley-minlength-message="내용없음"
              /></p>

        <p><input type="submit" class="btn btn-light" id="uploadItem" value="저장">
        <input type="button" class="btn btn-light" id="uploadItem" value="취소" onclick=" location.href='/menuWidget'">
        </p>
      </form>
      </div>`);

      res.writeHead(200);
      res.end(html);
    });



//addnotepro
router.post('/addnotepro', function(req, res, next) {

  var note = req.body['note'];
  var userLogin=req.session.login;

  db.query(
    `insert into usernote(userid,note) values (?,?)`,
  [userLogin,note],
  function (error, result) {
    if(error){
      console.log(note);

      throw error;
    }else
    console.log('note : '+note);
  }) //end query
  res.redirect('/viewnotes');

});

//update form
router.get('/editnote', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  var _url = request.url;
      var queryData = url.parse(_url, true).query;
      var pathname = url.parse(_url, true).pathname;
          //메모 목록 보기 (현재 로그인한 사용자의 전체 메모)
            db.query(`SELECT * FROM usernote WHERE userid=?`,[userLogin], function(error,usernote){
              if(error){
                throw error;
              }
              if(usernote[0]!=null){
                db.query(`SELECT * FROM usernote WHERE noteid=?`,[queryData.id], function(error2,notes){
                  if(error2){
                    throw error2;
                  }
              var note = notes[0].note; //title
              var created = notes[0].created; //description
              var list = menuWidgetTemplate.list(notes);
              var html = menuWidgetTemplate.HTML(notes, list,
              ` `, //``,
              `<div class="container p-3 my-3 border">
                    <form action="/editnotePro" method="post"
                    class="form-group"
                    data-parsley-validate
                    >
                    <input type="hidden" Name="noteid" value="${queryData.id}">


                    <p><label for="exampleInputEmail1">내용</label></p>
                    <p><input type="textarea" name="note" class="form-control" value="${notes[0].note}"
                      placeholder="내용을 입력해주세요." autocomplete="off" data-parsley-required
                      data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="200"
                      data-parsley-minlength-message="내용없음"
                      /></p>

                <p><input type="submit" class="btn btn-light" id="uploadItem" value="수정">
                <input type="button" class="btn btn-light" id="uploadItem" value="취소" onclick=" location.href='/viewnotes'">
                </p>
              </form>
              </div>`);

              response.writeHead(200);
              response.end(html);
            });
          } // if(items[0]!=null)
          else
          response.redirect('/viewnotes');


        }); //end of first dbquery
});


//update process
router.post('/editnotePro', function(req, res, next) {
  var userLogin=req.session.login; //로그인한 사용자 아이디
  // var _url = request.url;
  // var queryData = url.parse(_url, true).query;
  var noteid = req.body['noteid'];
  var note = req.body['note'];

  db.query(
    `UPDATE usernote set note=? WHERE noteid=?`,
  [note,noteid],
  function (error, result) {
    if(error){
      throw error;
    }else
    console.log(noteid+note);
  }) //end query
  res.redirect('/viewnotes?id='+noteid);
console.log('수정됨');
});


//delete
router.post('/deletenote', function(req, res, next) {
  var userLogin=req.session.login; //로그인한 사용자 아이디
  var noteid = req.body['noteid'];

  db.query(
    `DELETE FROM usernote WHERE noteid=?`,
  [noteid],
  function (error, result) {
    if(error){
      throw error;
    }else
    console.log(noteid);
  }) //end query
  res.redirect('/viewnotes');
console.log('메모 삭제');
});

router.get('/weather', function(req, res, next) {

    var userLogin=req.session.login;
    var list = menuWidgetTemplate.list(userLogin);
    var html = menuWidgetTemplate.HTML(userLogin, list,
      ` `, //``,
      ``);
      helper.getCurrentWeatherByCityID("1835848", (err, currentWeather) => {
          if(err){
              console.log(err);
          }
          else{

            //var json = JSON.stringify(currentWeather);
            var weather = currentWeather.weather[0].main;
            var json = JSON.stringify(weather);
      var html = menuWidgetTemplate.HTML(userLogin, list,
        `<div class="container p-3 my-3 border">
        ${json} <i class="wi wi-night-sleet"></i> </div>`, ``,
        `<div class="container p-3 my-3 border">
        <textarea id="chatLog" class="chat_log" readonly>
        </textarea>
        </div>`);

        console.log(currentWeather.weather[0].id);

      // $.ajax({
      //   var apiURI = "http://api.openweathermap.org/data/2.5/weather?id=1835848&APPID=c86048e8381e2288c6e31483eae47bd4";
      //       url: apiURI,
      //       dataType: "json",
      //       type: "GET",
      //       async: "false",
      //       success: function(resp) {
      //           console.log(resp);
      //           console.log("현재온도 : "+ (resp.main.temp- 273.15) );
      //           console.log("현재습도 : "+ resp.main.humidity);
      //           console.log("날씨 : "+ resp.weather[0].main );
      //           console.log("상세날씨설명 : "+ resp.weather[0].description );
      //           console.log("날씨 이미지 : "+ resp.weather[0].icon );
      //           console.log("바람   : "+ resp.wind.speed );
      //           console.log("나라   : "+ resp.sys.country );
      //           console.log("도시이름  : "+ resp.name );
      //           console.log("구름  : "+ (resp.clouds.all) +"%" );
      //       }
      //   })

      //console.log(json);

      }

      res.writeHead(200);
      res.end(html);
    });
    });


module.exports = router;
