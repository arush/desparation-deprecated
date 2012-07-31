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
  newQ "All good. Let's save your progress again. "
  typeit()
  insertContinue "shirtsQ()", "continue"
root.rollAa = ->
  punter.roll = "private jet"
  wipeConsole()
  rollDone()
root.rollAb = ->
  punter.roll = "business class"
  wipeConsole()
  rollDone()
root.rollAc = ->
  punter.roll = "economy"
  wipeConsole()
  rollDone()
root.rollAd = ->
  punter.roll = "bus"
  wipeConsole()
  rollDone()