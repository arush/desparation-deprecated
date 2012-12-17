 ## How to update the JSON

1. Go to the Twitter API explorer (apigee.com)
1. Do an API request for 'favourites list' of screen name BRANDiD, count 200
1. You will need to use OAuth1, so connect with twitter
1. The request should look like this: https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=brandid
1. Take a snapshop, and download the RAW. If you do not download the RAW version, special characters will be unescaped
1. Remove the header lines from the top of the file, so the first thing in the file is an open square brace '['
1. Find and Replace **@getbrandid** with **@BRANDiD**
1. Save the file as favourites.json in this directory