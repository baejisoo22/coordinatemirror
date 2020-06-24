const express = require('express');
const app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
app.use(express.static('public'));
var options={
  host:'localhost',
  user:'root',
  password:'bjs135',
  database:'testdb',
  port:3307
};
var sessionStore=new MySQLStore(options);


const ejs=require('ejs');

const bodyParser=require('body-parser');

const PORT= process.env.PORT || 3000;

// routes
const indexRoute = require("./routes/index");
const addItemRoute = require("./routes/addItem");
const menuClosetRoute = require("./routes/menuCloset");
const viewItemsRoute = require("./routes/viewItems");
const loginoutRoute = require("./routes/viewItems");
const editItemRoute = require("./routes/editItem");
const myInfoRoute = require("./routes/myInfo");
const editUserInfoRoute = require("./routes/editUserInfo");
const menuWidgetRoute = require("./routes/menuWidget");
const menuLooksRoute = require("./routes/menuLooks");
const timerRoute = require("./routes/timer");



var mysql=require('mysql');
var db=mysql.createConnection({
host:'localhost',
user:'root',
password:'bjs135',
database:'testdb',
port:3307
});
db.connect();
app.get('/', (req, res) => res.render('main'));
app.get('/main', (req, res) => res.render('main'));

// 뷰엔진 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
  secret:"ghjghf",
  resave:false,
  saveUninitialized:true,
  store: sessionStore
}))

app.post('/login', function(req,res){
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
app.get('/logout', (req, res) => {
  delete req.session.login;
  req.session.save(() => {
    res.redirect('/');
  });
});

app.get('/api/get',function(req,res) {

      var data = req.query.data;

      console.log('GET Parameter = ' + data);


      var result = data + ' Succese';

      console.log(result);


      res.send({result:result});

});


//AJAX POST METHOD
app.post('/api/post', function(req, res){

    var data = req.body.data;

      console.log('POST Parameter = ' + data);


      var result = data + ' Succese';

      console.log(result);

      res.send({result:result});

});


// use routes
app.use("/", indexRoute);
app.use("/", addItemRoute);
app.use("/", loginoutRoute);
app.use("/", menuClosetRoute);
app.use("/", viewItemsRoute);
app.use("/", editItemRoute);
app.use("/", myInfoRoute);
app.use("/", editUserInfoRoute);
app.use("/", menuWidgetRoute);
app.use("/", menuLooksRoute);
app.use("/", timerRoute);

//listen
app.listen(PORT, function () {
    console.log('Example app listening on port',PORT);
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/bye', function (req, res) {
    res.send('Bye World!');
});
