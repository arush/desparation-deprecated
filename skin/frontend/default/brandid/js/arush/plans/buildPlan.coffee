# retrieve the punter from cookie

root = exports ? this
root.buildPlan = ($scope) ->
  
  #debug
  $scope.alert = (text) ->
    alert text

  genericColours = [
    text: "classic"
    filterCode: ".classic"
    summary: "classic"
    buttonId: "classic"
  ,
    text: "disco"
    filterCode: ".disco"
    summary: "disco"
    buttonId: "disco"
  ,
    text: "both"
    #filterCode: ".classic, .disco"
    filterCode: ""
    summary: "mix of classic and disco"
    buttonId: "both"
  ]
  
  sockOptions = []

  boxerOptions = [
    text: "trunks"
    buttonId: "boxer-trunks"
    filterCode: ".trunks"
    summary: "boxer trunks"
    supplement: 0
  ,
    text: "shorts"
    buttonId: "boxer-shorts"
    filterCode: ".shorts"
    summary: "boxer shorts"
    supplement: 0
  ,
    text: "both"
    # filterCode: ".trunks, .shorts"
    filterCode: ""
    summary: "mix of trunks and shorts"
    buttonId: "both"
    supplement: 0
  ]

  teeOptions = [
    text: "crew neck"
    buttonId: "crew-neck"
    filterCode: ".crew"
    summary: "crew necks only"
    supplement: 0
  ,
    text: "v-neck"
    buttonId: "v-neck"
    filterCode: ".v-neck"
    summary: "v-necks only"
    supplement: 0
  ,
    text: "both"
    # filterCode: ".v-neck, .crew"
    filterCode: ""
    summary: "mix of v-necks and crews"
    buttonId: "both"
    supplement: 0
  ]

  # shirtOptions = [
  #   text: "short collar"
  #   buttonId: "short-collar"
  #   selected: false
  #   supplement: 0
  # ,
  #   text: "double cuff"
  #   buttonId: "double-cuff"
  #   selected: false
  #   supplement: 0
  # ,
  #   text: "slim fit"
  #   buttonId: "slim-fit"
  #   selected: false
  #   supplement: 0
  # ,
  #   text: "straight fit"
  #   buttonId: "straight-fit"
  #   selected: false
  #   supplement: 0
  # ,
  #   text: "no pocket"
  #   buttonId: "no-pocket"
  #   selected: false
  #   supplement: 0
  # ]

  #code and price MUST match recurly add-on code
  sockUpgrades = [
    value: "value"
    recurlyCode: "option-08-v-socks"
    supplement: 0
  ,
    value: "premium"
    recurlyCode: "option-10-d-socks"
    supplement: 5 # on top of the value price
  ]

  boxerUpgrades = [
    value: "value"
    recurlyCode: "option-18-v-boxers"
    supplement: 0
  ,
    value: "premium"
    recurlyCode: "option-20-d-boxers"
    supplement: 7 # on top of the value price
  ]

  underteeUpgrades = [
    value: "value"
    recurlyCode: "option-28-v-undertees"
    supplement: 0
  ,
    value: "premium"
    recurlyCode: "option-30-d-undertees"
    supplement: 15 # on top of the value price
  ]

  sockSizes = [
    text: "6-11 (UK)"
    helper: "40-45 (EU)"
    class:'small'
  ,
    text: "12-14 (UK)"
    helper: "46-48 (EU)"
    class:'large'
  ]

  boxerSizes = [
    text: "S"
    helper: "28in - 30in waist"
    class:'S'
  ,  
    text: "M"
    helper: "32in - 34in waist"
    class:'M'
  ,
    text: "L"
    helper: "36in - 38in waist"
    class:'L'
  ,
    text: "XL"
    helper: "40in - 42in waist"
    class:'XL'
  ]

  underteeSizes = [
    text: "S"
    helper: "36-38in or 91-96cm around the fullest part of your chest"
    class:'S'
  ,
    text: "M"
    helper: "38-40in or 96-101cm around the fullest part of your chest"
    class:'M'
  ,
    text: "L"
    helper: "40-42in or 101cm-106cm around the fullest part of your chest"
    class:'L'
  ,
    text: "XL"
    helper: "42-44in or 106-111cm around the fullest part of your chest"
    class:'XL'
  # ,
  #   text: "XXL"
  #   helper: "55cm - 56cm chest"
  ]

  # shirtUpgrades = [
  #   value: "Tier 1"
  #   supplement: 0
  # ,
  #   value: "Tier 2"
  #   supplement: 25
  # ,
  #   value: "Tier 3"
  #   supplement: 75
  # ]

  $scope.sizeGuide = [
    helper: "What's your sock size? Click on a size to see its guide"
  ,
    helper: "What's your boxer size? Click on a size to see its guide"
  ,
    helper: "What's your tee size? Click on a size to see its guide"
  ]

  $scope.addMessage = [
    text: 'socks'
    chosenPhrase: 0
    phrases: ["Go on, add some socks, think of those poor little naked toes.", "Just because you can't see the holes, doesn't mean they're not there."]
  ,
    text: 'boxers'
    chosenPhrase: 0
    phrases: ["Are you sure you don't want any? What if you get lucky?", "I got two words for ya buddy: skid marks.", "You must have a draw full of fresh undies. Yeah, sure you do."]
  ,
    text: 'undertees'
    chosenPhrase: 0
    phrases: ["No tees? Topless it is, then."]
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

  $scope.master = {}
  
  
  #this array must mirror $scope.items because when looping through with an index, we assume index is the same for $scope.items too
  $scope.itemOptions = [
    colours: genericColours
    options: sockOptions
  ,
    colours: genericColours
    options: boxerOptions
  ,
    colours: genericColours
    options: teeOptions
  ]

  
  $scope.items = [
    recurlyCode: "option-8-v-socks" #NB this should never be read as the default value, must always be initialised
    text: "socks"
    qty: 1
    price: 3
    size: 'Choose a size'
    chosenColour: 'Choose a colour'
    colourSummary: 'Choose a colour'
    optionSupplement: 0
    upgradeSupplement: 0
    upgrades: sockUpgrades
    sizes: sockSizes
  ,
    recurlyCode: "option-18-v-boxers"
    text: "boxers"
    qty: 0
    price: 5
    size: 'Choose a size'
    colourSummary: 'Choose a colour'
    chosenColour: 'Choose a colour'
    optionSummary: 'Choose a style'
    chosenOptions: 'Choose a style'
    optionSupplement: 0
    upgradeSupplement: 0
    upgrades: boxerUpgrades
    sizes: boxerSizes
  ,
    recurlyCode: "option-28-v-undertees"
    text: "undertees"
    qty: 0
    price: 15
    size: 'Choose a size'
    chosenColour: 'Choose a colour'
    chosenOptions: 'Choose a style'
    colourSummary: 'Choose a colour'
    optionSummary: 'Choose a style'
    optionSupplement: 0
    upgradeSupplement: 0
    upgrades: underteeUpgrades
    sizes: underteeSizes
  # ,
  #   code: "option-30-undertees"
  #   text: "socks"
  #   qty: 1
  #   price: 25
  #   size: false
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
        recurlyCode: $scope.items[x].recurlyCode
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
    $scope.update()
    
    return
  
  $scope.updateMageFrequency = ->

    $j("#product-options-wrapper select").each (index) ->
      e = $j(this)
      dropId = e.attr 'id'
      str = e.parent().parent().prev().find('label').text()
      if str is "option-frequency" or str.indexOf("option-frequency")>=0
        optionSelector = 'option:contains("'+$scope.plan.frequency+'")'
        $j('#'+dropId+' '+optionSelector).attr "selected", "selected"

        # tell magento the dropdown has changed
        document.getElementById(dropId).onchange()
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

  $scope.updateMageQty = (text, qty, brands) ->
    
    # find all dropdown selectable options built by magento
    $j("#product-options-wrapper select").each (index) ->
      # get this dropdown's label and check if it is one we want to process
      e = $j(this)
      str = e.parent().parent().prev().find('label').text()
      str = str.split('-')
      
      # the str array should be something like ["option","socks","value"]
      # must also check if we need to affect the value or premium option, then set the other to 0

      if str[0] is "option" # be careful the option is not 'required' in magento, otherwise 'option' will not match '*option'

        itemText = str[1] # should be 'socks' or 'boxers' or whatever
        
        if itemText is text

          #great! we've found both the 'premium' and 'value' qty dropdowns, now act on the correct one and set the other to 0
          if str[2] is brands # this line checks for the brands parameter "value" or "premium"
            
            # select the option index corresponding to current qty
            e.find("option").eq(qty).attr "selected", "selected"
            # trigger dropdown onchange event to update magento price
            dropId = e.attr 'id'
            document.getElementById(dropId).onchange()
            
            # this if/else block needs to execute exactly twice, so it has been found once
            drop1Found = true

          else
            # set the other dropdown qty to 0
            e.find("option").eq(0).attr "selected", "selected"
            # trigger dropdown onchange event to update magento price
            dropId = e.attr 'id'
            document.getElementById(dropId).onchange()
            
            # this if/else block needs to execute exactly twice, so it has been found once
            drop2Found = true

          if drop1Found and drop2Found
            # break out of the .each() function, we've processed both "value" and "branded" dropdowns
            return false
    return

  $scope.subtract = (item, idx) ->
    if item.qty > 0
      item.qty--
      $scope.recalculate()
      
      # if we have just turned qty to 0, bring up a new message
      if item.qty is 0
        $scope.chooseAddMessage(idx)

      # must detect if this is value or premium brands so price can be calculated accordingly
      if item.upgradeSupplement is 0
        brands = 'value'
      else
        brands = 'premium'

      $scope.updateMageQty item.text,item.qty, brands

  $scope.calculateOptionSupplement = (index, item, idx) ->
    $scope.items[idx].optionSupplement = 0
    x = 0
    
    while x < $scope.items.length
      y = 0
      
      while y < $scope.itemOptions[x].options.length
        if $scope.itemOptions[x].options[y].selected is true
          $scope.items[x].optionSupplement += $scope.itemOptions[x].options[y].supplement
        y++
      x++
    
    $scope.recalculate()

  $scope.calculateUpgradeSupplement = (upgrade, item, idx) ->
    $scope.items[idx].upgradeSupplement = upgrade.supplement
    $scope.items[idx].recurlyCode = upgrade.recurlyCode
    
    $j('.upgrade-chooser.item-'+idx+' a').removeClass 'active'
    $j('.upgrade-chooser.item-'+idx+' a.'+item.text+'-'+upgrade.value).addClass 'active'
    
    # update value / premium quantity dropdown
    $scope.updateMageQty(item.text,item.qty,upgrade.value)

    $scope.recalculate()

  $scope.add = (item) ->
    item.qty++
    $scope.recalculate()

    # must detect if this is value or premium brands so price can be calculated accordingly
    if item.upgradeSupplement is 0
      brands = 'value'
    else
      brands = 'premium'

    $scope.updateMageQty item.text,item.qty,brands 


  # $scope.toggleCustomOption = (index, $index, idx) ->
  #   # toggle the option
  #   if $scope.itemOptions[idx].options[$index].selected is true
  #     $scope.itemOptions[idx].options[$index].selected = false
  #   else
  #     $scope.itemOptions[idx].options[$index].selected = true

  #   $j('.'+'-'+$scope.items[idx]+'-'+index.buttonId).toggleClass 'true'

  #   $scope.items[idx].chosenOptions = ''
    
  #   x=0
  #   while x < $scope.itemOptions[idx].options.length
  #     if $scope.itemOptions[idx].options[x].selected is true
  #       # do not want to add comma on first chosen option
  #       if $scope.items[idx].chosenOptions isnt ''
  #         $scope.items[idx].chosenOptions += ', '
  #       $scope.items[idx].chosenOptions += $scope.itemOptions[idx].options[x].filterCode;
  #     x++
  #   $scope.recalculate()
  #   $scope.refilter idx
  #   #don't forget to set it to false if nothing selected

  $scope.toggleColour = (index, idx) ->
    
    $scope.items[idx].chosenColour = index.filterCode
    $scope.items[idx].colourSummary = index.summary

    #this acts like a radio button, so remove all active classes, then enable the clicked one
    $j('.'+$scope.items[idx].text+'.colours a').removeClass 'active'
    $j('.'+$scope.items[idx].text+'-colours-'+index.buttonId).toggleClass 'active'
    $scope.recalculate()
    $scope.refilter idx

  $scope.toggleStyle = (index, idx) ->
    $scope.items[idx].chosenOptions = index.filterCode
    $scope.items[idx].optionSummary = index.summary

    #this acts like a radio button, so remove all active classes, then enable the clicked one
    $j('.'+$scope.items[idx].text+'.style a').removeClass 'active'
    $j('.'+$scope.items[idx].text+'-style-'+index.buttonId).toggleClass 'active'
    $scope.recalculate()
    $scope.refilter idx

  $scope.refilter = (idx) ->
    if $isocontainer is undefined
      $isocontainer = $j '#'+$scope.items[idx].text+'-section-container .isotope-holder'
    
    # build filter string
    filterString = ''
    # 1. if colour exists, get colour for this item
    if $scope.items[idx].chosenColour isnt undefined
      if $scope.items[idx].chosenColour.toLowerCase().indexOf('choose') < 0
        filterString += $scope.items[idx].chosenColour #this contains the filterCode, so no need to format
    # 2. if options exist, get options
    if $scope.items[idx].chosenOptions isnt undefined
      if $scope.items[idx].chosenOptions.toLowerCase().indexOf('choose') < 0
        filterString += $scope.items[idx].chosenOptions #this adds with no space (AND filter)
    
    $isocontainer.isotope filter: filterString

  $scope.groupButtons = (idx, buttons) ->
    if idx is 0
      return 'lt'
    else if idx+1 is buttons.length
      return 'rt'
    else
      return 'mid'

  $scope.changeSize = (item, size, idx, $index) ->
    $scope.items[idx].size = size.text
    $scope.sizeGuide[idx].helper = $scope.items[idx].sizes[$index].helper
    $scope.recalculate()

    # change button formatting to active
    $j('.configure-size.'+item.text+'-size a').removeClass 'active'
    $j('.'+item.text+'-'+size.class).addClass 'active'

  $scope.isZeroed = (idx) ->
    if $scope.items[idx].qty is 0
      return 'zeroed'
    else
      return 'non-zero'

  $scope.chooseAddMessage = (idx) ->
    # choose a random 'add some socks mate' message for idx element in the $scope.addMessage object
    randomisedNum = Math.floor(Math.random() * $scope.addMessage[idx].phrases.length)
    $scope.addMessage[idx].chosenPhrase = $scope.addMessage[idx].phrases[randomisedNum]

  $scope.prettifySummary = (thing) ->
    if thing.toLowerCase().indexOf('choose') >= 0
      return 'warning'
    else
      return 'ok'

  $scope.init = ->
    $j = jQuery.noConflict()


    # receive cookie and set $scope.items values
    


    # take $scope.items values and set angular inputs
    x = 0
    while x < $scope.items.length
      o = $scope.items[x]

      # inject cookie data from M.A.L.E, otherwise use defaults
      if punter.recommendation isnt undefined
        if punter.recommendation[x].brandsType isnt undefined
          brandType = punter.recommendation[x].brandsType
        # update quantities
        if punter.recommendation[x].qty isnt undefined
          o.qty = punter.recommendation[x].qty
      else
        if o.recurlyCode.indexOf("-v-",0)>= 0
          brandType = 'value'
        else
          brandType = 'premium'
      
      
      $scope.updateMageQty(o.text, o.qty, brandType)
      
      # update value / premium
      $j('.'+$scope.items[x].text+'-'+brandType).click()

      # update colours
      # if o.chosenColour.indexOf("Choose",0)<= 0
      #   if o.chosenColour.indexOf("classic")>=0
      #     colour = 'classic'
      #     if o.chosenColour.indexOf("disco")>=0
      #       colour = 'both'
      #   else
      #     colour = 'disco'
      # else
      #   colour = ''


      # update frequency
      $scope.freqChanger($scope.plan.frequency)

      # have to delay this to wait for isotope
      # NOT WORKING RIGHT NOW!
      # setTimeout $j('.'+$scope.items[x].text+'-'+colour).click(), 5000
      
      # init motivational message when page loads with zero as default quantity
      # can't really understand why I need a +1 here, but it doesn't work otherwise!
      $scope.chooseAddMessage(x+1);

      x++
    # set mage dropdowns etc...



    $scope.recalculate()
    $scope.update()
    x = 0
    while x < $scope.addMessage.length
      $scope.chooseAddMessage(x)
      x++
    # set mage dropdowns

    # set custom option checkmarks
  # initiate
  $j(document).ready ->
    $scope.init()





















