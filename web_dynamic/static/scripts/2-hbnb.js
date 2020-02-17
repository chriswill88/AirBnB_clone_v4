window.addEventListener('DOMContentLoaded', function () {
  $.get('../api/v1/status/', function (x) {
    if (JSON.parse(x).status === 'OK'){
      $('#api_status').addClass('available');
      $('#api_status').removeClass('unavailable');
    }
  });
});
