//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(itemname, list, body, control, timer){
    return `
    <html lang="en">
    <meta charset="utf-8">
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://cdn.jsdelivr.net/parsleyjs/2.0.0-rc4/parsley.min.js"></script>
    <script src="jquery-3.5.0.min.js"></script>
    <script src="parsley.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"></script>
    </head>


    <div class="jumbotron text-center"">
    <h2>WIDGET</h2>
    <p><input type="button" class="btn btn-light" onclick=" location.href='/index'" value="HOME"/></p>
    </div>

    <div class="container p-3 my-3 border">
            <p><input type="button" class="btn btn-light" value="MEMO"/></p>
            <input type="button" class="btn btn-light" onclick=" location.href='/addnote'" value="ADD"/>
            <input type="button" class="btn btn-light" onclick=" location.href='/viewnotes'" value="VIEW"/>
            </p>
            <p><input type="button" class="btn btn-light"onclick=" location.href='/weather'" value="WEATHER"/></p>
            <p><input type="button" class="btn btn-light"onclick=" location.href='/timer'" value="TIMER"/></p>

</div>


      ${body}

      ${list}
      ${control}

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    </body>

    </html>
    `;
  },list:function(items){
    var list = ``;

    return list;
  }
}
