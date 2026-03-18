function deleteItem(){
  $(this).parent().remove();
}

function toggleCheckbox(){
  if ($(this).html() == '<i class="fa-regular fa-square-check"></i>') {
    $(this).html('<i class="fa-regular fa-square"></i>');
  }
  else {
    $(this).html('<i class="fa-regular fa-square-check"></i>');
  }
  $(this).toggleClass("mark");
  $(this).siblings().toggleClass("mark");
}

function createNew(){
  $(".clonecopy:first-of-type").clone(true).appendTo("ul");
  $("ul").children().last().removeClass("hidden");
}

$(".deleteMe").on("click", deleteItem);
$(".toggleMe").on("click", toggleCheckbox);
$(".addItem").on("click", createNew);