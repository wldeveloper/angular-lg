'use strict'

angular.module('app').controller('positionCtrl',['$log','$q','$http','$state','$scope','cache',function($log,$q,$http,$state,$scope,cache) {
    cache.put('to','youaaa');
   $scope.isLogin = !!cache.get('name');
   $scope.message = $scope.isLogin?'投递简历':'去登陆';
  function getPosition() {
    var def = $q.defer();
    $http.get('data/position.json?id=' + $state.params.id).then(function(res) {
     $scope.position = res.data;
     if(res.data.posted){
      $scope.message = '已投递';
     }
     def.resolve(res.data);
    },function(err) {
        def.reject(err);
    })
    return def.promise;
  }

  // 在获取职位详情后 获取company数据
  function getCompany(id) {
    $http.get('data/company.json?id=' + id).then(function(res) {
        $scope.company = res.data;
    },function(err) {

    })
  }

  getPosition().then(function(data) {
    getCompany(data.companyId);         
  },function(err) {

  })

  $scope.go = function() {
    if($scope.message !== '已投递'){
      if($scope.isLogin){
        $http.post('data/handle.json',{
          id:$scope.position.id
        }).success(function(res) {
          $log.info(res);
          $scope.message = '已投递';
        })
      }else{
        $state.go('login')
      }
    }
  }
}])