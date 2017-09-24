 
var myipl= angular.module('myipl',['ui.router','ngFileUpload']);

myipl.controller('mainCtrl', ["$scope","$http","$timeout","$state","$rootScope","Upload","getScore","liveScoreSimulator", function($scope,$http,$timeout,$state,$rootScope,Upload,getScore,liveScoreSimulator){
  $rootScope.user={
   name: '',
	mobile:null,
	email:'',
	idurl:'',
    password:''
}; 
  
  //file upload  
    $scope.picFile="";
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: "https://api.cloudinary.com/v1_1/ddj0lavqa/upload",
      data: {
        upload_preset: 'lvpnw5ma',
        tags: 'myphotoalbum',
        context: 'photo=' + $scope.title,
        file: file
      }
    });
//
    file.upload.then(function (response) {
        $rootScope.user.idurl=response.data.secure_url;
        console.log("url ",response.data)
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      if (file.progress===100){
        //alert("File uploaded successfully!")
        $scope.picFile="";
      }
    });
    }
//file upload ends 
$scope.alertClass='';
 $scope.message='';

$rootScope.liveScore={};
$scope.getUser=function(){
    $http.get('/getUser').then(function successCallback(response){
        console.log("users===>",response)
        $rootScope.users=response.data;
    })
} 

$scope.saveUser=function(){
    console.log(" the user is ",$rootScope.user);
    if($rootScope.user._id){ //if user is present then edit the info
            $http.post('/editUser',$rootScope.user).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $rootScope.user={//reset the value of $scope after saving
                name: '',
                mobile:null,
                email:'',
                idurl:'',
                password:''
            };
        });
    } else { // create a user if user is not there
    $http.post('/saveUser',$rootScope.user).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("res",response);
            if(response.data.err){
              $scope.alertClass="alert alert-danger";
            $scope.message=response.data.err;
            }else{
                    $scope.alertClass="alert alert-success";
                $rootScope.savedUser=response.data;
                $scope.message='Registered! Redirecting...';
                $state.go('home',{user:response.data});
            }
                     
        });
    }
}

$scope.editUser=function(user){
    $rootScope.user=user;
}
$scope.deleteUser=function(user){
        console.log("delete the user",user._id);
        $http.post('/deleteUser',user).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("deleted",response);
            
        });
}


//ctrl ends
}]);
myipl.value("myscore",{});
myipl.factory("getScore",["$rootScope","$interval","myscore",function($rootScope,$interval,myscore){
   var obj={};
   obj.get=function(val){
       return val;
   }
   return obj;
}]);

myipl.factory("liveScoreSimulator",["getScore","$interval",function(getScore, $interval){
    var count = 0;

        $interval(function () {
            getScore.get(count);
            count++;
        }, 3000, 5);
        return null;
        
}])