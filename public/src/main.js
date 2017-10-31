$(function(){
  $('#addCar').click(function(){
    $('.addCar').toggleClass('nodisplay');
  })
  $('#getLocation').click(function(){
    geoFindMe();
  });
})

function geoFindMe(){
  let output = document.getElementById('output');
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
    output.appendChild(img);
    $.ajax({
      url:'/user/getLocation',
      data:{
        lat: latitude,
        long: longitude
      },
      success: function(res){
        console.log(res);
        output.innerHTML += `<div>Street1: ${res.street1}<br>Street2: ${res.street2}</div>`
      }
    })
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
