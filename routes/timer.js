const express = require("express");
const router = express.Router();
const multer = require('multer');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('../lib/template.js');
//var noteTemplate = require('../lib/noteTemplate.js');
var timerTemplate = require('../lib/timerTemplate.js');
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


    router.get('/timer', function(req, res, next) {

        var userLogin=req.session.login;
        var html = timerTemplate.HTML(userLogin, `
                <form action="/timerPro" method="post"
                class="form-group form-inline"
                data-parsley-validate
                >
                <input id="usertime" Name="usertime" width="180" />
                <input type="submit" class="btn btn-outline-light" id="uploadItem" value="시작">

              </form>
`,
          ` `, //``,
          ``,`
`);

          res.writeHead(200);
          res.end(html);
        });

    router.post('/timerPro', function(req, res, next) {

            var userLogin=req.session.login;
            var usertime = req.body['usertime'];



    var now = new Date();
    var year=now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var input = usertime;
    var usertime = input.split(':');
    var userminutes = usertime[1]*60+ +usertime[0];
    var endtime = new Date(year,month,day,usertime[0],usertime[1],0);

    var countDownDate = new Date(endtime).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var html = timerTemplate.HTML(userLogin, ``,
      ` `, //``,
      endtime,`<p id="demo"></p>
    `);
    // var inputDate = new Date(userminutes * 60 * 1000);
    console.log(endtime);
              res.writeHead(200);
              res.end(html);
            });



module.exports = router;
