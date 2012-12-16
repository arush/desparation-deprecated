/**
 * HelperService Module
 *
 *  Functions that are required across the whole app
 */angular.module("HelperServices",[]).factory("HelperService",function(){var e={name:"Helper",getKey:function(){var e="5wZ821rKIQ804Xe";return e},getDevOrLive:function(){var e=!1,t=window.location.host,n=t.split(".");n[0]==="www"?e=!0:e=!1;return e},authorizeSuccessKey:function(e){var t=!1,n=this.getKey();e===n&&(t=!0);return t}};return e});