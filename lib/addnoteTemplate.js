//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(itemname, list, body, control){
    return `
    <html lang="en">
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <div class="jumbotron text-center"">
    <h2>WIDGET</h2>  </div>

    <div class="container p-3 my-3 border">
            <p><input type="button" class="btn btn-light" value="MEMO"/></p>
            <p><input type="button" class="btn btn-light" onclick=" location.href='/addnote'" value="ADD"/></p>
            <p><input type="button" class="btn btn-light" onclick=" location.href='/index'" value="HOME"/></p>
            <p><input type="button" class="btn btn-light" onclick=" location.href='/logout'" value="LOGOUT"/></p>
</div>
      ${body}
      ${list}
      ${control}

    </body>
    </html>
    `;
  },list:function(items){
    var list = ``;

    return list;
  }
}
