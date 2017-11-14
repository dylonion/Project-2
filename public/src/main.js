$(function(){
  $('#addCar').click(function(){
    $('.addCar').toggleClass('nodisplay');
  })
  streetNames = {};

  $('.getLocation').click(function(){
    $(this).siblings('.output').html("<p>Locating…</p>");
    geoTest($(this).closest('.car-pane'));//geoFindMe();
  });

  $('.view-next').click(function(){
    let next =$('.selected').next();
    if(next.is(':last-of-type')){
      console.log('next not found');
      next = $('.car-pane').first();
    }
    $('.selected').removeClass('selected').addClass('nodisplay');
    next.addClass('selected').removeClass('nodisplay');
  })
})

function geoTest(el) {
  let output = el.find('.output');
  navigator.geolocation.getCurrentPosition(successone, errorone);
  function successone(position){
   $.ajax({
    type:     "GET",
    url:      '/user/getNearbyStreets',
    data: {
      lat: position.coords.latitude,
      long: position.coords.longitude
    },
    success: function(data){
      putMap(position.coords.latitude, position.coords.longitude,output);
      console.log(data);
      output.append(`<p>Location:<br>${data.streets[0]} between ${data.streets[1]} and ${data.streets[2]}</p>`);
      output.append(`<p>Parking rule: ${data.sign[0].sign_description}</p>`)
      }
    });
  }
  function errorone() {
    console.log("Unable to retrieve your location");
  }
}

function putMap(lat,long,output){
  output.html('<p>Latitude is ' + lat + '° <br>Longitude is ' + long + '°</p>');
  var img = new Image();
  img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=13&size=300x300&sensor=false";
  output.append(img);
}

function geoFindMe(el){
  let output = el.find('.output');
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
        streetNames.main_st = res.street1;
        streetNames.from_st = res.street2;
        streetNames.to_st = res.street3;
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

