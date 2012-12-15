




// Had to load these here because external js in Magento loads last, so kept getting "jQuery undefined" error
// Must include in core.js eventually if they are needed across the whole site. Right now they are not.

// @codekit-prepend "libs/jquery-1.8.3.js"
// @codekit-prepend "libs/angular-1.0.2.js"
// @codekit-prepend "libs/parse-1.1.15.js"
// @codekit-prepend "libs/stately-1.0.0.js"
// @codekit-prepend "libs/bootstrap-modal-2.2.2.js"

// @codekit-prepend "libs/angular-ui/build/angular-ui.js"
// @codekit-prepend "libs/select2/select2.js"



// @codekit-prepend "libs/jquery-male-typewriter.js"




/***************************/
// Angular files that make up the Male app

// @codekit-prepend "app/ngMale.js"



// the questions service must be defined first, all question sets go after
// @codekit-prepend "modules/questionLoader.js"
// @codekit-prepend "modules/boxers/boxersQuestions.js"
// @codekit-prepend "modules/socks/socksQuestions.js"


// @codekit-prepend "modules/brandsLoader.js"
// @codekit-prepend "modules/coloursLoader.js"
// @codekit-prepend "modules/sizeLoader.js"
// @codekit-prepend "modules/specificsLoader.js"
// @codekit-prepend "modules/checkoutLoader.js"


// @codekit-prepend "controllers/detail.js"
// @codekit-prepend "controllers/section.js"
// @codekit-prepend "controllers/question.js"
// @codekit-prepend "controllers/dashboard.js"
// @codekit-prepend "controllers/category.js"
// @codekit-prepend "controllers/checkout.js"

// @codekit-prepend "controllers/forms/BrandsFormController.js"
// @codekit-prepend "controllers/forms/SizeFormController.js"
// @codekit-prepend "controllers/forms/ColoursFormController.js"
// @codekit-prepend "controllers/forms/SpecificsFormController.js"

// @codekit-prepend "controllers/main.js"

// @codekit-prepend "modules/DataServices.js"


