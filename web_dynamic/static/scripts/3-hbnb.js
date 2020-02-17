window.addEventListener('DOMContentLoaded', function () {
  $.post('../api/v1/places_search/', {}, function (data) {
    console.log(data[0]);
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
  },
  'json')
  $.get('../api/v1/status/', function (x) {
    if (x.status === 'OK'){
      $('#api_status').addClass('available');
      $('#api_status').removeClass('unavailable');
    }
  });
});


