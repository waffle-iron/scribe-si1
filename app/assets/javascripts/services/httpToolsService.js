(function () {
  angular.module('ScribeApp').service('httpToolsService', function ($http, $window) {
    return {
      request: function(request_method, request_route, request_data) {
        return $http({
          method: request_method,
          url: request_route,
          data: request_data,
          headers: {'Content-Type': 'application/json'},
        })
      },

      redirect: function(path) {
        $window.location.href = path;
      }
    };
  });
})();
