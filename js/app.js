var app = angular.module('mist', ['ngRoute', 'vtortola.ng-terminal', 'luegg.directives']);

app.config(function($routeProvider) {
  $routeProvider

  //route for Home Page
  .when('/geek', {
    templateUrl: './views/geek.html',
    controller: 'geekController'
  })

  .when('/nongeek', {
    templateUrl: './views/nongeek.html',
    controller: 'nonGeekController'
  });

});

app.controller('geekController', ['$scope', '$location', function($scope, $location) {

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

app.controller('nonGeekController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
   $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   };
}]);

app.config(['terminalConfigurationProvider', function (terminalConfigurationProvider) {
      terminalConfigurationProvider.outputDelay = 20;
      terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);
