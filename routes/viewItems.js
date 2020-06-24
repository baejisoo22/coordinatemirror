const express = require("express");
const router = express.Router();
const multer = require('multer');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('../lib/template.js');
var editTemplate = require('../lib/editTemplate.js');

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
router.get('/', (req, res) => res.render('index'));
router.get('/index', (req, res) => res.render('index'));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/checkid", (req, res) => res.render("checkid", {page: "checkid"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.get("/menuCloset", (req, res) => res.render("menuCloset", {page: "menuCloset"}));
router.get("/addItem", (req, res) => res.render("addItem", {page: "addItem"}));

router.get('/viewItems', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  var _url = request.url;
      var queryData = url.parse(_url, true).query;
      var pathname = url.parse(_url, true).pathname;
        if(queryData.id === undefined){
          //아이템 목록 보기 (현재 로그인한 사용자의 전체 아이템)
          db.query(`SELECT * FROM useritem where userid=?`,[userLogin], function(error,item){
            if(error){
              throw error;
            }

if(item[0]!=null){

//카테고리별 보기
if(queryData.category!=undefined){
    db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,queryData.category], function(error2,items){
      if(error2){
        throw error2;
      }
      if(items[0]!=null)
      {

      var itemname = items[0].itemname;
      var itemimg = items[0].itemimg;
      var category = queryData.category;
      var list = template.list(items);
      var html = template.HTML(items, list,
        ``,
        ``);
        response.writeHead(200);
        response.end(html);
} //end 54

else{ //해당 카테고리 아이템이 없을때
  var itemname = ``; //title
  var itemimg = ``; //description
  var category = ``;
  var list = ``;
  var html = template.HTML(items, list,
    ``,
    `<a class="nav-link active" href="/addItem">ADD</a>아이템을 추가하세요.`);
    //console.log(queryData.id);
    response.writeHead(200);
    response.end(html);

} //end 69
}); //end 49

} //end 48

      else {// id값없음 전체목록
                db.query(`SELECT * FROM useritem WHERE userid=?`,[userLogin], function(error2,items){
                  if(error2){
                    throw error2;
                  }
                  var itemname = items[0].itemname;
                  var itemimg = items[0].itemimg;
                  var list = template.list(items);
                  var html = template.HTML(items, list,
                    ` `,
                    `  `);
                    //console.log(queryData.id);
                    response.writeHead(200);
                    response.end(html);
                  });
      } //end 83

    } // if(items[0]!=null)
  else //items==null
  {
    var items=``;
    var itemname = ``; //title
    var itemimg = ``; //description
    var category = ``;
    var list = ``;
    var html = template.HTML(items, list,
      ``,
      `<a class="nav-link active" href="/addItem">ADD</a>등록된 아이템이 없습니다.`);
      //console.log(queryData.id);
      response.writeHead(200);
      response.end(html);
      //response.redirect('/addItem');
}

}); //end of first dbquery
}//end of if queryData===undefined


else {  //queryData!=undefined , id값이 있을 때
  db.query(`SELECT * FROM useritem where userid=?`,[userLogin], function(error,items){
    if(error){
      throw error;
    }
    if(items[0]!=null){
    db.query(`SELECT itemid,itemimg,itemname,category FROM useritem WHERE userid=? and itemid=?`,[userLogin,queryData.id], function(error2,useritem){
      if(error2){
        throw error2;
      }
      var itemname = useritem[0].itemname; //title
      var itemimg = useritem[0].itemimg; //description
      var category = useritem[0].category;
      var list = template.list(items);
      var html = template.HTML(items, list,
        `<div class="btn-group-vertical">
           <button type="button" class="btn btn-light" onclick="location.href='/editItem?id=${queryData.id}'">EDIT</button>
           <form action="deleteItem" method="post">
           <input type="hidden" Name="itemid" value="${queryData.id}">
           <input type="submit" class="btn btn-light" value="DEL"/>
           </form>
         </div> `, //`itemMenu`,
        `<h2>${itemname}</h2>${itemimg} / ${category}
        <div class="card" style="width: 18rem;">
<img class="card-img-top" src="${itemimg}" alt="Card image cap">
<div class="card-body">
<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
</div>
</div>  `);

        response.writeHead(200);
        response.end(html);
      });
    } // if(items[0]!=null)
    else

    response.send('등록된 아이템이 없습니다. <a href="/addItem">아이템 등록하기</a>');


  }); //end of first dbquery

 }//end of else


});


//editItem
router.get('/editItem', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  var _url = request.url;
      var queryData = url.parse(_url, true).query;
      var pathname = url.parse(_url, true).pathname;

      if (queryData!=undefined) {  //queryData!=undefined , id값이 있을 때
        db.query(`SELECT * FROM useritem where userid=?`,[userLogin], function(error,items){
          if(error){
            throw error;
          }
          if(items[0]!=null){
          db.query(`SELECT * FROM useritem WHERE userid=? and itemid=?`,[userLogin,queryData.id], function(error2,useritem){
            if(error2){
              throw error2;
            }
            var itemname = useritem[0].itemname; //title
            var itemimg = useritem[0].itemimg; //description
            var category = useritem[0].category;
            var list = template.list(items);
            var html = template.HTML(items, list,
              ` `, //``,
              `


              <div class="container p-3 my-3 border">
                    <form action="/editItemPro" method="post"
                    class="form-group"
                    data-parsley-validate
                    >
                    <input type="hidden" Name="itemid" value="${queryData.id}">
                    <!--
                <p><input type="file" name="itemimg" class="form-control"
                  data-parsley-required
                  data-parsley-trigger="keyup"
                  data-parsley-minlength-message="이미지를 선택해주세요."
                  ></p>-->
                <p><label for="exampleInputEmail1">이름</label></p>
                <p><input type="text" name="itemname" class="form-control"
                  placeholder="아이템 이름" autocomplete="off" data-parsley-required
                  data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="12"
                  data-parsley-minlength-message="이름을 입력해주세요." value="${useritem[0].itemname}"
                  /></p>
              <p><label>카테고리</label></p>
              <input type="radio" name="category" value="outer" checked/> outer
              <input type="radio" name="category" value="top"/> top
              <input type="radio" name="category" value="bottom"/> bottom
              <input type="radio" name="category" value="shoes"/> shoes
              <input type="radio" name="category" value="bag"/> bag
              <input type="radio" name="category" value="acc"/> acc
              <br><br>


                <p><label>태그</label></p>
                <select name="tag" class="form-control">
                  <option value="spring">spring</option>
                  <option value="summer" selected>summer</option>
                  <option value="fall">fall</option>
                  <option value="winter">winter</option>
                </select>

                <select name="tpoTag" class="form-control">
                  <option value="campus">campus</option>
                  <option value="hangout">hang out</option>
                  <option value="library" selected>library</option>
                  <option value="office">office</option>
                </select>

                <select name="styleTag" class="form-control">
                  <option value="casual">casual</option>
                  <option value="chic">chic</option>
                  <option value="romantic">romantic</option>
                </select>

                <p><input type="submit" class="btn btn-light" id="uploadItem" value="수정">
                <input type="button" class="btn btn-light" id="uploadItem" value="취소" onclick=" location.href='/viewItems?id=${queryData.id}'">
                </p>
                <input type="button" class="btn btn-light" onclick=" location.href='/menuCloset'" value="CLOSET"/>

              </form>
              </div>

`);

              response.writeHead(200);
              response.end(html);
            });
          } // if(items[0]!=null)
          else
          response.redirect('/viewItems');


        }); //end of first dbquery

       }//end of else

    //}//end of if pathname

});



module.exports = router;
