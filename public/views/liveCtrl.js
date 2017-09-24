myipl.controller('liveCtrl', ["$scope", "$http", "$interval", "$state", "$stateParams", "$rootScope","getScore", function ($scope, $http, $interval, $state, $stateParams, $rootScope,getScore) {

    $scope.currentMatch = [];
    $scope.score = 0;
    var getdeliveries = function () { 
        $http.get('../includes/forOnlyDemo/shvsrcb.json').then(function (res) {
            $scope.currentMatch = res.data;
        })
    }
    getdeliveries();
    $scope.test=getScore.get();
    $scope.count = 0;
    $scope.liveScoreSimulator = function () {
        $scope.count = 0;

        $interval(function () {
            console.log($scope.count);
            $scope.count++;
        }, 3000, $scope.currentMatch.length)
    }
        $scope.liveScoreSimulator();



    //ctrl ends
}]);