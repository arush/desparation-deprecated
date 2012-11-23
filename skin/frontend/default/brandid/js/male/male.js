// Had to load these here because external js in Magento loads last, so kept getting "jQuery undefined" error
// Must include in core.js eventually if they are needed across the whole site. Right now they are not.

// @codekit-prepend "libs/jquery-1.8.3.js"
// @codekit-prepend "libs/angular-1.0.2.js"
// @codekit-prepend "libs/parse-1.1.11.js"
// @codekit-prepend "libs/stately-1.0.0.js"

// @codekit-prepend "libs/angular-ui/build/angular-ui.js"
// @codekit-prepend "libs/select2/select2.js"

// Angular files that make up the Male app


// @codekit-prepend "app/ngMale.js"



// @codekit-prepend "controllers/master.js"
// @codekit-prepend "controllers/detail.js"
// @codekit-prepend "controllers/slide.js"
// @codekit-prepend "controllers/main.js"

// @codekit-prepend "modules/services.js"
// @codekit-prepend "modules/stateMachines.js"



$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("oB4lSEsDL1MuJbLiTe4pHQbNvCJAzfu4nUMdsLL2", "LZ88ABUjZ0l92Nogc3TlCWRlGeKWBkqOXWw382hu");

});