const express = require("express");
const router = express.Router();

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
router.get("/checkid", (req, res) => res.render("checkid", {page: "checkid"}));

//값 가져오기
router.post('/checkid', function(req, res, next) {
var userid = req.body['userid'];

db.query("select * from userinfo where id=?",[userid],function(err,data){

  if(data.length==0){

  }
  else {
    res.send('<p>아이디 중복</p>');
  }
})
      //console.log('사용가능한 아이디');
});

module.exports = router;
