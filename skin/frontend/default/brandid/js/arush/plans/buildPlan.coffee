# retrieve the punter from cookie
punter = new Object()
createPunter()

root = exports ? this
root.buildPlan = ($scope) ->
  sockOptions = [
    text: "classic"
    selected: false
    supplement: 0
  ,
    text: "disco"
    selected: false
    supplement: 0
  ]
  
  boxerOptions = [
    text: "classic"
    selected: false
    supplement: 0
  ,
    text: "disco"
    selected: false
    supplement: 0
  ,
    text: "boxer shorts"
    selected: false
    supplement: 0
  ,
    text: "boxer trunks"
    selected: false
    supplement: 0
  ,
    text: "briefs"
    selected: false
    supplement: 0
  ]

  teeOptions = [
    text: "crew neck"
    selected: false
    supplement: 0
  ,
    text: "v-neck"
    selected: false
    supplement: 0
  ,
    text: "plain"
    selected: false
    supplement: 0
  ,
    text: "graphic"
    selected: false
    supplement: 0
  ]

  shirtOptions = [
    text: "short collar"
    selected: false
    supplement: 0
  ,
    text: "double cuff"
    selected: false
    supplement: 0
  ,
    text: "slim fit"
    selected: false
    supplement: 0
  ,
    text: "straight fit"
    selected: false
    supplement: 0
  ,
    text: "no pocket"
    selected: false
    supplement: 0
  ]

  shirtUpgrades = [
    value: "Tier 1"
    supplement: 0
  ,
    value: "Tier 2"
    supplement: 25
  ,
    value: "Tier 3"
    supplement: 75
  ]

  $scope.plan = {}
  $scope.master = {}

  $scope.items = [
    type: "socks"
    qty: 0
    price: 5
    optionSupplement: 0
    upgradeSupplement: 0
    options: sockOptions
  ,
    type: "boxers"
    qty: 1
    price: 10
    optionSupplement: 0
    upgradeSupplement: 0
    options: boxerOptions
  ,
    type: "tees"
    qty: 0
    price: 30
    optionSupplement: 0
    upgradeSupplement: 0
    options: teeOptions
  ,
    type: "shirts"
    qty: 1
    price: 25
    optionSupplement: 0
    upgradeSupplement: 0
    options: shirtOptions
    upgrades: shirtUpgrades
  ]

  $scope.update = (plan) ->
    x = 0
    basketItem = []
    while x < $scope.items.length
      basketItem[x] = {
        type: $scope.items[x].type
        qty: $scope.items[x].qty
      }
      x++
    $scope.plan.basket = basketItem
    return saveBasket (plan)

  $scope.reset = ->
    $scope.plan.total = angular.copy $scope.master
  
  $scope.recalculate = ->
    $scope.plan.total = 0

    x = 0

    while x < $scope.items.length
      $scope.plan.total += $scope.items[x].qty * ($scope.items[x].price + $scope.items[x].upgradeSupplement + $scope.items[x].optionSupplement)
      x++

  $scope.subtract = (item) ->
    if item.qty > 0
      item.qty--
      $scope.recalculate()

  $scope.calculateOptionSupplement = (index, item) ->
    item.optionSupplement = 0
    x = 0
    
    while x < $scope.items.length
      y = 0
      
      while y < $scope.items[x].options.length
        if $scope.items[x].options[y].selected is true
          $scope.items[x].optionSupplement += $scope.items[x].options[y].supplement
        y++
      x++
    
    $scope.recalculate()

  $scope.calculateUpgradeSupplement = (upgrade, item) ->
    item.upgradeSupplement = upgrade.supplement
    $scope.recalculate()

  $scope.add = (item) ->
    item.qty++
    $scope.recalculate()

  $scope.reset()
  $scope.recalculate()
























