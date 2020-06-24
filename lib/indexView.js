//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(username){
    return `<!DOCTYPE html>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <div class="jumbotron text-center">
        <h2>HOME</h2>
        <a class="nav-link active" href="/myInfo">${username}님 마이페이지</a>
        <a class="nav-link active" href="/logout">logout</a>

    </div>
    <div class="container p-3 my-3 border"><input type="button" class="btn btn-light" onclick=" location.href='/viewItems'" value="CLOSET"/>
    <input type="button" class="btn btn-light" onclick=" location.href='/menuWidget'" value="WIDGET"/>
    <input type="button" class="btn btn-light" onclick=" location.href='/menuLooks'" value="LOOKS"/>

        </div>
    `;
  }
}
