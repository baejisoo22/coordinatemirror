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
      <p><input type="button" class="btn btn-light" onclick=" location.href='/index'" value="HOME"/></p>
      </div>
      <div class="container p-3 my-3 border">
      <a class="nav-link active" href="/addItem">ADD</a>
      <a class="nav-link active" href="/viewItems">VIEW</a>

      <input type="button" class="btn btn-light" onclick=" location.href='/viewItems?category=outer'" value="outer"/>
      <input type="button" class="btn btn-light" onclick=" location.href='/viewItems?category=top'" value="top"/>
      <input type="button" class="btn btn-light" onclick=" location.href='/viewItems?category=bottom'" value="bottom"/>
      <input type="button" class="btn btn-light" onclick=" location.href='/viewItems?category=shoes'" value="shoes"/>
      <input type="button" class="btn btn-light" onclick=" location.href='/viewItems?category=bag'" value="bag"/>
      <input type="button" class="btn btn-light" onclick=" location.href='/viewItems?category=acc'" value="acc"/>
      <br><br>




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
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>


    </html>
    `;
  },list:function(items){
    var list = '<ul class="list-group list-group-flush">';
    var i = 0;
    while(i < items.length){
      list = list + `<li class="list-group-item"><a class="nav-link active" href="/viewItems?id=${items[i].itemid}">${(items[i].itemname)} : ${(items[i].itemimg)}</a></li>`;
      // <p><img src="../${(items[i].itemimg)}">${(items[i].itemname)}</p>`; //      list = list + `<li><a href="/viewItem?id=${items[i].itemid}">${(items[i].itemname)} : ${(items[i].itemimg)}</a></li>`;

      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
