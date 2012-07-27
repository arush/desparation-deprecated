root = exports ? this
root.giftQ = ->
  wipeConsole()
  saveProgress "giftQ"
  q = "You must be looking to buy a gift for a very lucky man. But do you just want to gift a one-off taster, or set him up with a full recurring plan? "
  newQ q
  typeit()

  giftBut1 = ["smalltext convert", "Gift a taster<br/><span class=\"button-caption\">Buy him a 1, 3 or 12 month taster</span>", "giftAa()"]
  giftBut2 = ["smalltext convert", "Impersonate your man<br/><span class=\"button-caption\">Set up a recurring plan on his behalf</span>", "giftAb()"]
  buttons = [giftBut1,giftBut2]
  setTimeout (->
    insertButtons buttons, "#male-welcome-msg"
  ), 3500

root.giftAa = ->
  punter.gift = "gifter"
  wipeConsole()
  newQ "I wish I had a fembot like you.\n\nThe link below will take you to the gift page. If you don't like what you see, just use your browser's back button to continue M.A.L.E.™ where you left off. "
  typeit()
  setTimeout (->
    insertContinue "window.location('/keep/calm/getgifted');"
  ), 2000
root.giftAb = ->
  punter.gift = "impersonator"
  wipeConsole()
  newQ "I know, I know, your man is too lazy to do this himself. What would he do without you.\n\nLet's continue the questions pretending you're him... "
  typeit()
  setTimeout (->
  	insertContinue "workQ()"
  ), 2000