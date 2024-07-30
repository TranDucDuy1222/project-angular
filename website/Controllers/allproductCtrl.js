app.controller('allCtrl' , function($scope , $http){
    $scope.title = "Tất cả sản phẩm"
    $scope.dsall = []
    $http.get(`http://localhost:3000/products`).then(
        function (res) {
            res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            $scope.dsall = res.data     
        },
        function (res) {
            alert('Không tải được dữ liệu sản phẩm')
        }
    )

    // Phân trang
    $scope.limit = 8
    $scope.page = 1
    // page = n -> begin = (n-1)*3
    $scope.begin = ($scope.page-1)*$scope.limit
    $scope.chuyentrang = function(sotrang){
        $scope.page = sotrang
        $scope.begin = ($scope.page-1)*$scope.limit
    }
    $scope.totalPage = function(){
        return Math.ceil($scope.dsall.length/$scope.limit)
    }
    $scope.pagelist = function(){
        let arr = []
        for (let i = 1; i <= $scope.totalPage(); i++) {
            arr.push(i)
        }
        return arr
    }
    

})
app.filter('search',function(){
    return function(input,keyword,attr){
        let kq = []
        if (keyword) {
            keyword = keyword.toLowerCase()
            attr.forEach(thuoctinh =>{
                let tam = input.filter(item =>{
                return item[thuoctinh].toString().toLowerCase().indexOf(keyword)>=0
                })
                kq.push(...tam)
            })  
        }else{
            kq = input
        }
        return kq
    }
})

