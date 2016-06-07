var app = angular.module('mist', ['ngRoute', 'vtortola.ng-terminal', 'luegg.directives']);

app.config(function($routeProvider) {
  $routeProvider

  //route for Home Page
  .when('/', {
    templateUrl: './views/home.html',
    controller: 'homeController'
  });

});

app.controller('homeController', ['$scope', '$location', function($scope, $location) {

  setTimeout(function () {
      $scope.$broadcast('terminal-output', {
          output: true,
          text: ['We are MIST',
                 'Protect your roots.'],
          breakLine: true
      });
      $scope.$apply();
  }, 0.1);

  $scope.$on('terminal-input', function (e, consoleInput) {
          var cmd = consoleInput[0];

          // $location.path('/newNgRouteYouWishToDisplay');
  });

}]);

app.config(['terminalConfigurationProvider', function (terminalConfigurationProvider) {
      terminalConfigurationProvider.outputDelay = 20;
      terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);
