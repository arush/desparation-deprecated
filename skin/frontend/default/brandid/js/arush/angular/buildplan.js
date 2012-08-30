function buildPlan($scope) {
    var sockOptions = [{
        "text": "classic",
        "selected": false,
        "supplement": 0
    }, {
        "text": "disco",
        "selected": false,
        "supplement": 0
    }];

    var boxerOptions = [{
        "text": "classic",
        "selected": false,
        "supplement": 0
    }, {
        "text": "disco",
        "selected": false,
        "supplement": 0
    }, {
        "text": "boxer shorts",
        "selected": false,
        "supplement": 0
    }, {
        "text": "boxer trunks",
        "selected": false,
        "supplement": 0
    }, {
        "text": "briefs",
        "selected": false,
        "supplement": 0
    }];

    var teeOptions = [{
        "text": "crew neck",
        "selected": false,
        "supplement": 0
    }, {
        "text": "v-neck",
        "selected": false,
        "supplement": 0
    }, {
        "text": "plain",
        "selected": false,
        "supplement": 0
    }, {
        "text": "graphic",
        "selected": false,
        "supplement": 0
    }];

    var shirtOptions = [{
        "text": "short collar",
        "selected": false,
        "supplement": 0
    }, {
        "text": "double cuff",
        "selected": false,
        "supplement": 0
    }, {
        "text": "slim fit",
        "selected": false,
        "supplement": 0
    }, {
        "text": "straight fit",
        "selected": false,
        "supplement": 0
    }, {
        "text": "no pocket",
        "selected": false,
        "supplement": 0
    }];

    var shirtUpgrades = [{
        "value": "Tier 1",
        "supplement": 0
    }, {
        "value": "Tier 2",
        "supplement": 25
    }, {
        "value": "Tier 3",
        "supplement": 75
    }];

    $scope.plan = {};
    $scope.items = [{
        "type": "socks",
        "qty": 0,
        "price": 5,
        "optionSupplement": 0,
        "upgradeSupplement": 0,
        "options": sockOptions
    },

    {
        "type": "boxers",
        "qty": 1,
        "price": 10,
        "optionSupplement": 0,
        "upgradeSupplement": 0,
        "options": boxerOptions
    }, {
        "type": "tees",
        "qty": 0,
        "price": 30,
        "optionSupplement": 0,
        "upgradeSupplement": 0,
        "options": teeOptions
    }, {
        "type": "shirts",
        "qty": 1,
        "price": 25,
        "optionSupplement": 0,
        "upgradeSupplement": 0,
        "options": shirtOptions,
        "upgrades": shirtUpgrades
    }];

    $scope.master = {};

    $scope.update = function (plan) {
        $scope.master = angular.copy(plan);
        $scope.master.items = $scope.items;
    };

    $scope.reset = function () {
        $scope.plan = angular.copy($scope.master);
    };

    $scope.recalculate = function () {
        $scope.plan.total = 0;
        
        for(var x=0; x<$scope.items.length; x++) {
            
            // debug: walk through the object
            //alert('plan total: ' + $scope.plan.total +'\nitem: '+$scope.items[x].type+'\n' + '\nitems['+x+'].qty: ' + $scope.items[x].qty + '\nitems['+x+'].price: ' + $scope.items[x].price + '\nitems['+x+'].upgradeSupplement: ' + $scope.items[x].upgradeSupplement + '\nitems['+x+'].optionSupplement: ' + $scope.items[x].optionSupplement);
            
            $scope.plan.total += $scope.items[x].qty * ($scope.items[x].price + $scope.items[x].upgradeSupplement + $scope.items[x].optionSupplement);
        }
    }
    $scope.subtract = function (item) {
        if (item.qty > 0) {
            item.qty = item.qty - 1;
            $scope.recalculate();
        }
    }
    $scope.calculateOptionSupplement = function (index, item) {
        item.optionSupplement = 0;
        for (var x in $scope.items) {

            for (var y in $scope.items[x].options) {

                if ($scope.items[x].options[y].selected === true) {
                    $scope.items[x].optionSupplement += $scope.items[x].options[y].supplement;

                }
            }
        }
        $scope.recalculate();

    }
    $scope.calculateUpgradeSupplement = function (upgrade, item) {
        item.upgradeSupplement = upgrade.supplement;
        $scope.recalculate();
    }

    $scope.add = function (item) {
        // no upper limit
        item.qty = item.qty + 1;
        $scope.recalculate();
    }

    $scope.reset();
    $scope.recalculate();
}