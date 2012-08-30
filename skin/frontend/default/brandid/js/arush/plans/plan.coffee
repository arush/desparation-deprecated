# basket = new Object()

root = exports ? this
# root.createBasket = ->
# 	if $j.cookie("basket") isnt null
# 		basket = JSON.parse $j.cookie("basket")

root.saveBasket = (basket) ->
	$j = jQuery.noConflict()
	$j.cookie "basket", JSON.stringify(basket),
		expires: 1
		path: "/"