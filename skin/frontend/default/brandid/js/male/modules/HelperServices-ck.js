/**
 * HelperService Module
 *
 *  Functions that are required across the whole app
 */angular.module("HelperServices",[]).factory("HelperService",function(){var e={name:"Helper",getKey:function(){var e="5wZ821rKIQ804Xe";return e},getEnvironment:function(){var e=window.location.host,t=e.split(".");return t[0]},authorizeSuccessKey:function(e){var t=!1,n=this.getKey();e===n&&(t=!0);return t}};return e});