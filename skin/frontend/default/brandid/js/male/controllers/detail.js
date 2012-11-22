'use strict';

/**
 * This is the nav controller for the application.
 *
 */

function DetailCtrl($scope, $routeParams) {
    $scope.templateUrl = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
}