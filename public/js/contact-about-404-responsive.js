// jshint esversion:9

// Responsive

// Slide navbar menu
$(".navbar-menu").click(() => {
  $(".navbar-menu").toggleClass("show-navbar-menu").toggleClass("hide-navbar-menu");
  $(".menu-slider").toggleClass("show-menu-slider");
});

// Display genres on slide menu
$(".genres a h2").click(() => {
  $(".genres > div").slideToggle();
});

// Show and hide navbar on scroll
let prevScrollPosition = window.scrollY;

$(window).scroll(() => {
  let nowScrollPosition = window.scrollY;

  if(nowScrollPosition > prevScrollPosition) {
    $(".navbar").css("top", "-80px");
  }
  else {
    $(".navbar").css("top", "0");
  }

  prevScrollPosition = nowScrollPosition;
});
