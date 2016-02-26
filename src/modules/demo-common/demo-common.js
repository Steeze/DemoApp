var module = angular.module('demo-common', []),
    factory = module.factory,
    directive = module.directive,
    controller = module.controller,
    filter = module.filter,
    provider = module.provider,
    noop = angular.noop,
    forEach = angular.forEach,
    copy = angular.copy,
    isObject = angular.isObject,
    isFunction = angular.isFunction,
    isUndefined = angular.isUndefined,
    extend = angular.extend,
    lowercase = angular.lowercase,
    equals = angular.equals,
    element = angular.element,
    apiBaseUrl = window.apiConfig.baseUrl;