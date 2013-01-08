exports.getAuth = (environment) ->
	api = {}
	if environment is "production"
		api =
			user: "5q77xr3mKN"
			password: "8l90tg3M4c"
	else
		api =
			user: "qzvYxdrEWq"
			password: "kU41vomnyF"

	return api