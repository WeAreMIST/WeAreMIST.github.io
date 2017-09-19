var app = angular.module('mist', ['ngRoute', 'vtortola.ng-terminal']);

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


		/* ~Functions~ */
		function tHelp() {
			setTimeout(function() {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['Available Commands:',
						'help\t: Get help',
						'man\t: What we do',
						'ls\t: Current events',
						'cat\t: File content',
						'clr\t: Clear screen',
						'exit\t: Exit'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tMan() {
			setTimeout(function() {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['We are committed to spreading awareness about the increasing need for Information and Network Security.',
					'We plan to train other like-minded students to enhance their skills and aptitude in this branch of computer science.'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tLs() {
			setTimeout(function() {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['Membership Drive',
					'Current Events',
					'MUPy',
					'//Use cat to view contents'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tCat(cmd) {
			debugger;
			setTimeout(function() {
					var ce='Workshop on Website Penetration (2nd Yrs only)\n 27th August at 5:45 PM\n NLH 204';
					var py="PyPals is organizing MUPy, a conference to foster interest and awareness about Python.\n  Along with several alumni of the college, PyPals shall also be inviting renowned speakers from different parts of the country to motivate and inspire coders and beginners alike.\n  Check them out at www.pypals.org";
					var def="Usage: cat [FILE]";
					var mem="Come Join Manipal Information Security Team aka MIST\n  The only security club of its kind in Manipal\n  Fee: 100/- only\n  Join the whatsapp group at http://bit.do/mist_members"
					switch(cmd.command) {
						case 'cat Current Events': str=ce; break;
						case 'cat MUPy': str=py; break;
						case 'cat Membership Drive': ;
						case 'cat Membership': str=mem; break;
						default: str=def;
					}
				$scope.$broadcast('terminal-output', {
					output: true,
					text: [str],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}
		
		function tExit() {
			$location.url("http://localhost/WeAreMIST.github.io/");
		}

		function tClr() {
			setTimeout(function() {
				$scope.results.splice(0, $scope.results.length);
				$scope.$apply();
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['We are MIST',
						'Defend your roots.'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tDefault() {
			setTimeout(function() {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['Invalid Command!',
						'type help to get help (duh)'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		/* Take user input */
		$scope.$on('terminal-input', function(e, consoleInput) {
			var cmd = consoleInput[0];
			switch(cmd.command.split(" ")[0]) {
				case 'help': tHelp(); break;
				case 'man': tMan(); break;
				case 'ls' : tLs(); break;
				case 'cat' : tCat(cmd); break;
				case 'clr': tClr(); break;
				case 'exit': tExit(); break;
				default: tDefault();
			}


		// $location.path('/newNgRouteYouWishToDisplay');
	});

}]);

app.controller('nonGeekController', ['$scope', '$location', function($scope, $location) {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "./js/nongeek.js";
	document.head.appendChild(s);
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
