const express = require("express");
const router = express.Router();
const multer = require('multer');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var menuLooksTemplate = require('../lib/menuLooksTemplate.js');
var viewLooksTemplate = require('../lib/viewLooksTemplate.js');
//var template = require('../lib/template.js');
//var template = require('../lib/template.js');

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
//
// router.get('/menuLooks', function(request, response, next) {
//
// )}

router.get('/menuLooks', function(request, response, next) {
  var userLogin=request.session.login; //로그인한 사용자 아이디
  var _url = request.url;
      var queryData = url.parse(_url, true).query;
      var pathname = url.parse(_url, true).pathname;
          //코디 목록 보기 (현재 로그인한 사용자의 전체 코디)
          db.query(`SELECT * FROM userlook where userid=?`,[userLogin], function(error,userlook){
            if(error){
              throw error;
            }

            var userlookitemid = userlook[0].itemid;
            var userlookname = userlook[0].userlookname;

          if(userlook[0]!=null){

            db.query(`SELECT * FROM userlook where userlookname=?`,[userlookname], function(error,userlook){

                db.query(`SELECT * FROM useritem WHERE itemid=?`,[userlookitemid], function(error2,userlookitem){
                  if(error2){
                    throw error2;
                  }



                  //var userlookitemid = userlook[0].itemid;


                  var itemname = userlookitem[0].itemname;
                  var itemimg = userlookitem[0].itemimg;
                  var list = viewLooksTemplate.list(userlookitem,userlookname);
                  var html = viewLooksTemplate.HTML(userlookitem, list,
                    ` `,
                    `  `);
                    //console.log(queryData.id);
                    response.writeHead(200);
                    response.end(html);
                  });
                  });
                  } // if(userlook[0]!=null)

                  else //userlook==null
                  {
                    var items=``;
                    var itemname = ``; //title
                    var itemimg = ``; //description
                    var category = ``;
                    var list = ``;
                    var html = viewLooksTemplate.HTML(items, list,
                      ``,
                      `<a class="nav-link active" href="/addItem">ADD</a>등록된 코디가 없습니다.`);
                      //console.log(queryData.id);
                      response.writeHead(200);
                      response.end(html);
                      //response.redirect('/addItem');
                }

                  });




// else {  //queryData!=undefined , id값이 있을 때
//   db.query(`SELECT * FROM useritem where userid=?`,[userLogin], function(error,items){
//     if(error){
//       throw error;
//     }
//     if(items[0]!=null){
//     db.query(`SELECT itemid,itemimg,itemname,category FROM useritem WHERE userid=? and itemid=?`,[userLogin,queryData.id], function(error2,useritem){
//       if(error2){
//         throw error2;
//       }
//       var itemname = useritem[0].itemname; //title
//       var itemimg = useritem[0].itemimg; //description
//       var category = useritem[0].category;
//       var list = template.list(items);
//       var html = template.HTML(items, list,
//         `<div class="btn-group-vertical">
//            <button type="button" class="btn btn-light" onclick="location.href='/editItem?id=${queryData.id}'">EDIT</button>
//            <form action="deleteItem" method="post">
//            <input type="hidden" Name="itemid" value="${queryData.id}">
//            <input type="submit" class="btn btn-light" value="DEL"/>
//            </form>
//          </div> `, //`itemMenu`,
//         `<h2>${itemname}</h2>${itemimg} / ${category}
//         <div class="card" style="width: 18rem;">
// <img class="card-img-top" src="${itemimg}" alt="Card image cap">
// <div class="card-body">
// <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
// </div>
// </div>  `);

      //   response.writeHead(200);
      //   response.end(html);
      // });
    // } // if(items[0]!=null)
    // else
    //
    // response.send('등록된 아이템이 없습니다. <a href="/addItem">아이템 등록하기</a>');
    //

  // }); //end of first dbquery

 // }//end of else


});



