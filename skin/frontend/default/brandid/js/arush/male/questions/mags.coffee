root = exports ? this
root.magsQ = ->
  wipeConsole()
  saveProgress "magsQ"
  q = "What magazines do you read? "
  newQ q
  typeit()
  insertMagsField()