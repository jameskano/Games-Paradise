// jshint esversion:9

// Sticky sidebar
// (sidebar has its own scroll with a hidden scrollbar)
// let scrollMove = 0; this var is in the HTML to avoid repetition when js file is reloaded
scrollMove = 0;

$(window).scroll(() => {
  // Start scrolling sidebar automathically when reach top sticky point
  if(window.scrollY >= (328 - 30)) {
    // Dynamic height
    $(".side-bar").height($(window).innerHeight() - 30);

    $(".side-bar").animate({
      scrollTop: $(".side-bar").scrollTop() + (window.scrollY - scrollMove)
    }, 10);
  }
  else {
    // Dynamic height
    $(".side-bar").height($(window).innerHeight() + window.scrollY);

    $(".side-bar").scrollTop(0);
  }

  scrollMove = window.scrollY;
});
