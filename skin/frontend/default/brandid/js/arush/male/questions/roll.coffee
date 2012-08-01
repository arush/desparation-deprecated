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
  shareQ()
root.rollAa = ->
  punter.roll = 1
  punter.rollA = 'private jet'
  rollDone()
root.rollAb = ->
  punter.roll = 2
  punter.rollA = 'business class'
  rollDone()
root.rollAc = ->
  punter.roll = 3
  punter.rollA = 'economy'
  rollDone()
root.rollAd = ->
  punter.roll = 4
  punter.rollA = 'bus'
  rollDone()