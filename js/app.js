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


		//Counter for Bonus ;)
		c=0;

		//Current Working Directory
		pwd="/";

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
		    new Cmd("ls", "List current working directory contents",1,true),
		    new Cmd("man","Man page for commands\n  Usage: man [PATH]",1,false),
		    new Cmd("whoami","A description of our activities and what we represent",0,false),
		    new Cmd("cat","Prints the contents of the file to the standard output",1,true),
		    new Cmd("clr","Clear Screen",0,false),
		    new Cmd("pwd","Print Working Directory",0,false),
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
						'pwd\t: Print Working Directory',
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

		function tPwd() {
			setTimeout(function() {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: [pwd],
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
				var rootDir='Current_Events\n  Turing/\n  MUPy\n  //Use cat to view contents';
				var turingDir='Turing is the annual Techtatva Event hosted by MIST and LUG\n  Events:\n  Mobivision\n  FunWithScripting\n  HackItOut\n  Smoked';
				var ls=rootDir;
				switch(pwd)
				{
					case "/": ls=rootDir; break;
					case "/Turing/": ls=turingDir; break;
				}
				$scope.$broadcast('terminal-output', {
					output: true,
					text: [ls],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tCd(argv) {
			setTimeout(function() {
				var str="";
				if(argv.length==1)
					str="Usage: cd [DIRECTORY]";
				else if(argv.length==2)
					{	
						switch(argv[1])
						{
							case "/": pwd="/";break;
							case "Turing/": pwd="/Turing/";break;
							case "/Turing/":pwd="/Turing/";break;
							case "..": if(pwd="/Turing/") pwd="/"; else str="Can't go up"; break;
							default: str="Invalid Path";break;
						}
					}
				
				$scope.$broadcast('terminal-output', {
					output: true,
					text: [str],
					breakLine: true
				});
				$scope.$apply();
			}, 0.1);
		}

		function tCat(argv) {
			setTimeout(function() {
					var ce='Workshop on Website Penetration\n  27th August at 5:45 PM\n  NLH 204';
					var py="PyPals is organizing MUPy, a conference to foster interest and awareness about Python.\n  Along with several alumni of the college, PyPals shall also be inviting renowned speakers from different parts of the country to motivate and inspire coders and beginners alike.\n  Check them out at www.pypals.org";
					var wrngfile=argv[1]+" is not a valid file name";
					var tur="cat: Turing/: Is a directory";
					var mobi="Learn Android and IOs Dev";
					var scrp="Learn Python and BASH Scripting";
					var hio="Hacking 101";
					var smkd="Our Flagship online event where we test your guile";
					switch(argv[1]) {
						case 'Current_Events': if(pwd=="/")str=ce;else str=wrngfile; break;
						case 'MUPy': if(pwd=="/")str=py;else str=wrngfile; break;
						case 'Turing/': if(pwd=="/")str=tur;else str=wrngfile; break;
						case 'Mobivision': if(pwd=="/Turing/")str=mobi;else str=wrngfile; break;
						case 'HackItOut': if(pwd=="/Turing/")str=hio;else str=wrngfile; break;
						case 'FunWithScripting': if(pwd=="/Turing/")str=scrp;else str=wrngfile; break;
						case 'Smoked': if(pwd=="/Turing/")str=smkd;else str=wrngfile; break;
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
				c++;
				$scope.results.splice(0, $scope.results.length);
				$scope.$apply();
				str="+---------+\n  | M I S T |\n  +---------+";
				if(c>9)
					str="+-------------------------------------+\n  |  __  __   _____    _____   _______  |\n  | |  \\/  | |_   _|  / ____| |__   __| |\n  | | \\  / |   | |   | (___      | |    |\n  | | |\\/| |   | |    \\___ \\     | |    |\n  | | |  | |  _| |_   ____) |    | |    |\n  | |_|  |_| |_____| |_____/     |_|    |\n  |                                     |\n  +-------------------------------------+";
				if(c==11)
					str+="\n  I like your decidation ;)";
				if(c==12)
					str+="\n  You won't find anymore secrets!!";
				if(c==13)
					str+="\n  Don't waste your time >_<";
				if(c==16)
					str+="\n  Did you think I left you?";
				if(c==17)
					str+="\n  But man, seriously let it be..";
				if(c==20)
					str+="\n  Since you are so persistent I will tell you a secret";
				if(c==21)
					str+="\n  This is count 21";
				if(c==25)
					str+="\n  The secret is at count 64 :p";
				if(c==30)
					str+="\n  Find it if you can";
				if(c==45)
					str+="\n  For me it is just a matter of writing if statements ¯\_(ツ)_/¯";
				if(c==55)
					str+="\n  See you at the 64";
				if(c==64)
					str+="\n  You actually came here @_@";
				if(c==65)
					str+="\n  What if all this was a troll?";
				if(c==67)
					str+="\n  JK";
				if(c==68)
					str+="\n  That was it ^";
				if(c==70)
					str+="\n  No MORE!!!";
				if(c==71)
					str+="\n  Do Whatever you want";
				if(c==100)
					str+="\n  You got a century!";
				$scope.$broadcast('terminal-output', {
					output: true,
					text: [str],
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
					case 'pwd' : tPwd(); break;
					case 'cat' : tCat(argv); break;
					case 'cd' : tCd(argv); break;
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
