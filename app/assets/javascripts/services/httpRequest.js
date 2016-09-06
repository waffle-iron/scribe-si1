(function () {
  angular.module('ScribeApp').service('httpRequest', function ($http, $window) {
    return {
      request: function (request_method, request_route, request_data) {
        return $http({
          method: request_method,
          url: request_route,
          data: request_data,
          headers: {'Content-Type': 'application/json'},
        }).then(function success(res) {
          console.log("Request made successfully!");
          console.log("For debugging reasons, this is your response:");
          console.log(res);

          if (res.data.success) {
            $window.location.href = '/my-drive';
          }
        }, function error(res) {
          console.log("An error ocurred while sending your " + request_method + " request to " + request_route);
          console.log("For debugging reasons, this is your response:");
          console.log(res);
        });
      }
    };
  });
})();
