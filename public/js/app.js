import '../../node_modules/angular-material/angular-material.css';

const angular = require('angular');
const ngMaterial = require('angular-material');

const app = angular.module('myApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  const themeColor = 'blue';
  $mdThemingProvider.theme('default');
});

app.controller('myCtrl', function($scope, $interval) {
  $scope.laps = 0;
  $scope.projected = 0;
  $scope.mins = 0;
  $scope.secs = 0;
  $scope.running = false;
  let timer;
  $scope.enableLimit = true;
  $scope.limit = 5.0;
  $scope.units = 'min';

  $scope.startTimer = function () {
    $scope.running = true;
    let limitSecs = $scope.enableLimit && ($scope.units === 'sec' ? $scope.limit : $scope.limit * 60);
    let startTime = (new Date()).getTime();
    timer = $interval(function(){
      let newTime = (new Date().getTime() - startTime)/1000.0;
      $scope.mins = Math.floor(newTime / 60);
      $scope.secs = newTime % 60;
      if (limitSecs && newTime >= limitSecs){
        $scope.stopTimer();
      }
    },10);
  };

  $scope.stopTimer = function() {
    $interval.cancel(timer);
    $scope.running = false;
  };

  $scope.addLap = () => {
    $scope.laps +=1;
    if(!$scope.enableLimit){
      return;
    }
    let lapsPerSec = ($scope.laps*1.0) / ($scope.mins*60 + $scope.secs);
    $scope.projected = lapsPerSec * ($scope.units === 'sec' ? $scope.limit : $scope.limit * 60);
  };

  $scope.resetNumbers = () => {
    if($scope.running) {
      return;
    }
    $scope.laps = 0;
    $scope.projected = 0;
    $scope.mins = 0;
    $scope.secs = 0;
  };
});
