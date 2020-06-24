const express = require("express");
const router = express.Router();
const multer = require('multer');

var _storage = multer.diskStorage({
  destination: function (req, file, cb) { //저장할 디렉토리 지정
    cb(null, 'uploads/') //callback함수
  },
  filename: function (req, file, cb) { // 파일명
    cb(null, Date.now()+'.jpg')
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
//router.get("/viewItems", (req, res) => res.render("viewItems", {page: "viewItems"}));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/checkid", (req, res) => res.render("checkid", {page: "checkid"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
//router.get("/menuCloset", (req, res) => res.render("menuCloset", {page: "menuCloset"}));
router.get("/addItem", (req, res) => res.render("addItem", {page: "addItem"}));

// router.post('/viewItem',function(req, res, next) {
//   var userLogin=req.session.login;
//   db.query(
//     `select itemname from useritem where userid='userLogin'`,
//   function (error, result) {
//     if(error){
//       console.log('error');
//       //throw error;
//     }else
//     var itemname = result[0].itemname
//     res.send('<h3>'+itemname+'</h3>');
//   })
//   console.log(userLogin);
// });


// router.get('/viewItem',function(req, res, next) {
// //   if(error){
// //   throw error;
// //   console.log('userLogin');
// // }else{
// //   var userLogin=req.session.login;
// //
// //   console.log(userLogin);
// //   res.send(userLogin);
// // }
// // res.send(userLogin);
// });

// router.get('/menuCloset', function (req, res) {
//   console.log('closet clicked');
//     res.send('Bye World!');
// });

module.exports = router;
