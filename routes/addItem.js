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
    cb(null, 'uploads/') //callback함수
  },
  filename: function (req, file, cb) { // 파일명
    cb(null, Date.now()+'jpg');
  }
})
var upload=multer({storage:_storage}); //uploads폴더에 저장
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
//router.get("/viewItems", (req, res) => res.render("viewItems", {page: "viewItems"}));

router.post('/addItemPro',upload.single('itemimg'), function(req, res, next) {

  var itemname = req.body['itemname'];
  var category = req.body['category'];
  var tag = req.body['tag'];
  var userLogin=req.session.login;
  var itemimg=[req.file.path];
  //var filename=Date.now()+'jpg';

  db.query(
    `insert into useritem(userid,itemimg,itemname,category,tag) values (?,?,?,?,?)`,
  [userLogin,itemimg,itemname,category,tag],
  function (error, result) {
    if(error){
      console.log(itemimg);

      throw error;
    }else
    console.log('itemname : '+itemname+' : '+itemimg);
  }) //end query
  res.redirect('/viewItems');

});


//update
router.post('/editItemPro', function(req, res, next) {
  var userLogin=req.session.login; //로그인한 사용자 아이디
  // var _url = request.url;
  // var queryData = url.parse(_url, true).query;
  var itemid = req.body['itemid'];
  var itemname = req.body['itemname'];
  var category = req.body['category'];
  var tag = req.body['tag'];

  //var filename=_storage.filename;

  db.query(
    `UPDATE useritem set userid=?, itemname=?, category=?, tag=? WHERE itemid=?`,
  [userLogin,itemname,category,tag,itemid],
  function (error, result) {
    if(error){
      throw error;
    }else
    console.log(itemid+itemname+userLogin);
  }) //end query
  res.redirect('/viewItems?id='+itemid);
console.log('등록');
});

//delete
router.post('/deleteItem', function(req, res, next) {
  var userLogin=req.session.login; //로그인한 사용자 아이디
  var itemid = req.body['itemid'];

  db.query(
    `DELETE FROM useritem WHERE itemid=?`,
  [itemid],
  function (error, result) {
    if(error){
      throw error;
    }else
    console.log(itemid);
  }) //end query
  res.redirect('/viewItems');
console.log('삭제');
});

module.exports = router;
