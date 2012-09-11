# retrieve the punter from cookie
punter = new Object()
createPunter()

root = exports ? this
root.buildPlan = ($scope) ->
  sockOptions = [
    text: "classic"
    buttonId: "classic"
    selected: false
    supplement: 0
  ,
    text: "disco"
    buttonId: "disco"
    selected: false
    supplement: 0
  ]
  
  boxerOptions = [
    text: "classic"
    buttonId: "classic"
    selected: false
    supplement: 0
  ,
    text: "disco"
    buttonId: "disco"
    selected: false
    supplement: 0
  ,
    text: "boxer shorts"
    buttonId: "boxer-shorts"
    selected: false
    supplement: 0
  ,
    text: "boxer trunks"
    buttonId: "boxer-trunks"
    selected: false
    supplement: 0
  ,
    text: "briefs"
    buttonId: "briefs"
    selected: false
    supplement: 0
  ]

  teeOptions = [
    text: "crew neck"
    buttonId: "crew-neck"
    selected: false
    supplement: 0
  ,
    text: "v-neck"
    buttonId: "v-neck"
    selected: false
    supplement: 0
  ,
    text: "white"
    buttonId: "white"
    selected: false
    supplement: 0
  ,
    text: "black"
    buttonId: "black"
    selected: false
    supplement: 0
  ,
    text: "coloured"
    buttonId: "coloured"
    selected: false
    supplement: 0
  ]

  shirtOptions = [
    text: "short collar"
    buttonId: "short-collar"
    selected: false
    supplement: 0
  ,
    text: "double cuff"
    buttonId: "double-cuff"
    selected: false
    supplement: 0
  ,
    text: "slim fit"
    buttonId: "slim-fit"
    selected: false
    supplement: 0
  ,
    text: "straight fit"
    buttonId: "straight-fit"
    selected: false
    supplement: 0
  ,
    text: "no pocket"
    buttonId: "no-pocket"
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

  $scope.plan = {
    frequency: "trial"
  }
  
  $scope.drops = [
    value:"trial"
  ,
    value:"quarterly"
  ,
    value:"biannually"
  ]

  $scope.brands = [
    value: "UNBRANDiD"
    supplement: 0
  ,
    value: "designer"
    supplement: 20
  ]

  $scope.master = {}
  
  #code and price MUST match recurly add-on code
  $scope.items = [
    code: "option-10-socks"
    text: "socks"
    qty: 0
    price: 5
    optionSupplement: 0
    upgradeSupplement: 0
    options: sockOptions
  ,
    code: "option-20-boxers"
    text: "boxers"
    qty: 1
    price: 10
    optionSupplement: 0
    upgradeSupplement: 0
    options: boxerOptions
  ,
    code: "option-30-undertees"
    text: "undertees"
    qty: 0
    price: 30
    optionSupplement: 0
    upgradeSupplement: 0
    options: teeOptions
  # ,
  #   code: "option-30-undertees"
  #   text: "socks"
  #   qty: 1
  #   price: 25
  #   optionSupplement: 0
  #   upgradeSupplement: 0
  #   options: shirtOptions
  #   upgrades: shirtUpgrades
  ]

  $scope.update = ->
    x = 0
    basketItem = []
    while x < $scope.items.length
      basketItem[x] = {
        code: $scope.items[x].code
        qty: $scope.items[x].qty
      }
      x++
    $scope.plan.basket = basketItem
    $scope.updateMageFrequency()
    # put basket in cookie
    return saveBasket ($scope.plan)

  $scope.freqChanger = (newFreq) ->
    $j('.frequency-chooser a').removeClass 'active'
    $j('#'+newFreq+'-button').addClass 'active'
    $scope.plan.frequency = newFreq
    
    $scope.update()


  $scope.recalculate = ->
    $scope.plan.total = 0

    x = 0

    while x < $scope.items.length
      $scope.plan.total += $scope.items[x].qty * ($scope.items[x].price + $scope.items[x].upgradeSupplement + $scope.items[x].optionSupplement)
      x++
    $scope.updateMageOptions()
    
    return
  
  $scope.updateMageFrequency = ->

    $j("#product-options-wrapper select").each (index) ->
      e = $j(this)
      dropId = e.attr 'id'
      str = e.parent().parent().prev().find('label').text()
      if str.indexOf("option-frequency")> 0
        optionSelector = 'option:contains("'+$scope.plan.frequency+'")'
        $j('#'+dropId+' '+optionSelector).attr "selected", "selected"
        # break out of the .each() function, save processor
        return false
    return

  $scope.updateMageOptions = ->
    # assuming there's only gonna be 1 textarea on the plan page
    $j("#product-options-wrapper textarea").each (index) ->
      e = $j(this)
      str = e.parent().parent().prev().find('label').text()
      if str is "options-json"
        e.text(JSON.stringify($scope.items))
        # break out of the .each() function, save processor
        return false
    return

  $scope.updateMageQty = (text, qty) ->
    
    # find all dropdown selectable options built by magento
    $j("#product-options-wrapper select").each (index) ->
      # get this dropdown's label and check if it is one we want to process
      e = $j(this)
      str = e.parent().parent().prev().find('label').text()
      str = str.split('-')
      if str[0] is "option"
        itemText = str[1] # should be 'socks' or 'boxers' or whatever
        if itemText is text
          # select the option index corresponding to current qty
          e.find("option").eq(qty).attr "selected", "selected"
          # trigger dropdown onchange event to update magento price
          dropId = e.attr 'id'
          document.getElementById(dropId).onchange()
          # break out of the .each() function, save processor
          return false
    return

  $scope.subtract = (item) ->
    if item.qty > 0
      item.qty--
      $scope.recalculate()
      $scope.updateMageQty item.text,item.qty

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
    $scope.updateMageQty item.text,item.qty


  $scope.toggleCustomOption = (index, item) ->
    index.selected = !index.selected
    $j('#'+'-'+item.text+'-'+index.buttonId).toggleClass 'active'
    $scope.refilter item


  $scope.buildFilterString = (item) ->
    x = 0
    filterString = '.proxy '

    while x < item.options.length
      if item.options[x].selected is true
        filterString += ', .' + item.options[x].buttonId
      x++

    return filterString


  $scope.refilter = (item) ->
    if $isocontainer is undefined
      $isocontainer = $j '#socks-section-container .isotope-holder'
      filterString = $scope.buildFilterString item

      $isocontainer.isotope filter: filterString


  $scope.recalculate()
  $scope.update()























