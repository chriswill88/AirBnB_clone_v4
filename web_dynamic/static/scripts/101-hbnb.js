function fillPlaces (data) {
    $('SECTION.places').empty()
    for (x of data) {
      $('SECTION.places').append('<article></article>')
      let art = $('SECTION article').last()

      art.append('<div class="title"></div>')
      art.append('<div class="information"></div>')
      art.append('<div class="user"></div>')
      art.append('<div class="description"></div>')

      let title = art.find('div.title')
      let info = art.find('div.information')
      let user = art.find('div.user')
      let desc = art.find('div.description')

      title.append('<h2>'+ x.name +'</h2><div class="price_by_night">'+ x.price_by_night.toString() + '</div>')
      info.append('<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + x.max_guest.toString() + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + x.number_rooms.toString() + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + x.number_bathrooms.toString() + ' Bathroom</div>')
      user.append('<div class="user"></div>')
      desc.append('<div class="description">' + x.description.toString() +'</div>')
    }

}

function getPlaces (amen_ids, state_ids, city_ids) {
  let amens = amen_ids || []
  let cities = city_ids || []
  let states = state_ids || []
  let data = {}
  if (amens.length > 0) {
    data["amenities"] = []
  }
  if (cities.length > 0) {
    data["cities"] = []
  }
  if (states.length > 0) {
    data["states"] = []
  }
 
 
  for (x of amens) {
    data["amenities"].push(x)
  }
  for (x of cities) {
    data["cities"].push(x)
  }
  for (x of states) {
    data["states"].push(x)
  }

  $.post('../api/v1/places_search/', data, function (data) {
    function my_comp (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    data.sort(my_comp)
    fillPlaces(data);
    },
  'json');
}

function buttonClicked () {
  let amens = []
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
  let amend_name = [];

  amens = $('.amenities INPUT:checked').get();
  amens_name = amens.map((y) => y.dataset.name);
  $('.amenities h4').text("");
  $('.amenities h4').text(amens_name.join(", "));
};

function checkedListLoc () {
  let locs = [];
  let locs_name = [];

  locs = $('.locations INPUT:checked').get();
  locs_name = locs.map((y) => y.dataset.name);
  $('.locations h4').text("");
  $('.locations h4').text(locs_name.join(", "));
};

window.addEventListener('DOMContentLoaded', function () {
  getPlaces([]);
  $.get('../api/v1/status/', function (x) {
    if (x.status === 'OK'){
      $('#api_status').addClass('available');
      $('#api_status').removeClass('unavailable');
    }
  });

  $('.filters BUTTON').click(buttonClicked);


  $('.amenities INPUT[type="checkbox"]').on('click', checkedListAm);
  $('.locations INPUT[type="checkbox"]').on('click', checkedListLoc);

});
