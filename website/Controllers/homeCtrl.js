app.controller('homeCtrl', function ($scope, $http) {
    $scope.title = "Home"
    $scope.dsGiay = []
    $http.get('http://localhost:3000/products').then(
        function (res) {
            $scope.dsGiay = res.data
            // Sắp xếp mảng theo ngày giảm dần
            $scope.dsGiay.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            // Lấy 4 sản phẩm có ngày mới nhất
            $scope.productnew = $scope.dsGiay.slice(0, 4);
            
        },
        function (res) {
            alert('Không tải được dữ liệu sản phẩm')
        }
    )

})