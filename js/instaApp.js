angular.module('instaApp', [])
	.config(function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
	})
	.controller('instaCtrl', function($scope, $http){

		$scope.submit = function(searchTag){
			$scope.searchTag = searchTag;
			var url = "https://api.instagram.com/v1/tags/"+ searchTag +"/media/recent";
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
				$scope.results = response.data.data;
				console.log("hello");
			},
			function(response){
				alert('error');
			});
		};		
	});
