app.controller('cartCtrl' , function($scope , $rootScope , $http , $location){
    $scope.total = function(){
        let tong = 0
        if ($rootScope.carts) {
            $rootScope.carts.forEach(sp => {
                tong += sp.discount * sp.quantity

            });
        }
        return tong
    }

    $scope.quatitypro = function(){
        const totalquaitty = JSON.parse(localStorage.getItem('carts'));
        // Tạo một đối tượng để lưu trữ thông tin về id và size
        const productInfo = {};
        // Duyệt qua danh sách sản phẩm
        totalquaitty.forEach((product) => {
            const key = `${product.id}-${product.size}`; // Kết hợp id và size để tạo key duy nhất
            if (!productInfo[key]) {
                productInfo[key] = 1; // Nếu chưa tồn tại, khởi tạo với giá trị 1
            } else {
                productInfo[key]++; // Nếu đã tồn tại, tăng giá trị lên 1
            }
        });
    
        // Đếm số lượng sản phẩm có id và size khác nhau
        let count = 0;
        for (const key in productInfo) {
            if (productInfo.hasOwnProperty(key)) {
                count++;
            }
        }
        //console.log(`Số lượng sản phẩm có id và size khác nhau: ${count}`);
        return count
    
    }
    
    // Lưu lại thông tin cart lên local
    $scope.savecarts = function (){
        localStorage.setItem('carts' , JSON.stringify($rootScope.carts))
    }
    $scope.deletecarts = function(i){
        $rootScope.carts.splice(i , 1)
        $scope.savecarts()
    }
    $scope.deleteall = function(){
        $rootScope.carts = []
        $scope.savecarts()
    }

    // Show địa chỉ
    $http.get('public/js/data.js').then(
        function(res){
            //console.log(res);
            $scope.dsTinh = res.data
        },
        function(res){
            alert('Không tải được dữ liệu về địa chỉ')
        }
    )

    $scope.updateDistrictsAndWards = function() {
        // Lọc danh sách quận và phường tương ứng với tỉnh đã chọn
        if ($scope.tinh) {
            $scope.filteredDistricts = $scope.tinh.Districts;
            if ($scope.filteredDistricts) {
                $scope.filteredWards = $scope.filteredDistricts.Wards
            }

        } else {
            $scope.filteredDistricts = [];
            $scope.filteredWards = [];
        }
    };
    

    // Bắt dữ liệu đơn hàng 
    $scope.checkOrder = function(){
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            $scope.iduser = user.id
            $http.post('http://localhost:3000/orders',{
                name: $scope.name,
                phone: $scope.phone,
                products : $rootScope.carts,
                tinh: $scope.tinhtp,
                quan: $scope.quanhuyen,
                px: $scope.phuongxa,
                address: $scope.address,
                iduser : $scope.iduser,
                total : $scope.total(),
                date : new Date().toLocaleString('sv-SE'),
                status: 1
            }).then(
                function(res){
                    $scope.deleteall()
                    document.querySelector('.btn-close').click()
                    $location.path('/order')
                }
            )
            
        }
        else{
            alert('Bạn hãy đăng nhập để đặt hàng')
        }
    }


})