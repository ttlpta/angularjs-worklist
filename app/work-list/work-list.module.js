var workListComponent = angular.module('workListComponent',['ngMaterial'])
						.config(function($mdThemingProvider, $mdIconProvider){
						$mdIconProvider
							.icon("menu"       , "./assets/svg/menu.svg", 24)
							.icon("build"      , "./assets/svg/ic_build_black_36px.svg", 24)
							.icon("icon"      , "./assets/svg/ic_launch_black_36px.svg", 512)
							.icon("add"      , "./assets/svg/ic_playlist_add_black_48px.svg", 512)
							.icon("delete"      , "./assets/svg/ic_delete_black_48px.svg", 512);
						$mdThemingProvider.theme('default')
							.primaryPalette('pink')
							.accentPalette('orange');
						});;