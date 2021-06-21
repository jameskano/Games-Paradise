// jshint esversion:9

// Search games function
function searchGames() {
  axios.get("/searchInput/" + $(".search input").val())
  .then(res => {
    let searchData = res.data.split('<body>')[1].split('</body>')[0];
    console.log(searchData);
    $(".search-results").html(searchData).slideDown();
  })
  .catch(err => {
    console.error(err);
  });
}

// Show results only if there is something written in the input (not white space)
$(".search input").keyup(() => {
  if($(".search input").val().replaceAll(" ", "") !== "") {
    searchGames();
  }
  else {
    $(".search-results").slideUp();
  }
});

// Slide up results when clear button is clicked
document.querySelector(".search input").addEventListener("search", () => $(".search-results").slideUp());


// Show and hide results
$("body").click((e) => {
  if(e.target != $(".search").get(0) && e.target != $(".search").children("input").get(0) && e.target != $(".search").children("i").get(0)) {
    $(".search-results").slideUp();
  }
  else {
    $(".search-results").slideDown();
  }
});


// Submit form if search icon clicked
$(".search i").click(() => $(".search").parent().submit());
