getListing(0);

function getListing(index) {
    $('#listing').empty();
    if(index == 0) {
    	var classType = 'Residential';
    } else {
        var classType = 'Land';
    }
    
    $.ajax({
        type: 'GET',
        url: 'https://api.solidearth.com/v1/search/baarmls?MlsStatusin=Active&sortOption=ListPrice&class='+classType+'&page=0&format=json&api_key=6gphe6d6pck3km5anrjrcqcf',
        timeout: 20000, //20 seconds, for testing purposes
        dataType: 'jsonp',
        success: function(data) {
            var listing = data['listing'];
            console.log('Length: ' + listing.length);
            for(i=0;i<listing.length;i++) {
                // array objects, replace with empty value if undefined
                var Location = listing[i]['Location']['address'];
                // array values for the objects
                var LocationKey = listing[i]['ListingKey'] || '';
                var media = listing[i]['Media'][0]['file'] || '';
                var streetNumber = Location['StreetNumber'] || '';
                var streetName = Location['StreetName'] || '';
                var city = Location['City'] || '';
                var state = Location['StateOrProvince'] || '';
                var postal = Location['PostalCode'] || '';
                var fullAddress = streetNumber+' '+streetName+'\n'+city+', '+state+'\n'+postal;
                //console.log(listing[i]);
                //console.log(Location);
                //console.log(fullAddress);
                //console.log("http:"+media);
                $('#listing').append('<li>' + '<img align="left" src="http:'+media+'" />'+fullAddress+
                '<br /><br /><a class="more-info '+LocationKey+'" href="#secondview">More Info</a></li>');
            }
            $('a.more-info').click(function() {
                var myClasses = this.classList;
                locationKey = myClasses[1];
                moreInfo(locationKey);
                return true;
            });
        },
        error: function (xhr, status, error) {
            if(status == "timeout") {
                alert("Connection has timed out.");
            } else {
                alert(xhr.status + " " + status + " " + error);
            }
        }
    });
}

function moreInfo(locationKey) {
    $('#local-view,#local-image,#agent-view').empty();
    $.ajax({
    type: 'GET',
    url: 'https://api.solidearth.com/v1/listing/baarmls/'+locationKey+'?format=json&api_key=6gphe6d6pck3km5anrjrcqcf',
    timeout: 20000, //20 seconds, for testing purposes
    dataType: 'jsonp',
    success: function(data) {
        // array objects, replace with empty value if undefined
        var Location = data['Location']['address'];
        var AgentOffice = data['AgentOffice'];
        // array values for the objects
        var streetNumber = Location['StreetNumber'] || '';
        var streetName = Location['StreetName'] || '';
        var city = Location['City'] || '';
        var state = Location['StateOrProvince'] || '';
        var postal = Location['PostalCode'] || '';
        var fullAddress = streetNumber+' '+streetName+'\n'+city+', '+state+'\n'+postal;
        var listingPrice = data['listingPricing']['listPrice'] || '';
        var listingImg = data['Media'][0]['file'] || '';
        var listingDesc = data['Media'][0]['desc'] || '';
        var structureBed = data['Structure']['BedroomsTotal'] || '';
        var structureBath = data['Structure']['BathroomsTotal'] || '';
        var agentImg = AgentOffice['ListAgent']['Image'] || '';
        var agentName = AgentOffice['ListAgent']['FullName'] || '';
        var officeName = AgentOffice['ListOffice']['Name'] || '';
        var officePhone = AgentOffice['ListOffice']['Phone'] || '';
        var officeEmail = AgentOffice['ListOffice']['Email'] || '';
    
        $('#local-image').html('<img src="http:'+listingImg+'" />');
        $('#local-view').append('<p>'+listingDesc+'</p>');
        $('#local-view').append('<h4>Address</h4> <p>'+fullAddress+'</p>');
        $('#local-view').append('<h4>Price</h4> <p>$'+listingPrice+'/mo</p>');
        $('#local-view').append('<h4>Bed/Bath</h4> <p>'+structureBed+'/'+structureBath+'</p>');
        $('#agent-view').append('<img align="left" src="http:'+agentImg+'" />');
        $('#agent-view').append('<p><strong>'+agentName+'</strong></p>');
        $('#agent-view').append('<p>'+officeName+'</p>');
        $('#agent-view').append('<p>'+officePhone+'</p>');
        $('#agent-view').append('<p>'+officeEmail+'</p>');
    },
    error: function (xhr, status, error) {
        if(status == "timeout") {
            alert("Connection has timed out.");
        } else {
            alert(xhr.status + " " + status + " " + error);
        }
    }
});
}