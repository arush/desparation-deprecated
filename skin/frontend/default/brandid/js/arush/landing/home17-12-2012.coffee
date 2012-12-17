# ensure this is included after jquery
root = exports ? this


root.TwitterController = ($scope,$http) ->

	$scope.tweetCount = 0
	$scope.scrollByNumTweets = 6

	$scope.allTweets = []
	$scope.favourites = []
	$scope.displayTweets = [
		created_at_1: "One fine Wednesday evening"
		created_at_2: "in November"
		text: "Got a little extra touch this month from @BRANDiD in touch screen gloves as well as me Knickers & Stockins http://t.co/2tEvPzmt"
		user:
			screen_name: "RDRB26"
			profile_image_url_https: "https://si0.twimg.com/profile_images/2912023785/5ad786af7826794f6d0f6f38b0a5529c_bigger.jpeg"
		media_url_https: "https://pbs.twimg.com/media/A8z9PjcCEAInIY0.jpg"
	,
		created_at_1: "A crisp Monday morning"
		created_at_2: "in December"
		text: "My best purchase in 2012? This amazing hoodie. Best value for money! I just got @BRANDiD . Go on winter, try me."
		user:
			screen_name: "lucegary"
			profile_image_url_https: "https://si0.twimg.com/profile_images/2455057810/k4toydz555vo366f9l5v_normal.jpeg"
		media_url_https: "https://pbs.twimg.com/media/A9_nmSJCcAAr9QS.jpg"
	,
		created_at_1: "One fine Saturday evening"
		created_at_2: "in November"
		text: "Had my second delivery from @BRANDiD and this was inside. Amazing! Thanks guys. You're the best! http://t.co/sp4B6oKX"
		user:
			screen_name: "craigmdennis"
			profile_image_url_https: "https://si0.twimg.com/profile_images/2914319457/a7604c20568dda0b315ba0340841fc95_bigger.png"
		media_url_https: "https://pbs.twimg.com/media/A8eFjSuCAAEUwtb.jpg"
	]

	$scope.convertTweetToDisplayableTweet = (tweet) ->
		tweetToReturn = {}
		
		# create a moment. Requires the moment.js library

		moment1 = moment tweet["created_at"]

		# returns "am" or "pm"
		morning = moment1.format "a"

		if morning is "am"
			tweetToReturn.created_at_1 = "A crisp " + moment1.format("dddd") + " morning"
			tweetToReturn.created_at_2 = "in " + moment1.format("MMMM")
		else
			tweetToReturn.created_at_1 = "One fine " + moment1.format("dddd") + " evening"
			tweetToReturn.created_at_2 = "in " + moment1.format("MMMM")

		tweetToReturn.text = tweet["text"]

		# user attributes
		tweetToReturn.user = {}
		tweetToReturn.user.screen_name = tweet["user"]["screen_name"]
		tweetToReturn.user.profile_image_url_https = tweet["user"]["profile_image_url_https"].replace "normal","bigger"


		tweetToReturn.media = false
		# media attributes
		if tweet["media"]?[0]?["media_url_https"]?
			tweetToReturn.media = []
			tweetToReturn.media_url_https = tweet["media"][0]["media_url_https"]

		return tweetToReturn

	# wrapper to get tweets, returns false on error
	$scope.retrieveMoreTweets = (maxTweets) ->
		$http(
	  		method: "GET"
	  		url: "/ajax/twitter/favourites.json"
		).success((data, status, headers, config) ->
			
			# remove loading gif
			$scope.allTweets = data
			
			# need a -1 here because of the <= instead of the < in the coffeescript for loop
			$scope.getNext maxTweets


		).error (data, status, headers, config) ->
			# TODO: implement error handling and replace loading text
			$scope.allTweets = false

	$scope.getNext = (maxTweets) ->
		
		# recursive function that has a hook to retrieve more tweets
		
		if typeof $scope.allTweets[0] is "undefined"

			# this is the genius right here
			# call retrieveMoreTweets with recursive callback
			$scope.retrieveMoreTweets maxTweets
			return
		else if $scope.tweetCount >= $scope.allTweets.length
			# this stops the button from causing js errors when there are no more tweets
		  return
		else
			# if its the first time, get the json of tweets first
			# if tweetCount is 0
			for x in [$scope.tweetCount...$scope.tweetCount+maxTweets]
				
				displayableTweet = $scope.convertTweetToDisplayableTweet $scope.allTweets[x]

				$scope.displayTweets.push displayableTweet

				$scope.tweetCount++

			return $scope.displayTweets


TwitterController.$inject = ["$scope", "$http"]
