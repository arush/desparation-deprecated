// Generated by CoffeeScript 1.3.3
(function() {
  var punter, root;

  punter = new Object();

  createPunter();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.buildPlan = function($scope) {
    var boxerOptions, shirtOptions, shirtUpgrades, sockOptions, teeOptions;
    sockOptions = [
      {
        text: "classic",
        buttonId: "classic",
        selected: false,
        supplement: 0
      }, {
        text: "disco",
        buttonId: "disco",
        selected: false,
        supplement: 0
      }
    ];
    boxerOptions = [
      {
        text: "classic",
        buttonId: "classic",
        selected: false,
        supplement: 0
      }, {
        text: "disco",
        buttonId: "disco",
        selected: false,
        supplement: 0
      }, {
        text: "boxer shorts",
        buttonId: "boxer-shorts",
        selected: false,
        supplement: 0
      }, {
        text: "boxer trunks",
        buttonId: "boxer-trunks",
        selected: false,
        supplement: 0
      }, {
        text: "briefs",
        buttonId: "briefs",
        selected: false,
        supplement: 0
      }
    ];
    teeOptions = [
      {
        text: "crew neck",
        buttonId: "crew-neck",
        selected: false,
        supplement: 0
      }, {
        text: "v-neck",
        buttonId: "v-neck",
        selected: false,
        supplement: 0
      }, {
        text: "white",
        buttonId: "white",
        selected: false,
        supplement: 0
      }, {
        text: "black",
        buttonId: "black",
        selected: false,
        supplement: 0
      }, {
        text: "coloured",
        buttonId: "coloured",
        selected: false,
        supplement: 0
      }
    ];
    shirtOptions = [
      {
        text: "short collar",
        buttonId: "short-collar",
        selected: false,
        supplement: 0
      }, {
        text: "double cuff",
        buttonId: "double-cuff",
        selected: false,
        supplement: 0
      }, {
        text: "slim fit",
        buttonId: "slim-fit",
        selected: false,
        supplement: 0
      }, {
        text: "straight fit",
        buttonId: "straight-fit",
        selected: false,
        supplement: 0
      }, {
        text: "no pocket",
        buttonId: "no-pocket",
        selected: false,
        supplement: 0
      }
    ];
    shirtUpgrades = [
      {
        value: "Tier 1",
        supplement: 0
      }, {
        value: "Tier 2",
        supplement: 25
      }, {
        value: "Tier 3",
        supplement: 75
      }
    ];
    $scope.plan = {
      frequency: "trial"
    };
    $scope.drops = [
      {
        value: "trial"
      }, {
        value: "quarterly"
      }, {
        value: "biannually"
      }
    ];
    $scope.brands = [
      {
        value: "UNBRANDiD",
        supplement: 0
      }, {
        value: "designer",
        supplement: 20
      }
    ];
    $scope.master = {};
    $scope.items = [
      {
        code: "option-10-socks",
        text: "socks",
        qty: 0,
        price: 5,
        optionSupplement: 0,
        upgradeSupplement: 0,
        options: sockOptions
      }, {
        code: "option-20-boxers",
        text: "boxers",
        qty: 1,
        price: 10,
        optionSupplement: 0,
        upgradeSupplement: 0,
        options: boxerOptions
      }, {
        code: "option-30-undertees",
        text: "undertees",
        qty: 0,
        price: 30,
        optionSupplement: 0,
        upgradeSupplement: 0,
        options: teeOptions
      }
    ];
    $scope.update = function() {
      var basketItem, x;
      x = 0;
      basketItem = [];
      while (x < $scope.items.length) {
        basketItem[x] = {
          code: $scope.items[x].code,
          qty: $scope.items[x].qty
        };
        x++;
      }
      $scope.plan.basket = basketItem;
      $scope.updateMageFrequency();
      return saveBasket($scope.plan);
    };
    $scope.freqChanger = function(newFreq) {
      $j('.frequency-chooser a').removeClass('active');
      $j('#' + newFreq + '-button').addClass('active');
      $scope.plan.frequency = newFreq;
      return $scope.update();
    };
    $scope.recalculate = function() {
      var x;
      $scope.plan.total = 0;
      x = 0;
      while (x < $scope.items.length) {
        $scope.plan.total += $scope.items[x].qty * ($scope.items[x].price + $scope.items[x].upgradeSupplement + $scope.items[x].optionSupplement);
        x++;
      }
      $scope.updateMageOptions();
    };
    $scope.updateMageFrequency = function() {
      $j("#product-options-wrapper select").each(function(index) {
        var dropId, e, optionSelector, str;
        e = $j(this);
        dropId = e.attr('id');
        str = e.parent().parent().prev().find('label').text();
        if (str.indexOf("option-frequency") > 0) {
          optionSelector = 'option:contains("' + $scope.plan.frequency + '")';
          $j('#' + dropId + ' ' + optionSelector).attr("selected", "selected");
          return false;
        }
      });
    };
    $scope.updateMageOptions = function() {
      $j("#product-options-wrapper textarea").each(function(index) {
        var e, str;
        e = $j(this);
        str = e.parent().parent().prev().find('label').text();
        if (str === "options-json") {
          e.text(JSON.stringify($scope.items));
          return false;
        }
      });
    };
    $scope.updateMageQty = function(text, qty) {
      $j("#product-options-wrapper select").each(function(index) {
        var dropId, e, itemText, str;
        e = $j(this);
        str = e.parent().parent().prev().find('label').text();
        str = str.split('-');
        if (str[0] === "option") {
          itemText = str[1];
          if (itemText === text) {
            e.find("option").eq(qty).attr("selected", "selected");
            dropId = e.attr('id');
            document.getElementById(dropId).onchange();
            return false;
          }
        }
      });
    };
    $scope.subtract = function(item) {
      if (item.qty > 0) {
        item.qty--;
        $scope.recalculate();
        return $scope.updateMageQty(item.text, item.qty);
      }
    };
    $scope.calculateOptionSupplement = function(index, item) {
      var x, y;
      item.optionSupplement = 0;
      x = 0;
      while (x < $scope.items.length) {
        y = 0;
        while (y < $scope.items[x].options.length) {
          if ($scope.items[x].options[y].selected === true) {
            $scope.items[x].optionSupplement += $scope.items[x].options[y].supplement;
          }
          y++;
        }
        x++;
      }
      return $scope.recalculate();
    };
    $scope.calculateUpgradeSupplement = function(upgrade, item) {
      item.upgradeSupplement = upgrade.supplement;
      return $scope.recalculate();
    };
    $scope.add = function(item) {
      item.qty++;
      $scope.recalculate();
      return $scope.updateMageQty(item.text, item.qty);
    };
    $scope.toggleCustomOption = function(index, item) {
      index.selected = !index.selected;
      $j('#' + '-' + item.text + '-' + index.buttonId).toggleClass('active');
      return $scope.refilter(item);
    };
    $scope.buildFilterString = function(item) {
      var filterString, x;
      x = 0;
      filterString = '.proxy ';
      while (x < item.options.length) {
        if (item.options[x].selected === true) {
          filterString += ', .' + item.options[x].buttonId;
        }
        x++;
      }
      return filterString;
    };
    $scope.refilter = function(item) {
      var $isocontainer, filterString;
      if ($isocontainer === void 0) {
        $isocontainer = $j('#socks-section-container .isotope-holder');
        filterString = $scope.buildFilterString(item);
        return $isocontainer.isotope({
          filter: filterString
        });
      }
    };
    $scope.recalculate();
    return $scope.update();
  };

}).call(this);
