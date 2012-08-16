root = exports ? this
root.finalSave = ->
  wipeConsole()
  recommend()
  saveProgress "finalSave"
  punter.goAfterSave = "finalSave"
  
  
  
  answers =
    work: punter.work
    play: punter.play
    roll: punter.roll
    progress: punter.progress
    mags: punter.mags
    tv: punter.tv

  punter.maleAnswers = JSON.stringify(answers);
  # asynchronously save the user
  q = 'I\'ll be adding more questions soon, but that\'s all I need right now to recommend you a plan. '
  newQ(q)
  typeit()

  jqconsole.Write 'Computing manhood percentage...  ', 'jqconsole-output loading-flash wordwrap'
  typeit()

  setTimeout ->
  	finalRegister()
  ,1000
  

  setTimeout ->
  	replaceText 0
  , 4000

root.replaceText = (num) ->
  
  shareCallback = -> replaceText num
  

  msg = ['Please bear with me... ', 'I\'m M.A.L.E., I can only do one thing at a time... ']
  s = getLatestSpan()
  $j(s).text(msg[num])
  num++
  typeit()
  
  if num < msg.length and $j(s).text() is msg[num-1] # this is a check to make sure the finalRegister function hasn't changed the span text already
  	console.log($j(s).text()+'\n'+msg[num-1])
  	setTimeout ->
  		replaceText num
  	, 2500
  else
  	return