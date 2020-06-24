//노트 목록

module.exports = {
  HTML:function(itemname, list, body, control){
    return `
    <html lang="en">
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <div class="jumbotron text-center"">
    <h2>WIDGET</h2>
    <a class="nav-link active" href="/logout">logout</a>
    </div>

    <div class="container p-3 my-3 border">
            <p><input type="button" class="btn btn-light" value="MEMO"/></p>
            <input type="button" class="btn btn-light" onclick=" location.href='/addnote'" value="ADD"/>
            <input type="button" class="btn btn-light" onclick=" location.href='/viewnotes'" value="VIEW"/>
            </p>
            <p><input type="button" class="btn btn-light"onclick=" location.href='/weather'" value="WEATHER"/></p>
            <p><input type="button" class="btn btn-light" onclick=" location.href='/index'" value="HOME"/></p>
</div>
      ${body}
      ${list}
      ${control}

    </body>
    </html>
    `;
  },list:function(notes){
    var list = '<div class="container p-3 my-3 border"> <ul class="list-group list-group-flush">';
    var i = 0;
    while(i < notes.length){
      list = list + `<li class="list-group-item"><a class="nav-link active" href="/viewnotes?id=${notes[i].noteid}">${(notes[i].note)} : ${(notes[i].created)}</a></li>
      `;
      // <p><img src="../${(items[i].itemimg)}">${(items[i].itemname)}</p>`; //      list = list + `<li><a href="/viewItem?id=${items[i].itemid}">${(items[i].itemname)} : ${(items[i].itemimg)}</a></li>`;

      i = i + 1;
    }
    return list;
  }
}
