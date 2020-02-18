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

function getPlaces (amenIds, stateIds, cityIds) {
  const amens = amenIds || [];
  const cities = cityIds || [];
  const states = stateIds || [];
  const data = {};
  if (amens.length > 0) {
    data.amenities = [];
  }
  if (cities.length > 0) {
    data.cities = [];
  }
  if (states.length > 0) {
    data.states = [];
  }

  for (const x of amens) {
    data.amenities.push(x);
  }
  for (const x of cities) {
    data.cities.push(x);
  }
  for (const x of states) {
    data.states.push(x);
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
  let states = [];
  let cities = [];

  amens = $('.amenities INPUT:checked').get();
  amens = amens.map((x) => x.dataset.id);

  states = $('.locations .popover h2 INPUT:checked').get();
  states = states.map((x) => x.dataset.id);

  cities = $('.locations .popover li INPUT:checked').get();
  cities = cities.map((x) => x.dataset.id);

  getPlaces(amens, states, cities);
}

function checkedListAm () {
  let amens = [];
  let amensName = [];

  amens = $('.amenities INPUT:checked').get();
  amensName = amens.map((y) => y.dataset.name);
  $('.amenities h4').text('');
  $('.amenities h4').text(amensName.join(', '));
}

function checkedListLoc () {
  let locs = [];
  let locsName = [];

  locs = $('.locations INPUT:checked').get();
  locsName = locs.map((y) => y.dataset.name);
  $('.locations h4').text('');
  $('.locations h4').text(locsName.join(', '));
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

  $('.amenities INPUT[type="checkbox"]').on('click', checkedListAm);
  $('.locations INPUT[type="checkbox"]').on('click', checkedListLoc);
});
