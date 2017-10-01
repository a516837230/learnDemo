function show() {
    var html = "";
     mark.forEach(function (val) {
         var keys =Object.keys(val);
         html +="<div class = 'Object'>";
         keys.forEach(function (key) {
             html += "<b>"+ key + "</b>: " + val[key] + "<br>";

         });
         html += "</div><br>";
     });
     document.getElementById("container").innerHTML = html ;
     console.log('show')
}