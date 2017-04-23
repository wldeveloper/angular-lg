'use strict'
angular.module('app').filter('filterByObj',[function() {
    return function(list,obj) {
        var result = [];
        angular.forEach(list,function(item) {
            var isEqual = true;
            for(var k in obj) {
                if(item[k] !== obj[k]){
                    isEqual = false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        })
        return result;
    }
}])