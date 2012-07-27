root = exports ? this
root.rollQ = ->
  wipeConsole()
  saveProgress "rollQ"
  q = "How do you roll? "
  newQ q
  typeit()
  s = $j("#male-welcome-msg")
  rollImages s
root.rollDone = ->
  newQ "Got it. "
  typeit()
  setTimeout (->
    insertContinue "rollQ()"
  ), 500
root.rollAa = ->
  punter.roll = "shirts"
  wipeConsole()
  rollDone
root.rollAb = ->
  punter.roll = "polos"
  wipeConsole()
  rollDone
root.rollAc = ->
  punter.roll = "tees"
  wipeConsole()
  rollDone
root.rollAd = ->
  punter.roll = "elvis"
  wipeConsole()
  rollDone