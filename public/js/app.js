
const angular = require('angular');

const app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
  $scope.mins = 0;
  $scope.secs = 0;
  $scope.running = false;
  let timer;
  $scope.limit = 5.0;
  $scope.units = 'min';

  $scope.startTimer = function () {
    $scope.running = true;
    let limitSecs = $scope.units === 'sec' ? $scope.limit : $scope.limit * 60;
    let startTime = (new Date()).getTime();
    timer = $interval(function(){
      let newTime = (new Date().getTime() - startTime)/1000.0;
      $scope.mins = (newTime / 60);
      $scope.secs = newTime % 60;
      if (newTime >= limitSecs){
        $scope.stopTimer();
      }
    },10);
  };

  $scope.stopTimer = function() {
    $interval.cancel(timer);
    $scope.running = false;
  };
});
