function initMapAdresse(adress,ID) {
    ID = ID !== undefined ? ID : 'map';
    var map = new google.maps.Map(document.getElementById(ID), {
        zoom: 10,
        center: {lat:46.191644,lng:5.322666}
    });
    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map, adress,ID);
}

function geocodeAddress(geocoder, resultsMap, address,ID) {
    geocoder.geocode({'address': address}, function (results, status) {
        console.log(status);
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
            position = results[0].geometry.location;
            $('input[name=latitude]').val(position.lat);
            $('input[name=longitude]').val(position.lng);
            $('.noAddress').hide();
        } else {
            $('.noAddress').show();
            $('#'+ID).html('');
        }
    });
}

function initMapLatLng(data)
{
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat:46.191644,lng:5.322666}
    });
    map.setCenter(data);
    var marker = new google.maps.Marker({
        map: map,
        position: data,
    });
}

function initMap(data,ID) {
    ID = ID !== undefined ? ID : 'map';
    var map = new google.maps.Map(document.getElementById(ID), {
        zoom: 5,
        center: {lat:46.191644,lng:5.322666}
    });
    societes = JSON.parse(data.societes);

    $('[data-societes=remaining]').text(data.remaining);
    $('[data-societes=total]').text(data.total);
    $('[data-societes=diff]').text(data.diff);
    $('[data-societes=nb_societe]').text(data.nb_societes);
    $('.nbfilterSociete').show();
    $.each(societes, function (index, item) {
        geocode(map, item);
    });
}

function geocode(resultsMap, data) {
    var position = {lat: parseFloat(data.latitude), lng: parseFloat(data.longitude)};
    var url = $('input[name=url]').val();
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading"><a target="_blank"  href="/societes/'+data.hash_id+'/edit">' + data.nom + '</a>' +
        ' <label data-type="eye" class="eye" data-model="Societe" data-id="' +data.id+ '" ' +
                            'data-view="societes/block/_detail" '+
                            'data-name="nom" '+
                            'data-primary_col="id"> <i class="fa fa-eye"></i></label>' +
        '</h1>' +
        '<div id="bodyContent" style="text-align: left"><p>' +
        data.adresse1 + '<br />' +
        data.adresse2 + '<br />' +
        data.cp + ' <strong>' + data.ville + '</strong><br />' +
        data.pays +

        '</p>' +
        '<p>Type: '+data.type+'</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var iconBase = url+'/assets/icons/';
    var marker = new google.maps.Marker({
        map: resultsMap,
        position: position,
        title: data.nom,
        icon:iconBase+data.type+'.png'
    });
    //console.log(iconBase+data.type+'.png');
    marker.addListener('click', function () {
        infowindow.open(resultsMap, marker);
    });
}