app.factory('Api', function($http, $rootScope, $httpParamSerializerJQLike, $httpParamSerializer, $q, $window) {

  function apiRequest(url, opts){

    var self = this;
    if(opts === undefined && typeof url === 'object' && url !== null){
      var opts = url;
      var url = opts.url;
    }

    var defaultOptions = {
      method: 'GET',
      headers: {},
      returnWholeObject: true,
      data: null,
      dataFormat: 'json',
      useJQLikeSerialisation: false,
      origin: ""
    };

    var options = angular.merge(defaultOptions, opts);
    var httpObj = {
      url: url,
      method: options.method,
      headers: options.headers
    };

    if(options.data){
      // not from options because angular.merge will mess up FormData
      httpObj.data = opts.data;
    }

    if(options.dataFormat === "form") {
      httpObj.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      if(options.useJQLikeSerialisation) {
        httpObj.data = $httpParamSerializerJQLike(httpObj.data);
      } else {
        httpObj.data = $httpParamSerializer(httpObj.data);
        // remove the escaped newline
        // HACK, should be changed
        httpObj.data = httpObj.data.replace(new RegExp("%5C%5Cn",'g'), "%5Cn");
      }
    } else if(options.dataFormat === "multipart") {
      httpObj.headers['Content-Type'] = undefined;
      httpObj.transformRequest = angular.identity;
    } else if(options.dataFormat === "urlParams") {
      httpObj.data = null;
      httpObj.params = options.data;
    } else if(options.dataFormat !== "json") {
    }

    var deferred = $q.defer();
    deferred.resolve(res);
    deferred.reject(err);
    return deferred.promise;
  }

  return {
    request: apiRequest,
  };

});
