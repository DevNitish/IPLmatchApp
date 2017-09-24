myipl.controller('teamCtrl', ["$scope", "$http", "$timeout", "$state","$stateParams", "$rootScope", function ($scope, $http, $timeout, $state,$stateParams, $rootScope) {

    $scope.allTeam = [];
    $scope.getAllTeam = function () {
        $http.get('/getAllTeam').then((response) => { 
            $scope.allTeam = response.data;
        }) 
    };
    $scope.lastSeason = '2016';
    $scope.currentTeam = {};
    $scope.currentTeamInfo=[];
    $scope.moreInfo = function (team) {
        var obj = {}
        obj.name = team.name;
        obj.season = $scope.lastSeason
        $scope.currentTeam = team;
        $http.post('/findTeamDetails', obj).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
          
            if (!response.data.length) {
                $scope.lastSeason--;
                $scope.moreInfo({
                    name: $scope.currentTeam.name,
                    season: $scope.lastSeason
                })
            }else{
                  console.log("res=", response.data);
                 $scope.currentTeamInfo=response.data;
                
                   $state.go('teaminfo', {
                        name: $scope.currentTeam.name,
                        season:$scope.lastSeason,
                        img:team.imageurl,
                        data:response.data
                        });
            }

        });
    }
 
    //ctrl ends
}]);