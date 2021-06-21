// jshint esversion:9

// Display only 50 firsts games
function loadFirst() {
  for(let i = 0; i < $(".game").length; i++ ) {
    if(i > 49) {
      $(".game")[i].style.display = "none";
    }
  }
}

loadFirst();

// Load more games
function loadMore() {
  for(let i = 0; i < $(".game:hidden").length; i++) {
    if(i < 50) {
      $(".game:hidden")[i].style.display = "block";
    }
  }
}

$(".load-btn").click(() => {
  $(".balls").css("display", "flex");
  bounceBalls($(".ball:first-child"), 3, "10px", 300);
  setTimeout(function() {
    bounceBalls($(".ball:first-child").next(), 3, "10px", 300);
  }, 200);
  setTimeout(function() {
    bounceBalls($(".ball:last-child"), 3, "10px", 300);
  }, 400);
  setTimeout(function() {
    loadMore();
    $(".balls").hide();
  }, 2000);
});


// Uppercase pages header and replace "-" with white space
$(".header-title h1").text($(".header-title h1").text().toUpperCase().replaceAll("-", " "));


// Rating colors
function ratingColor() {
  $(".main-info p:last-child").each(function() {
    if(parseFloat($(this).text()) >= 80) {
      $(this).css("color", "#89FF81");
    }
    else if(parseFloat($(this).text()) < 80 && parseFloat($(this).text()) >= 50) {
      $(this).css("color", "#FFEE81");
    }
    else if(parseFloat($(this).text()) < 50) {
      $(this).css("color", "#FF8181");
    }
  });
}

ratingColor();


// Show extra game's info
$(".game").each(function() {
  $(this).on("mouseover", () => {
    $(this).children(".info").children(".hidden-info").css("display", "block");
    $(this).css("zIndex", "2");
    $(this).css("transform", "scale(1.1)");
  });

  $(this).on("mouseleave", () => {
    $(this).children(".info").children(".hidden-info").css("display", "none");
    $(this).css("zIndex", "0");
    $(this).css("transform", "scale(1)");
  });
});


// Remove last platform and genre commas
function eraseLastCommas() {
  $(".game-platforms div a:last-child").each(function() {
    $(this).text($(this).text().replace(",", ""));
  });
  $(".game-genres div a:last-child").each(function() {
    $(this).text($(this).text().replace(",", ""));
  });
}

eraseLastCommas();


// Show full name of games if mouse over
$(".main-info p:first-child").each(function() {
  $(this).mouseover(() => {
    $(this).css("overflow", "visible").css("zIndex", "3");
    $(this).parent().children("p:last-child").css("display", "none");
  });

  $(this).mouseleave(() => {
    $(this).css("overflow", "hidden").css("zIndex", "inherit");
    $(this).parent().children("p:last-child").css("display", "block");
  });
});


// Change games order/server request
function gamesOrder(url) {
  axios.get(`/${url}`)
  .then(res => {
    let htmlData = res.data.split('game-container">')[1].split('<i class="far fa-arrow')[0].slice(0, -30);
    // console.log(htmlData);
    $(".game-container").html(htmlData);

    $("*").off();
    if(window.location.href.includes("platforms") || window.location.href.includes("genres")) {
      $.getScript("../js/index.js");
      $.getScript("../js/autocomplete.js");
    }
    else {
      $.getScript("js/index.js");
      $.getScript("js/autocomplete.js");
    }
  })
  .catch(err => {
    console.error(err);
  });
}

// Show and hide order menu
$(".order").click(() => {
  $(".order-options").fadeIn(400);
});

$(window).click((e) => {
  if(e.target !== $(".order-options").get(0) && e.target !== $(".order").get(0) && e.target !== $(".order").children("p").get(0) && e.target !== $(".order").children("strong").get(0) && e.target !== $(".order").children("i").get(0)) {
    $(".order-options").fadeOut(400);
  }
});

// Select order menu element
$(".order-options p").each(function() {
  $(this).click(() => {
    $(".order strong").text($(this).text());

    let url;

    let correctFunc = "showItems" + ((window.location.href.split("3000/")[1]).charAt(0).toUpperCase() + (window.location.href.split("3000/")[1]).slice(1)).replace("-", "");

    for(let i = 0; i < funcArr.length; i++) {
      if(funcArr[i].toString().split("(")[0].split("function ")[1] === correctFunc.toString()) {
        return funcArr[i]($(this));
      }
      else {
        if(window.location.href.includes("platforms")) {
          return funcArr[6]($(this));
        }
        else if(window.location.href.includes("genres")) {
          return funcArr[7]($(this));
        }
      }
    }
  });
});


// Sticky sidebar
// Show/hide sidebar menus
function displaySidebarMenus(menu, btn) {
  if(!menu.hasClass("show-menu")) {
    menu.addClass("show-menu");
    btn.html('<i class="fas fa-chevron-up"></i>Hide');
  }
  else if(menu.hasClass("show-menu")) {
    menu.removeClass("show-menu");
    btn.html('<i class="fas fa-chevron-down"></i>Show');
  }
}

$(".top-platforms button").click(() => displaySidebarMenus($(".top-platforms > div"), $(".top-platforms button")));

$(".genres button").click(() => displaySidebarMenus($(".genres > div"), $(".genres button")));


// Scroll up button
$(window).scroll(function() {
  if(window.innerWidth > 802) {
    if ($(window).scrollTop() > 350) {
      $(".button-up").show();
    } else {
      $(".button-up").hide();
    }
  }
});

$(".button-up").click(function() {
  $("html, body").animate({scrollTop: 0}, "400");
});

// Button right position
// let rightPosition = (($("body").width() - $(".main-container").width()) / 2) - (20 + 32); this var is in the HTML to avoid repetition when js file is reloaded

rightPosition = (($("body").width() - $(".main-container").width()) / 2) - (20 + 32);
$(".button-up").css("right", rightPosition + "px");

$(window).resize(() => {
  rightPosition = (($("body").width() - $(".main-container").width()) / 2) - (20 + 32);
  $(".button-up").css("right", rightPosition + "px");
});


// Load more button animation
function bounceBalls(element, times, distance, speed) {
    for(let i = 0; i < times; i++) {
        element.animate({top: "-" + distance},speed);
        element.animate({top: distance},speed);
    }
}


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
// let prevScrollPosition = window.scrollY; this var is in the HTML to avoid repetition when js file is reloaded

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


// No results found
if(!$(".game-container").html().includes("game")) {
  $(".game-container").append("<p>No results found</p>");
  $(".game-container button").hide();
}
