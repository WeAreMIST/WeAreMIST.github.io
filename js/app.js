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
					text: [
					'Result',
					'Membership Drive',
					'Current Events',
					'//Use cat to view contents'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tCat(cmd) {
			var arr = ['Pramath Ramesh', 'Ananya Kaushik', 'Akash Darshan', 'Raghav', 'Lakshay', 'Giridhar.B', 'Advait Nambiar', 'Rakshit Arora', 'Madhav Shroff', 'Ishaan Pilar', 'Someshwar', 'Vasu Agarwal', 'Nipun R', 'Keshav Kejriwal', 'Arnab Mukherjee', 'Samarth Kathal ', 'Vidur', 'Mohammed Faizaan', 'Narayan Hari', 'Nitish Gupta', 'Revathi V', 'Niloy Sarkar', 'Teja Joluru', 'Abhishek Singh', 'Sarthak Mohapatra', 'Rahul Vishal Mishra', 'Ayush Sinha', 'Lovish Badlani', 'Bilal Ashraf', 'Yagya Malik', 'Neel Vashisht', 'Pratyush Mishra', 'Uday', 'Archit Sengupta', 'Vashist Thakwani', 'Rishi Agarwal', 'Rachit Yangwal', 'Aryan', 'Ansh Raj', 'Anay Tripathi', 'Archit Dasgupta', 'Shashank Goyal', 'Varun Anusheel', 'Prathamesh Kamath', 'Jayesh Gaur', 'Vishnu Vinayak', 'Nilab Sonal', 'Numan Zaheer', 'Mukund Rawat', 'Anubhav Ch', 'Aditya Mital', 'Sai Rahul A', 'Rishabh Jaiswal', 'Ankit Kumar', 'Kunal Khanwalkar', 'Sarthak Gupta', 'Anish Janaradhan', 'Chandranshi Saraf', 'Kanchan', 'Anushree'];

			setTimeout(function() {
					var ce='Workshop on Website Penetration (2nd Yrs only)\n 27th August at 5:45 PM\n NLH 204';
					var def="Usage: cat [FILE]";
					var mem="Come Join Manipal Information Security Team aka MIST\n  The only security club of its kind in Manipal\n  Fee: 100/- only\n  Join the whatsapp group at http://bit.do/mist_members"
					switch(cmd.command) {
						case 'cat Current Events': str=ce; break;
						case 'cat Membership Drive': break;
						case 'cat Result': setTimeout(function() {
											$scope.$broadcast('terminal-output', {
												output: true,
												text: arr,
												breakLine: true
											});
											$scope.$apply();
										}, 0.1); break;
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
	// terminalConfigurationProvider.typeSoundUrl ='https://raw.githubusercontent.com/vtortola/ng-terminal-emulator/master/example/content/type.wav';
	terminalConfigurationProvider.startSoundUrl ='https://raw.githubusercontent.com/vtortola/ng-terminal-emulator/master/example/content/start.wav';
}]);
