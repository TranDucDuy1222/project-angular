app.controller('orderCtrl' , function($scope , $http){
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        $scope.iduser = user.id
        $scope.dsorders = []
        $http.get(`http://localhost:3000/orders?iduser=${$scope.iduser}`).then(
            function (res) {
                res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                $scope.dsorders = res.data     
            },
            function (res) {
                alert('Không tải được dữ liệu đơn hàng')
            }
        )
    }


})