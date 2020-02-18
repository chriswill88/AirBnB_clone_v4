window.onload = function () {
  $('.amenities .checkbox').css('margin-left', '10px');
  $('.amenities').css('width', 'auto');
  $('.amenities').css('whi');

  const checkedList = function () {
    let amensId = [];
    let amensName = [];

    amensId = $('.amenities INPUT:checked').get();
    amensName = amensId;
    amensId = amensId.map((x) => x.dataset.id);
    amensName = amensName.map((y) => y.dataset.name);
    $('.amenities h4').text('');
    $('.amenities h4').text(amensName.join(', '));
  };
  checkedList();

  $('.amenities INPUT[type="checkbox"]').on('click', checkedList);
};
