app.controller('loginCtrl' , function($scope , $http , $rootScope , $location){
    $scope.iserros = false
    $scope.login = function(){
        $http.get(`http://localhost:3000/users?phone=${$scope.phone}&password=${$scope.pw}`).then(
            function(res){
                if (res.data.length == 0) { // Nếu mảng dữ liệu rỗng thì báo lỗi kh đăng nhập được
                    $scope.iserros = true
                }
                else{
                    $rootScope.user = res.data[0]
                    localStorage.setItem('user' , JSON.stringify($rootScope.user))
                    $location.path('/')
                }
            },
            function(res){
                $scope.iserros = true
            }
        )
    }
})