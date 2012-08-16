root = exports ? this
root.watchQ = ->
  wipeConsole()
  saveProgress "watchQ"
  q = "What are your favourite TV shows? "
  newQ q
  typeit()
  insertTvField()