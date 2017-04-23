'use strict'

angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope) {
    $scope.isActive = true;
    $http.get('data/company.json?id=' + $state.params.id).then(function(res) {
        $scope.company = res.data;
        
        // $scope.showPositionList(0);
        // $scope.$broadcast('abc',{id:1});

    },function(err) {

    })
    // $scope.$on('cba',function(event,data) {
    //     console.log(event,data.name)
    // })

   
}])