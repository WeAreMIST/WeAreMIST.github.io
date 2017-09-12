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

		//Commands


		function Cmd(name,desc,argc=0,multi_arg) {
		    this.name = name; //Name of cmd
		    this.desc = desc; //Man Description
		    this.argc = argc; //Number of arguements it supports 
		    this.multi_arg = multi_arg; //If the cmd should supports multiple arguements like cat
		}
		//js doesn't support default arguements >_<
		myCmds = [
		    new Cmd("help","No manual entry for help",0,false),
		    new Cmd("ls", "List current working directory contents",0,false),
		    new Cmd("man","Man page for commands\n  Usage: man [PATH]",1,false),
		    new Cmd("whoami","A description of our activities and what we represent",0,false),
		    new Cmd("cat","Prints the contents of the file to the standard output",1,true),
		    new Cmd("clr","No manual entry for clr",0,false),
		    new Cmd("cd","Cmd for change working directory\n  Usage: cd [PATH]",1,false),
		    new Cmd("exit","Navigate back to the home page",0,false),
		];

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

		function tMan(argv) {
			debugger;
			setTimeout(function() {
					var string=argv[1]+" is not a valid Command";
					for(var i in myCmds)
						 if(myCmds[i].name===argv[1])
							{
								string=myCmds[i].desc;
								break;
							}
					if(argv.length==1)
						string="Wrong Usage!\n  Usage: man [COMMAND]";						

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

		function tCat(argv) {
			setTimeout(function() {
					var ce='Workshop on Website Penetration\n 27th August at 5:45 PM\n NLH 204';
					var py="PyPals is organizing MUPy, a conference to foster interest and awareness about Python.\n  Along with several alumni of the college, PyPals shall also be inviting renowned speakers from different parts of the country to motivate and inspire coders and beginners alike.\n  Check them out at www.pypals.org";
					var wrngfile=argv[1]+" is not a valid file name";
					var tur="Can't open directories";
					switch(argv[1]) {
						case 'Current_Events': str=ce; break;
						case 'MUPy': str=py; break;
						case 'Turing/': str=tur; break;
						default: str=wrngfile;
					}
					if(argv.length==1)
						str="Wrong Usage!\n  Usage: cat [FILE]";
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

		function tError(int=0) {
			setTimeout(function() {
				var str="Error: ";
				switch(int)
				{
					case 0: str+='Invalid Command!\n  type help to get help (duh)'; break;
					case 1: str+="Command doesn't take arguements"; break;
					case 2: str+="No support for multiple arguement right now"; break;
					case 3: str+="Command should take one arguement"; break;
				}
				$scope.$broadcast('terminal-output', {
					output: true,
					text: [str],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
			return true;
		}

		function errorCheck(argv,argc)
		{	
			var err=false;
			for(var i in myCmds)
			{					
				if(myCmds[i].name===argv[0])
					{	
						if(myCmds[i].argc==0 && argc!=1)
							err=tError(1);
						else if(myCmds[i].argc==1 && argc>2)
							{	
									if(myCmds[i].multi_arg)
										err=tError(2);
									else
										err=tError(3);
							}
						break;
					}
			}
			return err;
			//tError();
		}

		/* Take user input */
		$scope.$on('terminal-input', function(e, consoleInput) {
			var cmd = consoleInput[0].command;
			var argv = cmd.split(" ");
			var argc = cmd.match(/(\w+)/g).length;
			if(!errorCheck(argv,argc))
				switch(argv[0]) {
					case 'help': tHelp(); break;
					case 'whoami': tWhoAmI(); break;
					case 'ls' : tLs(); break;
					case 'clr': tClr(); break;
					case 'exit': tExit(); break;
					case 'man' : tMan(argv); break;
					case 'cat' : tCat(argv); break;
					case 'cd' : tCd(cmd); break;
					default: tError();
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
