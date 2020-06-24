//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(itemname, list,list2, list3, list4, list5,list6,control){
    return `
    <!doctype html>
    <html>
    <head>
    <title>Looks</title>
    <meta charset="utf-8">
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://cdn.jsdelivr.net/parsleyjs/2.0.0-rc4/parsley.min.js"></script>
    <script src="jquery-3.5.0.min.js"></script>
    <script src="parsley.min.js"></script>
 <link rel="stylesheet" href="bootstrap.css"/>
<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" href="css/awesome-bootstrap-checkbox.css"/>
    <script>getElementById("itemMenu").style.display ='none';</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
    </head>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<body>


    <div class="jumbotron text-center"">
      <h2>Looks</h2>
      <p><input type="button" class="btn btn-light" onclick=" location.href='/index'" value="HOME"/></p>
      </div>


      <form action="/addLookPro" method="post"
      class="form-group"
      data-parsley-validate>
      <div class="container p-3 my-3 border">
      <div class="radio radio-info radio-inline">
      ${list}
      </div>
      </div>

      <div class="container p-3 my-3 border">
      <div class="radio radio-info radio-inline">
      ${list2}
      </div>
      </div>


      <div class="container p-3 my-3 border">
      <div class="radio radio-info radio-inline">

      ${list3}
      </div>
      </div>

      <div class="container p-3 my-3 border">
      <div class="radio radio-info radio-inline">
      ${list4}
      </div>
      </div>

      <div class="container p-3 my-3 border">
      <div class="radio radio-info radio-inline">
      ${list5}
      </div>
      </div>

      <div class="container p-3 my-3 border">
      <div class="radio radio-info radio-inline">
      ${list6}
      </div>
      </div>

      <div class="container p-3 my-3">
      <input type="button" class="btn btn-light" value="코디 이름"/>
      <input class="form-control" name="userlookname" type="text" placeholder="lookname">

      <input type="button" class="btn btn-light" value="즐겨찾기"/>
      <!-- Rounded switch -->
      <label class="switch">
        <input type="checkbox" name="userlookfavorite" value="1">
        <span class="slider round"></span>
      </label>
      <br><br>
      <input type="submit" class="btn btn-light" value="등록">

      </div>

      <br><br>
</form>

    </body>
    <script>
    </html>
    `;
  },list:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  },list2:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  },list3:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  },list4:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  },list5:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  },list6:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  },list7:function(items,category){
    var list = `<input type="button" class="btn btn-light" value="${category}"/>`;
    var i = 0;
    while(i < items.length){
      var itemid=items[i].itemid;
      list = list + `<input type="radio" name="${category}" id="inlineRadio1" value="${itemid}" checked>
                              <label for="radio7">
                                  &nbsp&nbsp${(items[i].itemname)} : ${(items[i].itemimg)}
                              </label>
                          <br>


      `;

      i = i + 1;
    }
    list = list+`</div>`;
    return list;
  }
}
