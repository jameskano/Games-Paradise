// jshint esversion:9

//substring game summary
let maxLength = 500;
let completeText = $(".summary p").text();
let partialText = $(".summary p").text().substring(0, maxLength);

if($(".summary p").text().length > maxLength) {
  $(".summary p").html(partialText);
  $(".summary a").text("... See more");
}

$(".summary a").click(() => {
  if(!$(".summary a").hasClass("less")) {
    $(".summary p").text(completeText);
    $(".summary a").text("See less");
    $(".summary a").addClass("less");
  }

  else {
    $(".summary p").text(partialText);
    $(".summary a").text("... See more");
    $(".summary a").removeClass("less");
  }
});


// Uppercase games header and replace "-" with white space
$(".game-header h1").text($(".game-header h1").text().toUpperCase().replaceAll("-", " "));


// Remove last platform and genre commas
function deleteLastCommas() {
  $(".genres-and-platforms a:last-child").each(function() {
    $(this).text($(this).text().replace(",", ""));
  });
}

deleteLastCommas();


// Rating colors
function ratingsColor() {
  $(".rating-num div p").each(function() {
    if(parseFloat($(this).text()) >= 80) {
      $(this).parent().css("backgroundColor", "#3CAF34");
    }
    else if(parseFloat($(this).text()) < 80 && parseFloat($(this).text()) >= 50) {
      $(this).parent().css("backgroundColor", "#AFAB34");
    }
    else if(parseFloat($(this).text()) < 50) {
      $(this).parent().css("backgroundColor", "#AF3434");
    }
  });
}

ratingsColor();


// Expand screenshots
$(".media img").click((e) => {
  let customSrc = e.target.src.split("large/")[1];

  $(".background-img").attr("src", "https://images.igdb.com/igdb/image/upload/t_original/" + customSrc).show(400);
  $(".background").show(300);
});

$(".background").click(() => {
  $(".background-img").hide(300);
  $(".background").hide(400);
});


// Copyright margin top when body is smaller than window height
if($("body").height() < window.innerHeight) {
  $(".cr").css("position", "fixed").css("bottom", "10px").css("left", "50%");
}


// Media slider
$(".single-item").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true
});

$(".multiple-items").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 701,
      settings: {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 526,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


// Websites
$(".web img").each((idx, webImg) => {
  let webCategory = $(webImg).attr("src").split("websites/")[1].split(".png")[0];

  switch(webCategory) {
    case "1":
    $(webImg).next().text("Official Website");
    break;
    case "2":
    $(webImg).next().text("Wikia");
    break;
    case "3":
    $(webImg).next().text("Wikipedia");
    break;
    case "4":
    $(webImg).next().text("Facebook");
    break;
    case "5":
    $(webImg).next().text("Twitter");
    break;
    case "6":
    $(webImg).next().text("Twitch");
    break;
    case "8":
    $(webImg).next().text("Instagram");
    break;
    case "9":
    $(webImg).next().text("Youtube");
    break;
    case "10":
    $(webImg).next().text("App Store (iPhone)");
    break;
    case "11":
    $(webImg).next().text("App Store (iPad)");
    break;
    case "12":
    $(webImg).next().text("Google Play");
    break;
    case "13":
    $(webImg).next().text("Steam");
    break;
    case "14":
    $(webImg).next().text("Reddit");
    break;
    case "15":
    $(webImg).next().text("Itch");
    break;
    case "16":
    $(webImg).next().text("Epic Games");
    break;
    case "17":
    $(webImg).next().text("GOG");
    break;
    case "18":
    $(webImg).next().text("Discord");
    break;
  }
});


// Show full name of games if mouse over
$(".info p").each(function() {
  $(this).mouseover(() => {
    $(this).css("overflow", "visible").css("zIndex", "3").css("backgroundColor", "#333333");
  });

  $(this).mouseleave(() => {
    $(this).css("overflow", "hidden").css("zIndex", "inherit").css("backgroundColor", "none");
  });
});
