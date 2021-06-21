// jshint esversion:9

$(".platform").each(function() {
  $(this).click(() => {
    $(this).children("form").submit();
  });
});
