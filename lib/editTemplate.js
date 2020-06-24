//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(itemname, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://cdn.jsdelivr.net/parsleyjs/2.0.0-rc4/parsley.min.js"></script>
    <script src="jquery-3.5.0.min.js"></script>
    <script src="parsley.min.js"></script>
    <script src="signup.js"></script>
    <script>getElementById("itemMenu").style.display ='none';</script>
    </head>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


      <title>Items</title>
      <meta charset="utf-8">
    </head>
    <body>
    <div class="jumbotron text-center"">
      <h2>View Items</h2>
      </div>
      <div class="container p-3 my-3 border">
      <a href="/category">VIEW</a>
      <img src="/uploads/1588484977277.jpg">

      ${list}
      ${control}
      ${body}
      </div>
    </body>
    <script>
    function showHide(){
        if(document.getElementById("itemMenu").style.display =='none'){
            document.getElementById("itemMenu").style.display ='block';
        }
        else{
            document.getElementById("itemMenu").style.display ='none';
        }
    }
    </script>


    </html>
    `;
  },list:function(items){
    var list = '<ul>';
    var i = 0;
    while(i < items.length){
      list = list + `<li><a href="/editItem?id=${items[i].itemid}">${(items[i].itemname)} : ${(items[i].itemimg)}</a></li>`;
      // <p><img src="../${(items[i].itemimg)}">${(items[i].itemname)}</p>`; //      list = list + `<li><a href="/viewItem?id=${items[i].itemid}">${(items[i].itemname)} : ${(items[i].itemimg)}</a></li>`;

      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