router.get('/addLook', function(request, response, next) {

    var userLogin=request.session.login; //로그인한 사용자 아이디
    var _url = request.url;
        var queryData = url.parse(_url, true).query;
        var pathname = url.parse(_url, true).pathname;
          //if(queryData.id === undefined){
            //아이템 목록 보기 (현재 로그인한 사용자의 전체 아이템)

            db.query(`SELECT * FROM useritem where userid=?`,[userLogin], function(error,item){
              if(error){
                throw error;
              }

  if(item[0]!=null){ //등록된 아이템이 있을 때
  //if(queryData.category!=undefined){
  var category = ['outer', 'top', 'bottom','shoes','bag','acc'];
var currentcategory=category[0];
      db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory], function(error2,items){
        if(error2){
          throw error2;
        }

        if(items[0]!=null){



        var itemname = items[0].itemname;
        var itemimg = items[0].itemimg;
        var list = menuLooksTemplate.list(items,currentcategory);
        // var html = menuLooksTemplate.HTML(items, list,
        //   ` `,
        //   ` `);
  } //end 54 if(items[0]!=null){

  else{ //해당 카테고리 아이템이 없을때
    var list = `<input type="button" class="btn btn-light" value="${currentcategory}"/> &nbsp&nbsp아이템이 없습니다.
    <input type="hidden" Name="${currentcategory}" value="0">`;
    var html = menuLooksTemplate.HTML(items, list,
      ` `,
      ` `);
    }
  // response.writeHead(200);
  // response.end(html);
  //}); //end 51
  //     } // if(items[0]!=null)
  //   else //items==null
  //   {
  //     var items=``;
  //     var itemname = ``; //title
  //     var itemimg = ``; //description
  //     var list=``;
  //     var html = menuLooksTemplate.HTML(items, list,
  //       ` else`,
  //       `<a class="nav-link active" href="/addItem">ADD</a>등록된 아이템이 없습니다.`);
  //       //console.log(queryData.id);
  // }

  var currentcategory2=category[1];
        db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory2], function(error2,items2){
          if(error2){
            throw error2;
          }

          if(items2[0]!=null){



          // var itemname = items[0].itemname;
          // var itemimg = items[0].itemimg;
          var list2 = menuLooksTemplate.list2(items2,currentcategory2);
          var html = menuLooksTemplate.HTML(items, list,list2,
            `  `,
            ` `);
    } //end 54 if(items[0]!=null){

    else{ //해당 카테고리 아이템이 없을때
      var list2 = `<input type="button" class="btn btn-light" value="${currentcategory2}"/> &nbsp&nbsp아이템이 없습니다.
      <input type="hidden" Name="${currentcategory2}" value="0">`;
      var html = menuLooksTemplate.HTML(items, list,list2,
        ` `,
        ` `);


    } //end 69

    var currentcategory3=category[2];
          db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory3], function(error2,items3){
            if(error2){
              throw error2;
            }

            if(items3[0]!=null){



            // var itemname = items[0].itemname;
            // var itemimg = items[0].itemimg;
            var list3 = menuLooksTemplate.list3(items3,currentcategory3);
            var html = menuLooksTemplate.HTML(items, list,list2,
              list3,
              ` `);
      } //end 54 if(items[0]!=null){

      else{ //해당 카테고리 아이템이 없을때
        var list3 = `<input type="button" class="btn btn-light" value="${currentcategory3}"/> &nbsp&nbsp아이템이 없습니다.
        <input type="hidden" Name="${currentcategory3}" value="0">`;
        var html = menuLooksTemplate.HTML(items, list,list2,
          list3,
          ` `);


      } //end else
      var currentcategory4=category[3];
            db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory4], function(error2,items4){
              if(error2){
                throw error2;
              }

              if(items4[0]!=null){



              // var itemname = items[0].itemname;
              // var itemimg = items[0].itemimg;
              var list4 = menuLooksTemplate.list4(items4,currentcategory4);
              var html = menuLooksTemplate.HTML(items, list,list2,
                list3,list4,
                ` `);
        } //end 54 if(items[0]!=null){

        else{ //해당 카테고리 아이템이 없을때
          var list4 = `<input type="button" class="btn btn-light" value="${currentcategory4}"/> &nbsp&nbsp아이템이 없습니다.
          <input type="hidden" Name="${currentcategory4}" value="0">`;
          var html = menuLooksTemplate.HTML(items, list,list2,
            list3,list4,
            ` `);


        } //end else
        var currentcategory5=category[4];
              db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory5], function(error2,items5){
                if(error2){
                  throw error2;
                }

                if(items5[0]!=null){



                // var itemname = items[0].itemname;
                // var itemimg = items[0].itemimg;
                var list5 = menuLooksTemplate.list5(items5,currentcategory5);
                var html = menuLooksTemplate.HTML(items, list,list2,
                  list3,list4,list5,
                  ` `);
          } //end 54 if(items[0]!=null){

          else{ //해당 카테고리 아이템이 없을때
            var list5 = `<input type="button" class="btn btn-light" value="${currentcategory5}"/> &nbsp&nbsp아이템이 없습니다.
            <input type="hidden" Name="${currentcategory5}" value="0">`;
            var html = menuLooksTemplate.HTML(items, list,list2,
              list3,list4,list5,
              ` `);


          } //end else
          var currentcategory6=category[5];
                db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory6], function(error2,items6){
                  if(error2){
                    throw error2;
                  }

                  if(items6[0]!=null){



                  // var itemname = items[0].itemname;
                  // var itemimg = items[0].itemimg;
                  var list6 = menuLooksTemplate.list6(items6,currentcategory6);
                  var html = menuLooksTemplate.HTML(items, list,list2,
                    list3,list4,list5,list6,
                    ` `);
            } //end 54 if(items[0]!=null){

            else{ //해당 카테고리 아이템이 없을때
              var list6 = `<input type="button" class="btn btn-light" value="${currentcategory6}"/> &nbsp&nbsp아이템이 없습니다.
              <input type="hidden" Name="${currentcategory6}" value="0">

              `;
              var html = menuLooksTemplate.HTML(items, list,list2,
                list3,list4,list5,list6,
                ` `);


            } //end else


    response.writeHead(200);
    response.end(html);

      });
      });
      });
    }); //end 49
  }); // end 96 db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory2], function(error2,items2){
  }); //end 51 db.query(`SELECT * FROM useritem WHERE userid=? and category=?`,[userLogin,currentcategory], function(error2,items){
        } // if(items[0]!=null)

      else //items==null
      {

          response.redirect('/viewItems');

    }


  }); //end 42 db.query(`SELECT * FROM useritem where userid=?`,[userLogin], function(error,item){
  //}//end of if queryData===undefined
  });


  // router.post('/addLookPro', function(req, res, next) {
  //
  //   var itemid = req.body['itemid'];
  //   var itemname = req.body['itemname'];
  //   var category = req.body['category'];
  //   var tag = req.body['tag'];
  //   var userLogin=req.session.login;
  //
  //   db.query(
  //     `insert into useritem(userid,itemimg,itemname,category,tag) values (?,?,?,?,?)`,
  //   [userLogin,itemimg,itemname,category,tag],
  //   function (error, result) {
  //     if(error){
  //       console.log(itemimg);
  //
  //       throw error;
  //     }else
  //     console.log('itemname : '+itemname+' : '+itemimg);
  //   }) //end query
  //   res.redirect('/viewItems');
  //
  // });


  router.post('/addLookPro', function(req, res, next) {

    var category = ['outer', 'top', 'bottom','shoes','bag','acc'];
    var itemid = new Array();
    // var values = new Array();
    var userlookfavorite=req.body['userlookfavorite'];
    if (userlookfavorite != '1'){
      var userlookfavorite=0;
    }

    var userlookname = req.body['userlookname'];
    var userid=req.session.login;

    for(var i=0; i<=category.length; i++){
      itemid[i] = req.body[category[i]];
    }

    var outer=parseInt(itemid[0]);
    var top=parseInt(itemid[1]);
    var bottom=parseInt(itemid[2]);
    var shoes=parseInt(itemid[3]);
    var bag=parseInt(itemid[4]);
    var acc=parseInt(itemid[5]);


    db.query(
      `insert into userlook(userlookname,userid,itemid,userlookfavorite) values (?,?,?,?)`,
    [userlookname,userid,itemid[0],userlookfavorite],
    function (error, result) {
      if(error){
        console.log(error);

        throw error;
      }else
      console.log('outer : '+outer);
    }) //end query

    db.query(
      `insert into userlook(userlookname,userid,itemid,userlookfavorite) values (?,?,?,?)`,
    [userlookname,userid,itemid[1],userlookfavorite],
    function (error, result) {
      if(error){
        console.log(error);

        throw error;
      }else
      console.log('outer : '+outer);
    }) //end query

    db.query(
      `insert into userlook(userlookname,userid,itemid,userlookfavorite) values (?,?,?,?)`,
    [userlookname,userid,itemid[2],userlookfavorite],
    function (error, result) {
      if(error){
        console.log(error);

        throw error;
      }else
      console.log('outer : '+outer);
    }) //end query

    db.query(
      `insert into userlook(userlookname,userid,itemid,userlookfavorite) values (?,?,?,?)`,
    [userlookname,userid,itemid[3],userlookfavorite],
    function (error, result) {
      if(error){
        console.log(error);

        throw error;
      }else
      console.log('outer : '+outer);
    }) //end query

    db.query(
      `insert into userlook(userlookname,userid,itemid,userlookfavorite) values (?,?,?,?)`,
    [userlookname,userid,itemid[4],userlookfavorite],
    function (error, result) {
      if(error){
        console.log(error);

        throw error;
      }else
      console.log('outer : '+outer);
    }) //end query

    db.query(
      `insert into userlook(userlookname,userid,itemid,userlookfavorite) values (?,?,?,?)`,
    [userlookname,userid,itemid[5],userlookfavorite],
    function (error, result) {
      if(error){
        console.log(error);

        throw error;
      }else
      console.log(itemid[5]);
    }) //end query


    var insert = 'select * from userlook;'
    var query = db.query(insert, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect('/menuLooks');

    });


module.exports = router;
