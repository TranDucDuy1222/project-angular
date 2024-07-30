app.controller('mainCtrl' , function($scope , $rootScope , $location){
    if (localStorage.getItem('user')) {
        $rootScope.user = JSON.parse(localStorage.getItem('user'))
    }
    $scope.logout = function(){
        localStorage.removeItem('user')
        delete $rootScope.user
        $location.path('/login')
    }
    if (localStorage.getItem('carts')) {        
        $rootScope.carts = JSON.parse(localStorage.getItem('carts'))
    }else{
        $rootScope.carts = []
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
})
