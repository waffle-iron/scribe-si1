(function () {
  angular.module('ScribeApp').controller('userController', function($scope, $window, $cookies, httpToolsService) {

    $scope.authenticateUser = function (token) {
      request_body = {
        'authenticity_token': token,
        'user': {
          'email': $scope._email,
          'password': $scope._password
        }
      };

      httpToolsService.request('POST', 'login', request_body)
      .then(function success(res) {
        console.log("Request made successfully!");
        console.log("For debugging reasons, this is your response:");
        console.log(res);

        if (res.data.success) {
          $cookies.put("current_user_id", res.data.current_user_id)
          httpToolsService.redirect('/my-drive');
        } else {
          var notification = document.querySelector('.mdl-js-snackbar');
          notification.MaterialSnackbar.showSnackbar(
            {
              message: res.data.msg
            }
          );
        }
      }, function error(res) {
        console.log("An error ocurred while sending your POST request to /login");
        console.log("For debugging reasons, this is your response:");
        console.log(res);
      });
    };

    $scope.createUser = function (token) {
      request_body = {
        'authenticity_token': token,
        'user': {
          'first_name': $scope._firstname,
          'last_name': $scope._lastname,
          'email': $scope._email,
          'username': $scope._username,
          'password': $scope._password
        }
      }

      httpToolsService.request('POST', 'users', request_body);
      httpToolsService.redirect('/login');
    };

    $scope.login = function(token){
      console.log("login");
      $scope.authenticateUser(token);
    };

    $scope.register = function(token){
      $scope.createUser(token);
    };

    $scope.showRegisterForm = function(){
      httpToolsService.redirect('/register');
    };
  });
})();
