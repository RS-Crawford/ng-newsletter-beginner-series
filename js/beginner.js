var app = angular.module('myApp', []),
    apiKey = 'MDIxMTYzOTE4MDE0NDY4NDg0NjM2ZWY0MQ000',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';


app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');

  $scope.audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
  //audio.play();

  $scope.play = function () {
    $scope.audio.play();
    scope.playing = true;
  };

  $scope.stop = function () {
    $scope.audio.stop();
    scope.playing = false;
  }

  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    })
  })

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });

}]);

app.controller('RelatedController', ['$scope', function($scope) {
}]);

// Parent scope
app.controller('FrameController', ['$scope', function($scope) {

}]);