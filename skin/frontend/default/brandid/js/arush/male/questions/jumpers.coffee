root = exports ? this
root.maleJumpersHoodiesQ = ->
  wipeConsole()
  saveProgress "maleJumpersHoodiesQ"
  q = "I've hacked the Hubble Telescope and am pointing it towards Earth. I can see a storm system over New York, a neglected helium balloon with a Red Bull logo, and boy is it going to be cold in the UK this winter. \n\nLooks like you'll need something warm. Do you want a jumper or a hoodie? "
  newQ q
  typeit()

  jumperBut1 = ["smalltext convert", "Jumper<br/><span class=\"button-caption\">A hoodie won't match my shirts</span>", "maleJumpersHoodiesAa()"]
  jumperBut2 = ["smalltext convert", "Hoodie<br/><span class=\"button-caption\">Two words: Mark. Zuckerberg.</span>", "maleJumpersHoodiesAb()"]
  buttons = [jumperBut1,jumperBut2]
  setTimeout (->
    insertButtons buttons, "#male-welcome-msg"
  ), 3500

root.maleJumpersHoodiesDone = ->
  _kmq.push ["record", "MALE Jumpers Hoodies",
    jumpersHoodies: punter.jumpersHoodiesA
  ]
  mixpanel.track "MALE Jumpers or Hoodies",
    jumpersHoodies: punter.jumpersHoodiesA
  
  maleJumpersPriceQ()
root.maleJumpersHoodiesAa = ->
  punter.jumpersHoodiesA = 'Jumpers'
  maleJumpersHoodiesDone()
root.maleJumpersHoodiesAb = ->
  punter.jumpersHoodiesA = 'Hoodies'
  maleJumpersHoodiesDone()


# Price

root.maleJumpersPriceQ = ->
  wipeConsole()
  saveProgress "maleJumpersPriceQ"
  q = "How much do you want to spend? "
  newQ q
  typeit()

  jumperBut1 = ["smalltext convert", "£30<br/><span class=\"button-caption\">Value brands, lighter material</span>", "maleJumpersPriceAa()"]
  jumperBut2 = ["smalltext convert", "£80<br/><span class=\"button-caption\">Premium brands, heavier and warmer</span>", "maleJumpersPriceAb()"]
  buttons = [jumperBut1,jumperBut2]
  setTimeout (->
    insertButtons buttons, "#male-welcome-msg"
  ), 1500

root.maleJumpersPriceDone = ->
  _kmq.push ["record", "MALE Jumpers Price",
    jumpersPrice: punter.jumpersPriceA
  ]
  mixpanel.track "MALE Jumpers Price",
    jumpersPrice: punter.jumpersPriceA

  maleJumpersBrandsQ()
root.maleJumpersPriceAa = ->
  punter.jumpersPriceA = 'value'
  maleJumpersPriceDone()
root.maleJumpersPriceAb = ->
  punter.jumpersPriceA = 'premium'
  maleJumpersPriceDone()

# Brands

root.maleJumpersBrandsQ = ->
  wipeConsole()
  saveProgress "maleJumpersBrandsQ"
  q = "Complete the sentence:\n\nI want my "+punter.jumpersHoodiesA.toLowerCase()+" from brands or shops like ___________ "
  newQ q
  typeit()

  jumperBut1 = ["smalltext convert secondary", "I don't care<br/><span class=\"button-caption\">We'll call you after checkout anyway</span>", "maleJumpersBrandsAa()"]
  # jumperBut2 = ["smalltext convert", "£80<br/><span class=\"button-caption\">Premium brands, heavier and warmer</span>", "maleJumpersBrandsAb()"]
  buttons = [jumperBut1]
  insertBrandsField()
  # setTimeout (->
    
  #   # insertButtons buttons, "#male-welcome-msg"
    
  # ), 1500

root.maleJumpersBrandsDone = ->
  maleJumpersFinishedQ()
