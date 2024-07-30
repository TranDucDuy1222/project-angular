app.controller('detailCtrl' , function($scope , $routeParams , $http , $rootScope){
    $scope.title = ""
    $scope.detail = {}
    $http.get(`http://localhost:3000/products/${$routeParams.id}`).then(
        function (res) {
            $scope.detail = res.data     
            console.log($scope.detail);
        },
        function (res) {
            alert('Không tải được dữ liệu chi tiết')
        }
    )

    // Cập nhật lại lượt xem
    $http.get(`http://localhost:3000/products/${$routeParams.id}`).then(
        function (res) {
            $scope.detail.view++
            $http.patch(`http://localhost:3000/products/${$routeParams.id}` , {
                view : $scope.detail.view
            })
        },
        function (res) {
            alert('Không tải được dữ liệu lượt xem')
        }
    )

    // Thêm sản phẩm vào giỏ hàng 
    $scope.addtoCart =  function(sp){
        let incart = false
        // Kiểm tra nếu đã có sản phẩm trong cart thì tăng số lượng
        $rootScope.carts.forEach(product => {
            if (product.id == sp.id && product.size == sp.size) {
                incart = true
                product.quantity++
                alert('Thêm sản phẩm thành công')
            }
        });    
        if (!incart) {// Kiểm tra nếu chưa có sản phẩm trong giỏ hàng thì incart=false
            sp.quantity = 1
            $rootScope.carts.push(sp)
            alert('Đặt hàng thành công')
        }
        localStorage.setItem('carts' , JSON.stringify($rootScope.carts))

    }




})
