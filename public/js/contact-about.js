// jshint esversion:9

// Change "container" width and margin in 404 page
if($(".container h1").text() === "404") {
  $(".container").css("width", "auto");
  $(".container").children().css("text-align", "center");
  $(".container").css("margin-top", "100px");
}


// Copyright margin top
if(window.location.href.includes("about") || window.location.href.includes("contact")) {
  let marginTop = window.innerHeight - ($(".header-info").height() + parseFloat($(".header-info").css("margin-top")) + parseFloat($(".header-info").css("margin-bottom")) + $(".navbar").height() + $(".cr").height() + $(".container").height() + parseFloat($(".cr").css("margin-bottom")));

  if(marginTop < 10) {
    $(".cr").css("margin-top", "50px");
  }
  else {
    $(".cr").css("margin-top", marginTop);
  }
}
else {
  let marginTop = window.innerHeight - ($(".navbar").height() + $(".cr").height() + $(".container").height() + parseFloat($(".container").css("margin-top")) + parseFloat($(".cr").css("margin-bottom")));

  if(marginTop < 10) {
    $(".cr").css("margin-top", "50px");
  }
  else {
    $(".cr").css("margin-top", marginTop);
  }
}
