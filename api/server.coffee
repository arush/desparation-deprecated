brandidAuth = require "./custom_modules/brandid/auth"
xmlBodyParser = require "./custom_modules/xmlBodyParser/xmlBodyParser"
express = require "express"

##### MAILCHIMP #####

MailChimpAPI = require("mailchimp").MailChimpAPI

mcApiKey = "dc139a3abdb76130fd9428050e80e9a6-us4"
if process.env.NODE_ENV is "production"
	mcList = "60f76471f7" # LIVE
else
	mcList = "776ea4d634" # DEV

try
  mcapi = new MailChimpAPI(mcApiKey,
    version: "1.3"
    secure: true
  )
catch error
  console.log error.message

##### END MAILCHIMP #####


port = 3000
app = express()
auth = express.basicAuth brandidAuth.http.user, brandidAuth.http.password

app.configure ->
	app.use xmlBodyParser.xmlBodyParser
	app.use express.bodyParser()

app.get '/', (req, res) ->

	# responseData = req.body

	res.contentType "text/html"
	res.send '<h1>No entry for you mofo!</h1>', 200

app.post '/recurly/push', auth, (req, res) ->

	responseData = req.body

	res.contentType "application/json"
	res.send req.body, 200

app.post '/user/new', auth, (req, res) ->

	# make sure this is only called when email address exists

	## refactor into addToMailchimp and addToIntercom
	user = req.body

	if typeof user.email isnt "undefined"

		mergeVars = {}

		if typeof user.gender isnt "undefined"
			mergeVars.GENDER = user.gender

		if typeof user.first_name isnt "undefined"
			mergeVars.FNAME = user.first_name
		
		if typeof user.last_name isnt "undefined"
			mergeVars.LNAME = user.last_name
		
		if typeof user.birthday isnt "undefined"
			mergeVars.DOB = user.birthday
			# format facebook birthday MM/DD/YYYY to mailchimp birthday MM/DD
			# basically first five chars
			mergeVars.BIRTHDAY = user.birthday.substr 0,5
		
		if typeof user.authData isnt "undefined"
			if typeof user.authData.facebook isnt "undefined"
				mergeVars.FBID = user.authData.facebook.id

		if typeof user.objectId isnt "undefined"
			mergeVars.UID = user.objectId

		payload =
			id : mcList
			email_address : user.email
			merge_vars : mergeVars
			email_type : 'html'
			double_optin : false
			update_existing : true
			replace_interests : true
			send_welcome : false

		console.dir payload


		# make the call
		mcapi.listSubscribe payload,
			(error, data) ->
				unless error?
					res.contentType "application/json"
					res.send 200, JSON.stringify data
				else console.log error

app.listen port, ->
	console.log "Listening on #{port}"