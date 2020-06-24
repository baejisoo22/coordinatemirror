//var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(edit, list, body, control, profilepic){
    return `
    <!doctype html>

    <html>
    <head>
    <meta charset="utf-8">
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://cdn.jsdelivr.net/parsleyjs/2.0.0-rc4/parsley.min.js"></script>
    <script src="jquery-3.5.0.min.js"></script>
    <script src="parsley.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    </head>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


      <title>Items</title>

    <body>
    <div class="jumbotron text-center"">
      <h2>My Page</h2>
      <p><input type="button" class="btn btn-light" onclick=" location.href='/index'" value="HOME"/></p>
      </div>

      <div class="container p-3 my-3 border">
      <div class="text-center">
  <img id="imgThumb" class="rounded" src="${(profilepic)}" width="100" height="100" >
  <a class="nav-link active" href="/uploadProfilepic">EDIT</a>
</div>
${body}

${edit}

      </div>

      <div class="container p-3 my-3 border">
      <a class="nav-link active" href="/editPasswordForm">비밀번호 변경하기</a>
      ${control}
      </div>
      <center>
      <div class="alert alert-success" id="alert-success">비밀번호가 일치합니다.</div>
      <div class="alert alert-danger" id="alert-danger">비밀번호가 일치하지 않습니다.</div>
      </center>
    </body>
</html>
    <script type="text/javascript">

    //비밀번호 일치 확인
       $(function(){
         $("#alert-success").hide();
         $("#alert-danger").hide();
         $(".newPassword").keyup(function(){
           var pwd1=$("#password").val();
           var pwd2=$("#passwordrepeat").val();
           if(pwd1 != "" || pwd2 != ""){
             if(pwd1 == pwd2){ $("#alert-success").show();
             $("#alert-danger").hide(); $("#submit").removeAttr("disabled");
           }else{
             $("#alert-success").hide();
             $("#alert-danger").show();
             $("#submit").attr("disabled", "disabled");
           }
         }
       });
     });
     </script>

    `;
  },list:function(userinfo){
    var userInfo = ` `;

    return userInfo;
  }
}
