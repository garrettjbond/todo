$(".deleteMe").on("click", function () {
  console.log($(this).parent().html());

  $(this).parent().remove();
});

$("span").on("click", function () {
  console.log($(this).siblings().text());

  if ($(this).html() == '<i class="fa-regular fa-square-check"></i>') {
    $(this).html('<i class="fa-regular fa-square"></i>');
  }
  else {
    $(this).html('<i class="fa-regular fa-square-check"></i>');
  }
  $(this).toggleClass("mark");
  $(this).siblings().toggleClass("mark");
});

$("button").on("click", function () {
  console.log($(this).prev().children().last().html());

  $(".clonecopy:first-of-type").clone(true).appendTo("ul");
  $("ul").children().last().removeClass("hidden");
});