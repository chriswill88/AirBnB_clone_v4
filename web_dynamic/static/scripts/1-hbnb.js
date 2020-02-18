window.onload = function () {
  $('.amenities .checkbox').css('margin-left', '10px');
  $('.amenities').css('width', 'auto');
  $('.amenities').css('whi')

  let checkedList = function () {
    let amens_id = [];
    let amend_name = [];

    amens_id = $('.amenities INPUT:checked').get();
    amens_name = amens_id;
    amens_id = amens_id.map((x) => x.dataset.id);
    amens_name = amens_name.map((y) => y.dataset.name);
    $('.amenities h4').text("");
    $('.amenities h4').text(amens_name.join(", "));
  };
  checkedList();

  $('.amenities INPUT[type="checkbox"]').on('click', checkedList);
};
