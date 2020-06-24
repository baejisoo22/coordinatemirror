const express = require("express");
const router = express.Router();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options={
  host:'localhost',
  user:'root',
  password:'bjs135',
  database:'testdb',
  port:3307
};
var sessionStore=new MySQLStore(options);

var mysql=require('mysql');
var db=mysql.createConnection(options);
db.connect();

//화면 가져오기
router.get("/index", (req, res) => res.render("index", {page: "index"}));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/checkid", (req, res) => res.render("checkid", {page: "checkid"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.get("/addItem", (req, res) => res.render("addItem", {page: "addItem"}));
router.get("/viewItems", (req, res) => res.render("viewItems", {page: "viewItems"}));

router.use(session({
  secret:"ghjghf",
  resave:false,
  saveUninitialized:true,
  store: sessionStore
}))

router.post('/login', function(req,res){
  var userid = req.body['userid'];
  var password = req.body['password'];

    db.query(
      `select userid,password from userinfo
      where userid=? and password=?`,
    [userid,password], function(err,result){
        if(err){
        throw err;
      }
         if(result[0]!==undefined){
            req.session.userid = result[0].userid;
            req.session.password = result[0].password;
            req.session.login = result[0].userid;
            //세션 스토어가 이루어진 후 redirect를 해야함.
            req.session.save(function(){
                console.log('login');
            });
        res.redirect('/index');
        }
        else{
        res.send('아이디/비밀번호가 일치하지 않습니다. <a href="/login">다시 입력하기</a>');
      }
    });
})

//logout
router.get('/logout', (req, res) => {
  delete req.session.login;
  req.session.save(() => {
    res.redirect('/');
  });
});


module.exports = router;
