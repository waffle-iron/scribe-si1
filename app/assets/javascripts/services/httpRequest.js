(function () {
  angular.module('ScribeApp').service('httpRequest', function ($http) {
    return {
      retrieve: function (action, route) {
        return $http({
          method: action,
          url: route,
        });
      }
    };
  });
})();
