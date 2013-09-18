angular.module("dashboard").service('districtService', function($http, $filter) {
    var self = this;
    
    this.all = function(result) {
        if (self.districts) {
            result(self.districts);
            return;
        }
        $http({
            method: 'GET',
            url: '/districts.json'
        }).
        success(function(data, status, headers, config) {
            self.districts = data.districts;
            result(data.districts);
        });
    };

    this.find_by_name = function(name, result) {
        self.all(function(districts) {
            var district = $filter('filter')(districts, function(district) {
                return district.name.toLowerCase() == name.toLowerCase();
            })[0];
            result(district);
        });
    };

    this.geojson = function(result) {
        $http({
            method: 'GET',
            url: '/static/javascript/geojson/uganda_districts_2011_005.json'
        }).
        success(function(data, status, headers, config) {
            result(data);
        });
    };

    this.subcounties_geojson = function(district_name, result) {
        processJSON = function(data) {          
            result(data);
        }
        var url = "http://ec2-54-218-182-219.us-west-2.compute.amazonaws.com/geoserver/geonode/ows?"
        +"service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:uganda_subcounties_2011_0005"
        +"&outputFormat=json&format_options=callback:processJSON&filter=<Filter xmlns=\"http://www.opengis.net/ogc\">"
        +"<PropertyIsEqualTo><PropertyName>DNAME_2010</PropertyName><Literal>" + district_name.toUpperCase() 
        +"</Literal></PropertyIsEqualTo></Filter>";

        $http.jsonp(url);
    };

    this.parishes_geojson = function(subcounty_name, result) {
        processJSON3 = function(data) {          
            result(data);
        }
        var url = "http://ec2-54-218-182-219.us-west-2.compute.amazonaws.com/geoserver/geonode/ows?"
        +"service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:uganda_parish_2011_50"
        +"&outputFormat=json&format_options=callback:processJSON3&filter=<Filter xmlns=\"http://www.opengis.net/ogc\">"
        +"<PropertyIsEqualTo><PropertyName>SNAME_2010</PropertyName><Literal>" + subcounty_name.toUpperCase() 
        +"</Literal></PropertyIsEqualTo></Filter>";

        $http.jsonp(url);
    };


    this.water_points = function(district_name, subcounty_name, result){

        processJSON2 = function(data) {          
            result(data);
        }
         var url = "http://map.u-map.it/geoserver/geonode/ows?"
        +"service=WFS&version=1.0.0&request=GetFeature&typeName=geonode:waterpoints_wgs84"
        +"&outputFormat=json&propertyName=the_geom,District,SubcountyN,ParishName,SourceType,"
        +"Management,Functional&format_options=callback:processJSON2&filter=<Filter xmlns=\"http://www.opengis.net/ogc\">"
        +"<PropertyIsEqualTo><PropertyName>District</PropertyName><Literal>" + district_name.toUpperCase() + "</Literal></PropertyIsEqualTo>"
        // +"<PropertyIsEqualTo><PropertyName>SubcountyN</PropertyName><Literal>" + subcounty_name.toUpperCase() + "</Literal></PropertyIsEqualTo>"
        +"</Filter>";

        $http.jsonp(url);
        return null;
    };
});