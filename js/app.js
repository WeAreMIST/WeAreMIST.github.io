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
						'man\t: Open man page',
						'whoami: Who are we?',
						'ls\t: List Directory Contents',
						'cat\t: File content',
						'clr\t: Clear screen',
						'cd\t: Change Directory',
						'exit\t: Exit'
					],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tWhoAmI() {
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

		function tMan(cmd) {
			debugger;
			setTimeout(function() {

					var def="Usage: man [PATH]";
					function Cmd(name,desc) {
					    this.name = name;
					    this.desc = desc;
					}
					var myCmds = [
					    new Cmd("help","No manual entry for help"),
					    new Cmd("ls", "List current working directory contents"),
					    new Cmd("man","Man page for commands\n  "+def),
					    new Cmd("whoami","A description of our activities and what we represent"),
					    new Cmd("cat","Prints the contents of the file to the standard output"),
					    new Cmd("clr","No manual entry for clr"),
					    new Cmd("cd","Cmd for change working directory\n  Usage: cd [PATH]"),
					    new Cmd("exit","Navigate back to the home page"),
					];

					var arg=cmd.command;	
					arg=arg.substr(arg.indexOf(' ')+1);				
					var string="Invalid Command!\n  "+def;
					for(var i in myCmds)
						 if(myCmds[i].name===arg)
							{
								string=myCmds[i].desc;
								break;
							}						

				$scope.$broadcast('terminal-output', {
					output: true,
					text: [string],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}


		function tLs() {
			setTimeout(function() {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['Current Events',
					'Turing/',
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
					var check=cmd.command;
					var ce='Workshop on Website Penetration\n 27th August at 5:45 PM\n NLH 204';
					var py="PyPals is organizing MUPy, a conference to foster interest and awareness about Python.\n  Along with several alumni of the college, PyPals shall also be inviting renowned speakers from different parts of the country to motivate and inspire coders and beginners alike.\n  Check them out at www.pypals.org";
					var def="Usage: cat [FILE]";
					var tur="Can't open directories";
					switch(check.substr(check.indexOf(' ')+1)) {
						case 'Current Events': str=ce; break;
						case 'MUPy': str=py; break;
						case 'Turing/': str=tur; break;
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
				case 'whoami': tWhoAmI(); break;
				case 'man' : tMan(cmd); break;
				case 'ls' : tLs(); break;
				case 'cat' : tCat(cmd); break;
				case 'cd' : tCd(cmd); break;
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
