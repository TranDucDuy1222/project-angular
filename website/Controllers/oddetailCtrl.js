app.controller('oddetailCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.oddetail = {}
    $http.get(`http://localhost:3000/orders/${$routeParams.id}`).then(
        function (res) {
            $scope.oddetail = res.data
            console.log($scope.oddetail);
        },
        function (res) {
            alert('Không tải được dữ liệu đơn hàng chi tiết')
            $location.path('/order')
        }
    )

    // Hàm hủy đơn hàng
    $scope.cancel = function (id) {
        $http.patch('http://localhost:3000/orders/' + id, {
            status: 4
        }).then(
            function (res) {
                // Xử lý sau khi cập nhật thành công
                console.log('Trạng thái đã được cập nhật thành 4');
            }
        );
    }
    $scope.reviewed = function () {
        $http.patch(`http://localhost:3000/orders/${$routeParams.id}`, {
            status: 5
        }).then(
            function (res) {
                // Xử lý sau khi cập nhật thành công
                console.log('Trạng thái đã được cập nhật thành 5');
            }
        );
    }

    // Hàm thêm đánh giá
    $scope.review = function() {
        if ($scope.idgiay) {
            var idGiayValue = $scope.idgiay;
            var nameValue = $scope.name;
            var clValue = $scope.cl;
            var ndblValue = $scope.ndbl;
            var motaValue = $scope.mota;
    
            // Truyền dữ liệu dưới dạng đối tượng JSON
            $http.post('http://localhost:3000/reviews', {
                idGiay: idGiayValue,
                name: nameValue,
                cl: clValue,
                ndbl: ndblValue,
                mota: motaValue
                //date : new Date().toLocaleString('sv-SE'),
            }).then(
                function(res) {
                    console.log(res);
                    $scope.reviewed();
                    //document.querySelector('.btn-close').click()
                }
            );
        }
    }
    

})