var modulo = angular.module('MyApp',['ngRoute']);

modulo.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'login.html',
      controller: "MainController"
    })

    .when('/vista2',{
      templateUrl:'passRecover.html',
      controller: "controller2"
    })

    .when('/vista3',{
        templateUrl:'mailSent.html',
        controller: "controller3"
      })

});

modulo.factory("factoria", function(){
  var prueba = {};
  prueba.user;
  prueba.email;
  return prueba;
});

modulo.controller('MainController', function($scope,factoria) {

  $scope.getUsername = function(){
    factoria.user = $scope.username;
  }

  $scope.username = factoria.user;

  $scope.friends = [
    {name: 'Jose', age:25},
    {name: 'Pedro', age:34},
    {name: 'Juan', age:44}
  ];

  $scope.addFriends = function(){
    $scope.errMsg = true;//Utilizado para cambiar el color del mensaje dependiendo de si las condiciones son validas o no.
    if($scope.friendName==null || $scope.friendAge==null){
      $scope.message = "Rellena los campos";

    }else{
    $scope.friends.push({name: $scope.friendName ,age: $scope.friendAge });
    $scope.message = $scope.friendName + " with "+ $scope.friendAge +" years old has been added";
    $scope.errMsg = false;
    }

  }

  $scope.removeFirst = function() {
    $scope.friends.shift();
    $scope.message = "The first element has been deleted";
    $scope.errMsg = false;
  };

  $scope.remove = function() {    
    $scope.errMsg = true;
    var result = $scope.friends.filter(objeto => {
      if($scope.friendName==null || $scope.friendAge==null){
        $scope.message = "Complete the two matchs";
        
      }else if(objeto.name != $scope.friendName || objeto.age != $scope.friendAge){
        $scope.message = "There aren't anyone to remove with this name or this age";

      }
      if(objeto.name == $scope.friendName && objeto.age == $scope.friendAge){
        $scope.message = $scope.friendName+" has been deleted";
        $scope.errMsg = false;

      }
      return objeto.name !=$scope.friendName || objeto.age !=$scope.friendAge;
      
    });

    $scope.friends = result;
  };
})

modulo.controller('controller2', function($scope,factoria) {

  $scope.getMail = function(){
    factoria.email = $scope.mail;
  }
  $scope.username = factoria.user;

})

modulo.controller('controller3', function($scope,$window,factoria) {
  $scope.mail = factoria.email;

  $scope.redirect = setTimeout(function() {
    $window.location.href = "#!/";
  }, 3000);

})