clearDefault = (el) ->
  if el.defaultValue is el.value
    el.value = ""
    $("subscribe_btn").removeClassName "disabled"
restoreText = (el) ->
  el.value = el.defaultValue  if el.value is ""