var app = angular.module('myapp', ['ngRoute'])
app.run(function($rootScope, $timeout){
    $rootScope.$on('$routeChangeStart',function(){
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess',function(){
        $timeout(function(){
            $rootScope.isLoading = false;
        },500)
    });
    $rootScope.$on('$routeChangeError',function(){
        $rootScope.isLoading = false;
    });
})
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl : 'Views/home.html?'+ Math.random(),
        controller : 'homeCtrl'
    })
    .when('/allproduct',{
        templateUrl : 'Views/allproduct.html?'+ Math.random(),
        controller : 'allCtrl'
    })
    .when('/cart',{
        templateUrl : 'Views/cart.html?'+ Math.random(),
        controller : 'cartCtrl'
    })
    .when('/detail/:id',{
        templateUrl : 'Views/detail.html?'+ Math.random(),
        controller : 'detailCtrl'
    })
    .when('/forgot',{
        templateUrl : 'Views/forgot.html?'+ Math.random(),
        controller : 'forgotCtrl'
    })
    .when('/dang-nhap',{
        redirectTo :'/login'
    })
    .when('/login',{
        templateUrl : 'Views/login.html?'+ Math.random(),
        controller : 'loginCtrl'
    })
    .when('/order',{
        templateUrl : 'Views/order.html?'+ Math.random(),
        controller : 'orderCtrl'
    })
    .when('/order-detail/:id',{
        templateUrl : 'Views/order-detail.html?'+ Math.random(),
        controller : 'oddetailCtrl'
    })
    .when('/signup',{
        templateUrl : 'Views/signup.html?'+ Math.random(),
        controller : 'signupCtrl'
    })
    
    .otherwise({
        template: '<h1>Trang không tồn tại!</h1>'   
    })

})
.filter('search',function(){
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






