root = exports ? this

root.recommend = ->
	punter.recommendation = [
		item: 'socks'
		qty: 1
		brandsType: 'value'
	,
		item: 'boxers'
		qty: 1
		brandsType: 'value'
	,
		item: 'tees'
		qty: 1
		brandsType: 'value'
	]

	multiplier = 1
	brandsUpgrade = 'value'

	if punter.roll is 1
		multiplier = 6
		brandsUpgrade = 'premium'
	else if punter.roll is 2
		multiplier = 4
		brandsUpgrade = 'premium'
	else if punter.roll is 3
		multiplier = 2
		brandsUpgrade = 'value'

	# edge cases where they either need loads of tees or barely any
	if punter.workShirts is true and punter.playShirts is true
		teesMultiplier = 0.5
	else if punter.workShirts is false and punter.playShirts is false
		teesMultiplier = 2

	x=0
	while x < punter.recommendation.length
		if punter.recommendation[x].item is 'tees'
			punter.recommendation[x].qty = Math.ceil(punter.recommendation[x].qty*multiplier*teesMultiplier)
		else
			punter.recommendation[x].qty = Math.ceil(punter.recommendation[x].qty*multiplier)
		punter.recommendation[x].brandsType = brandsUpgrade
		x++
	return


root.createResult = ->
	  s = getLatestSpan()
	  $j(s).parent().removeClass('loading-flash')
	  work = ["slick suited", "collar poppin'", "laid-back", "hairy"]
	  play = [" goodfella",", polo-wearing high roller",", tee-wearing rock'n'rolla", " king of rock"]
	  playTwitter = [" goodfella",", polo-wearing high roller",", tee-wearing rockNrolla", " king of rock"]
	  roll = [" that needs a spot to park his jet"," that rolls #LIKEABOSS"," that hates waiting in line"," that's keepin it #lean"]
	  
	  if punter.roll is 1
	  	# 180 > 200
	  	percent = Math.ceil(Math.random()*20)+180
	  else if punter.roll is 2
	  	# 150 > 185
	  	percent = Math.ceil(Math.random()*55)+150
	  else if punter.roll is 3
	  	# 120 > 155
	  	percent = Math.ceil(Math.random()*35)+120
	  else
	  	# 104 > 125
	  	percent = Math.ceil(Math.random()*21)+104

	  wipeConsole()

	  #KISSmetrics
	  _kmq.push ["record", "Activated",
	  	manhood: percent
	  ]
	  
	  tweetLink = 'http://www.getbrandid.com/'

	  maleOutput = 'You are a '
	  tweet = 'I\'m a '
	  

	  if punter.play is 1
	  	maleOutput += 'bonafide, '
	  	tweet += 'bonafide, '

	  maleOutput += work[punter.work-1]+play[punter.play-1]+roll[punter.roll-1]+'. You are '+percent+'% man.'
	  
	  tweet += work[punter.work-1]+playTwitter[punter.play-1]+roll[punter.roll-1]+'. I\'m '+percent+'% man.'
	  fbook = tweet;

	  tweet += ' How man are you? Ask MALE '+tweetLink

	  

	  tweetHref = 'http://twitter.com/home/?status='+ encodeURIComponent(tweet)
	  fbookHref = 'http://www.facebook.com/dialog/feed?
	  					app_id=288271097870534&
	  					link='+tweetLink+'&
	  					picture=http://www.getbrandid.com/brandid-square-big.png&
	  					name='+encodeURIComponent(fbook)+'&
	  					caption='+encodeURIComponent('How man are you? Stop face-stalking for a second and take the M.A.L.E. test')+'&
	  					description='+encodeURIComponent('Brought to you by the fine folks at BRANDiD - Shop. Like a Man.')+'&
	  					redirect_uri=http://www.getbrandid.com/'

	  q = 'M.A.L.E. COMPUTATIONAL OUTPUT:\n\n'

	  newQ(q)
	  typeit()
	  printResult = ->
	  	jqconsole.Write maleOutput, 'jqconsole-output green wordwrap'

	  setTimeout printResult, 1000

	  # shareBut1 = ["smalltext convert", "Share on Twitter<br/><span class=\"button-caption\"></span>", tweetHref]
	  # shareBut2 = ["smalltext convert", "Share on Facebook<br/><span class=\"button-caption\"></span>", tweetHref]
	  # buttons = [shareBut1,shareBut2]
	  setTimeout (->
	    # insertButtons buttons, "#male-welcome-msg"
	    insertShare("twitter",tweetHref);
	    insertShare("facebook",fbookHref);
	    insertContinue("window.location = '/mens-clothing.html'","show me my recommended plan");
	  ), 3500