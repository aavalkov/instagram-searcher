angular.module('instaApp', [])
	.config(function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
	})
	.controller('instaCtrl', function($scope, $http){
		$scope.waiting = false;

		$scope.submit = function(searchTag){
			if (!$scope.instaSearchForm.$valid){
				return false;
			}
			var tag = searchTag;
			$scope.resultTag = tag;
			$scope.results = false;
			$scope.waiting = true;

			var url = "https://api.instagram.com/v1/tags/"+ tag +"/media/recent";
			var request = {
				callback: 'JSON_CALLBACK',
				client_id: 'b0b45972a27f4a328b890f26d07ff87e'
			};


			$http({
				method: 'JSONP',
				url: url,
				params: request
			})
			.then(function(response){
				$scope.waiting = false;
				$scope.instaSearchForm.$setPristine();
				$scope.searchTag = "";
				$scope.results = response.data.data;
			},
			function(response){
				$scope.waiting = false;
				alert('There was an error, please try again.');
			});
		};		
	});
