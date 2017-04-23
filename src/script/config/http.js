'use strict'
angular.module('app').config(['$provide',function($provide) {
    $provide.decorator('$http',['$delegate','$q',function($delegate,$q) {
        var get = $delegate.get;
        $delegate.post = function(url,data,config) {
            var def = $q.defer();
            get(url).then(function(res) {
                def.resolve(res.data)
            },function(err) {
                def.reject(err);
            })
            return {
                success:function(cb) {
                    def.promise.then(cb);
                },
                error:function(cb) {
                    def.promise.then(null,cb);
                }
            }
        }
        return $delegate;
    }])
}])