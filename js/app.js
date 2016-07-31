var app = angular.module('mist', ['ngRoute', 'vtortola.ng-terminal', 'luegg.directives']);

app.config(function($routeProvider) {
	$routeProvider

	//route for Home Page
		.when('/', {
		templateUrl: './views/home.html',
		controller: 'homeController'
	})

	.when('/geek', {
		templateUrl: './views/geek.html',
		controller: 'geekController'
	})

	.when('/nongeek', {
		templateUrl: './views/nongeek.html',
		controller: 'nonGeekController'
	})

	.otherwise({
		redirectTo: '/'
	});

});

app.controller('geekController', ['$scope', '$location', function($scope, $location) {

	setTimeout(function() {
		$scope.$broadcast('terminal-output', {
			output: true,
			text: ['We are MIST',
				'Defend your roots.'
			],
			breakLine: true
		});
		$scope.$apply();
	}, 0.1);

	$scope.$on('terminal-input', function(e, consoleInput) {
		var cmd = consoleInput[0];

		// $location.path('/newNgRouteYouWishToDisplay');
	});

}]);

app.controller('nonGeekController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
	$scope.scrollTo = function(id) {
		$anchorScroll(id);
	};
}]);

app.controller('homeController', ['$scope', function($scope) {
	// $scope.load = function() {
  //
	// 	$(".right").hover(
	// 		function() {
	// 			$(".slider").css("width", "0vw");
	// 		},
	// 		function() {
	// 			$(".slider").css("width", "55vw");
	// 		});
  //
  //     $(".left").hover(
  // 			function() {
  // 				$(".slider").css("width", "130vw");
  // 			},
  // 			function() {
  // 				$(".slider").css("width", "55vw");
  // 			});
  //
	// };
  //
	// $scope.load();
}]);

app.config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
	terminalConfigurationProvider.outputDelay = 20;
	terminalConfigurationProvider.allowTypingWriteDisplaying = false;
}]);
