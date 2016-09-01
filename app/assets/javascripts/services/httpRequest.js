(function () {
  angular.module('ScribeApp').service('httpRequest', function ($http) {
    return {
      request: function (req_method, route) {
        return $http({
          method: req_method,
          url: route,
        }).then(function success(res) {
          console.log("Request made successfully!");
          console.log("For debugging reasons, this is your response:");
          console.log(res);
        }).then(function error(res) {
          console.log("An error ocurred while sending your " + req_method + " request to " + route);
          console.log("For debugging reasons, this is your response:");
          console.log(res);
        });
      }
    };
  });
})();
