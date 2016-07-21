app.directive('validPasswordC', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      console.log("entro!!!");
      ctrl.$parsers.unshift(function(viewValue, $scope) {
        var noMatch = viewValue != scope.myForm.password.$viewValue;
        console.log("noMatch: " + noMatch);
        ctrl.$setValidity('noMatch', !noMatch);
      })
    }
  }
});
