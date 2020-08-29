//var g = G$(firstname, lastname, language);
var g = G$("john", "Doe");

//use chainable methods
g.greet().setLang("es").greet(true).log();
console.log(g);

//on click creates new obj , set lang , and display in h2 tag and log it
$("#login").click(function () {
  var loginGrtr = G$("John", "Doe");
  $("#logindiv").hide();

  loginGrtr.setLang($("#lang").val()).HTMLGreeting("#greeting", true).log();
});
