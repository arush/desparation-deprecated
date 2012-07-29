root = exports ? this
root.shirtsQ = ->
  wipeConsole()
  saveProgress "shirtsQ"
  
  if punter.workShirts or punter.playShirts
    if punter.workShirts
      q = "So you wear shirts for work"
      if punter.playShirts
        q += " and play."
      else
        q += "."
    else if punter.playshirts
      q = "So you wear shirts for play."
    q += "\n\nWhat kind of shirts do you wear? "
  else
    return tees()
  
  # collar type - short, normal, long
  # cuffs - double cuff, single cuff
  # shape - slim, regular
  # sleeve length -
  # brands
  # colors


  newQ q
  typeit()
  s = $j("#male-welcome-msg")
  shirtsImages s
root.shirtsDone = ->
  newQ "All good. Let's save your progress again. "
  typeit()
  setTimeout (->
    insertContinue "emailPrompt(punter.email)", "save progress"
  ), 1500
root.shirtsAa = ->
  punter.shirts = "private jet"
  wipeConsole()
  shirtsDone()
root.shirtsAb = ->
  punter.shirts = "business class"
  wipeConsole()
  shirtsDone()
root.shirtsAc = ->
  punter.shirts = "economy"
  wipeConsole()
  shirtsDone()
root.shirtsAd = ->
  punter.shirts = "bus"
  wipeConsole()
  shirtsDone()