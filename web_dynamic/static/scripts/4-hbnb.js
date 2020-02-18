function fillPlaces (data) {
  $('SECTION.places').empty();
  for (const x of data) {
    $('SECTION.places').append('<article></article>');
    const art = $('SECTION article').last();

    art.append('<div class="title"></div>');
    art.append('<div class="information"></div>');
    art.append('<div class="user"></div>');
    art.append('<div class="description"></div>');

    const title = art.find('div.title');
    const info = art.find('div.information');
    const user = art.find('div.user');
    const desc = art.find('div.description');

    title.append('<h2>' + x.name + '</h2><div class="price_by_night">' + x.price_by_night.toString() + '</div>');
    info.append('<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + x.max_guest.toString() + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + x.number_rooms.toString() + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + x.number_bathrooms.toString() + ' Bathroom</div>');
    user.append('<div class="user"></div>');
    desc.append('<div class="description">' + x.description.toString() + '</div>');
  }
}

function getPlaces (amenIds) {
  const amens = amenIds || [];
  const data = {};
  if (amens.length > 0) {
    data.amenities = [];
  }
  for (const x of amens) {
    data.amenities.push(x);
  }

  $.post('../api/v1/places_search/', data, function (data) {
    function myComp (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    data.sort(myComp);
    fillPlaces(data);
  },
  'json');
}

function buttonClicked () {
  let amens = [];
  amens = $('.amenities INPUT:checked').get();
  amens = amens.map((x) => x.dataset.id);
  getPlaces(amens);
}

window.addEventListener('DOMContentLoaded', function () {
  getPlaces([]);
  $.get('../api/v1/status/', function (x) {
    if (x.status === 'OK') {
      $('#api_status').addClass('available');
      $('#api_status').removeClass('unavailable');
    }
  });

  $('.filters BUTTON').click(buttonClicked);
});
