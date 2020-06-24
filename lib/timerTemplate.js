module.exports = {
  HTML:function(itemname, inputtime, body, endtime, timer){
    return `<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Material Design TimePicker</title>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
        <link href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
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
      <div class="container p-3 my-3 border">
      ${inputtime}
      ${timer}
      </div>

        <script>


            $('#usertime').timepicker({
                uiLibrary: 'bootstrap4'
            });

            var countDownDate = new Date('${endtime}').getTime();

            // Update the count down every 1 second
            var x = setInterval(function() {

              // Get todays date and time
              var now = new Date().getTime();

              // Find the distance between now an the count down date
              var distance = countDownDate - now;

              // Time calculations for days, hours, minutes and seconds
              var days = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);

              // Display the result in an element with id="demo"
              document.getElementById("demo").innerHTML = minutes + " : " + seconds;

              // If the count down is finished, write some text
              if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "";
              }
            }, 1000);

        </script>
    </body>
    </html>
`
}
}
