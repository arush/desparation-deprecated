
xmlBodyParser = require 'custom_modules/xmlBodyParser/xmlBodyParser'
express = require 'express'

port = 3000
app = express()
auth = express.basicAuth 'yourmom', 'p4ssw0rd'

app.configure ->
	app.use xmlBodyParser.xmlBodyParser

app.post '/', auth, (req, res) ->
	# responseData = '<?xml version="1.0" encoding="UTF-8"?><successful_payment_notification><account><account_code>4012</account_code><username nil="true"></username><email>avioads@getbrandid.com</email><first_name>arush</first_name><last_name>sehgal</last_name><company_name></company_name></account><transaction><id>1d4790efedd752a4bbbefa4546998505</id><invoice_id>1d4790d43387100cb8f12845b89bff89</invoice_id><invoice_number type="integer">1264</invoice_number><subscription_id>1ac3d5d8f58456ee1023354cccb1e815</subscription_id><action>purchase</action><date type="datetime">2012-12-26T19:52:12Z</date><amount_in_cents type="integer">3900</amount_in_cents><status>success</status><message>Successful test transaction</message><reference>5961373</reference><source>subscription</source><cvv_result code=""></cvv_result><avs_result code="D">Street address and postal code match.</avs_result><avs_result_street nil="true"></avs_result_street><avs_result_postal nil="true"></avs_result_postal><test type="boolean">true</test><voidable type="boolean">true</voidable><refundable type="boolean">true</refundable></transaction></successful_payment_notification>';
	# responseData = ""

	responseData = req.body

	# cleanedString = req.body.Replace("\ufeff", "");

	console.dir req.body

	res.contentType "application/json"
	res.send req.body, 200


	# parser.parseString responseData, (err, result) ->
	# 	console.log err

	# 	result = JSON.stringify result

	# 	res.contentType "application/json"
	# 	res.send result, 200
 
app.listen port, ->
	console.log "Listening on #{port}"