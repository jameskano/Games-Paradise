// jshint esversion:9


let funcArr = [
// Games shown in "/"
function showItems(orderOption) {
  if(orderOption.text().includes("Relevance")) {
    url = "";
  }
  else {
    url = orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in "/games"
function showItemsGames(orderOption) {
  if(orderOption.text().includes("Relevance")) {
    url = "games";
  }
  else {
    url = "games/" + orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in "/recently-released"
function showItemsRecentlyreleased(orderOption) {
  if(orderOption.text().includes("Release date")) {
    url = "recently-released";
  }
  else {
    url = "recently-released/" + orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in "/coming-soon"
function showItemsComingsoon(orderOption) {
  if(orderOption.text().includes("Release date")) {
    url = "coming-soon";
  }
  else {
    url = "coming-soon/" + orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in "/top"
function showItemsTop(orderOption) {
  if(orderOption.text().includes("Relevance")) {
    url = "top";
  }
  else {
    url = "top/" + orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in "/best"
function showItemsBest(orderOption) {
  if(orderOption.text().includes("Relevance")) {
    url = "best";
  }
  else {
    url = "best/" + orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in each platform games
function showItemsPlatformGames(orderOption) {
  if(orderOption.text().includes("Relevance")) {
    url = window.location.href.split("3000/")[1];
  }
  else {
    url = window.location.href.split("3000/")[1] + "/" + orderOption.text().replace(" ", "-");
  }

  gamesOrder(url);
},

// Games shown in each genre games
function showItemsGenreGames(orderOption) {
  if(orderOption.text().includes("Relevance")) {
    url = window.location.href.split("3000/")[1];
  }
  else {
    url = window.location.href.split("3000/")[1] + "/" + orderOption.text().replace(" ", "-");
  }
  
  gamesOrder(url);
}
];
