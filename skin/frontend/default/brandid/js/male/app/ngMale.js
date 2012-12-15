'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['ui','DataServices','QuestionsModule','BrandsModule','ColoursModule','SizeModule','SpecificsModule','CheckoutModule']);

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo:'/section/garms/category/intro',
        // bring this back if we want a pre-intro screen
         // templateUrl:'start.html',
         controller:MainController
      })
      .when('/section/:section/category/:category', {
        // redirectTo:'/section/intro'
        // bring this back if we want a pre-intro screen
         templateUrl:'categoryProxy.html',
         controller:CategoryController
      })
      // .when('/section/:section', {
      //    templateUrl:'sectionProxy.html',
      //    controller:SectionController
      // })
      .when('/section/:section/category/intro/question/:question', {
         redirectTo:'/section/garms/category/intro',
         controller:MainController
      })
      .when('/section/:section/category/:category/question/restart', {
         redirectTo:'/section/garms/category/intro',
         controller:MainController
      })
      .when('/section/garms/category/:category/question/checkout', {
         templateUrl: 'checkout.html',
         controller:CheckoutController
      })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'detailViewProxy.html',
         controller:QuestionController
      })
      
      .otherwise({
        redirectTo: '/section/garms/category/intro'
      });
});
ngMaleApp.$inject = ['ui','DataServices','QuestionsModule','BrandsModule','ColoursModule','SizeModule','SpecificsModule','CheckoutModule'];


