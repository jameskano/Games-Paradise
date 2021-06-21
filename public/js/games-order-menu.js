// jshint esversion:9

// Adapt order menu according to the url and the order needs of the shown games
let locationUrl = window.location.href.split("3000/")[1];

function adaptOrderMenu() {
  if(locationUrl === "coming-soon" || locationUrl === "recently-released") {
    $(".order-options").children().each(function() {
      if($(this).text() === "Relevance" || $(this).text() === "Popularity") {
        $(this).css("display", "none");
      }
    });
  }
  else if(locationUrl === "top" || locationUrl === "best") {
    $(".order-options").children().each(function() {
      if($(this).text() === "Rating") {
        $(this).css("display", "none");
      }
    });
  }
  else if(locationUrl === "search") {
    $(".header-options").css("visibility", "hidden");
  }
}

adaptOrderMenu();

// Order menu: Text shown by default
$(".order strong").text($(".order-options p:not([style='display: none;']):first").text());
