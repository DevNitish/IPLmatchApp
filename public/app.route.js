myipl.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/registration');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('registration', {
            url: '/registration',
            templateUrl: 'views/registration.html',
            controller: 'mainCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        })
        .state('matches', {
            url: '/matches',
            templateUrl: 'views/match.html',
            controller: 'mainCtrl'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'views/contact.html',
            controller: 'mainCtrl'
        })
        .state('teams', {
            url: '/teams',
            templateUrl: 'views/teams.html',
            controller: 'teamCtrl'
        })
        .state('livescore', {
            url: '/livescore',
            templateUrl: 'views/livescore.html',
            controller: 'liveCtrl'
        })
        .state('teaminfo', {
            url: '/:name/:img/:season',
            templateUrl: 'views/teaminfo.html',
            params: {
                data: null,
                teaminfo: null
            },
            controller: ['$scope', '$rootScope', '$state', '$stateParams', '$http','match','teaminfo', function ($scope, $rootScope, $state, $stateParams, $http,match,teaminfo) {
                          $scope.allSeason=[];
                          $scope.match=match;
                          $scope.year=$stateParams.season;
                          console.log(match);
                          $scope.teaminfo=teaminfo;
                            $scope.callallSeason = function () {
                                $state.param
                                var first = 2008
                                
                                for ($stateParams.season; $stateParams.season>= 2008;$stateParams.season--) {
                                       $scope.allSeason.push(parseInt($stateParams.season))
                                }
                              
                            };
                            $scope.callallSeason();
                            $scope.findMatch=function(year){
                                var obj={
                                    name:$stateParams.name,
                                    season:year
                                }
                                console.log("obj",obj)
                                 $scope.year=year;
                                $http.post('/findTeamDetails',obj).then((res) => {
                                         $scope.match= res.data;
                                    })
                            }
                console.log($stateParams, $scope.allSeason)

            }],
            resolve:{
                match:['$stateParams', '$http',function($stateParams, $http){
                    
                    if ($stateParams.data) {
                        return $stateParams.data;
                    } else {

                        return $http.post('/findTeamDetails', $stateParams).then((res) => {
                            return res.data;
                        })
                    }
                }],
                teaminfo:['$stateParams', '$http',function($stateParams, $http){
                    return {
                        name:$stateParams.name,
                        imageurl:$stateParams.img
                    }
                }]
            }
        })
}]);