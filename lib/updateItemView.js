//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(itemimg,itemname,category,tag){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://cdn.jsdelivr.net/parsleyjs/2.0.0-rc4/parsley.min.js"></script>
    <script src="jquery-3.5.0.min.js"></script>
    <script src="parsley.min.js"></script>
    <script src="signup.js"></script>
    </head>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <div class="jumbotron text-center"">

    <h2>Add Items</h2>
    </div>

    <div class="container p-3 my-3 border">
          <form action="/addItem" method="post" enctype="multipart/form-data"
          class="uk-form bt-flabels js-flabels"
          data-parsley-validate
          >
      <p><input type="file" name="itemimg"
        data-parsley-required
        data-parsley-trigger="keyup"
        data-parsley-minlength-message="이미지를 선택해주세요."
        ></p>
      <p><label>이름</label></p>
      <p><input type="text" name="itemname"
        placeholder="아이템 이름" autocomplete="off" data-parsley-required
        data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="12"
        data-parsley-minlength-message="이름을 입력해주세요."
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
      <select name="tag">
        <option value="spring">spring</option>
        <option value="summer" selected>summer</option>
        <option value="fall">fall</option>
        <option value="winter">winter</option>
      </select>

      <select name="tpoTag">
        <option value="campus">campus</option>
        <option value="hangout">hang out</option>
        <option value="library" selected>library</option>
        <option value="office">office</option>
      </select>

      <select name="styleTag">
        <option value="casual">casual</option>
        <option value="chic" selected>chic</option>
        <option value="romantic">romantic</option>
      </select>

      <p><input type="submit" class="btn btn-light" id="uploadItem" value="등록"></p>
      <input type="button" class="btn btn-light" onclick=" location.href='/menuCloset'" value="CLOSET"/>

    </form>
    </div>

    `;
  }
}
