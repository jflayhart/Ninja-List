var classType = 'Residential';

$.ajax({
    type: 'GET',
    url: 'https://api.solidearth.com/v1/search/baarmls?MlsStatusin=Active&sortOption=ListPrice&class='+classType+'&page=0&format=json&api_key=6gphe6d6pck3km5anrjrcqcf',
    timeout: 20000, //20 seconds, for testing purposes
    dataType: 'jsonp',
    success: function(data) {
        var listing = data['listing'];
        console.log('Length: ' + listing.length);
        for(i=0;i<listing.length;i++) {
        	// array objects
        	var Location = listing[i]['Location']['address'];
        	var AgentOffice = listing[i]['AgentOffice']['ListAgent'];
        	var media = listing[i]['Media'][0]['file'];
        	
        	// array values for the objects
        	var streetNumber = Location['StreetNumber'];
        	var streetName = Location['StreetName'];
        	var city = Location['City'];
        	var state = Location['StateOrProvince'];
        	var postal = Location['PostalCode'];
        	var fullAddress = streetNumber+' '+streetName+'\n'+city+', '+state+'\n'+postal;
        	//console.log(listing[i]);
        	//console.log(Location);
        	//console.log(fullAddress);
        	//console.log("http:"+media);
        	$('#listing').append('<li>' + '<img align="left" src="http:'+media+'" />'+fullAddress+'</li>');
        }
    },
    error: function (xhr, status, error) {
        if(status == "timeout") {
            alert("Connection has timed out.");
        } else {
            alert(xhr.status + " " + status + " " + error);
        }
    }
});