// Generated by CoffeeScript 1.4.0
(function(){var e;e=typeof exports!="undefined"&&exports!==null?exports:this;e.TwitterController=function(e,t){e.tweetCount=0;e.scrollByNumTweets=6;e.allTweets=[];e.favourites=[];e.displayTweets=[{created_at_1:"One fine Wednesday evening",created_at_2:"in November",text:"Got a little extra touch this month from @BRANDiD in touch screen gloves as well as me Knickers & Stockins http://t.co/2tEvPzmt",user:{screen_name:"RDRB26",profile_image_url_https:"https://si0.twimg.com/profile_images/2912023785/5ad786af7826794f6d0f6f38b0a5529c_bigger.jpeg"},media_url_https:"https://pbs.twimg.com/media/A8z9PjcCEAInIY0.jpg"},{created_at_1:"A crisp Monday morning",created_at_2:"in December",text:"My best purchase in 2012? This amazing hoodie. Best value for money! I just got @BRANDiD . Go on winter, try me.",user:{screen_name:"lucegary",profile_image_url_https:"https://si0.twimg.com/profile_images/2455057810/k4toydz555vo366f9l5v_normal.jpeg"},media_url_https:"https://pbs.twimg.com/media/A9_nmSJCcAAr9QS.jpg"},{created_at_1:"One fine Saturday evening",created_at_2:"in November",text:"Had my second delivery from @BRANDiD and this was inside. Amazing! Thanks guys. You're the best! http://t.co/sp4B6oKX",user:{screen_name:"craigmdennis",profile_image_url_https:"https://si0.twimg.com/profile_images/2914319457/a7604c20568dda0b315ba0340841fc95_bigger.png"},media_url_https:"https://pbs.twimg.com/media/A8eFjSuCAAEUwtb.jpg"}];e.convertTweetToDisplayableTweet=function(e){var t,n,r,i,s;r={};t=moment(e.created_at);n=t.format("a");if(n==="am"){r.created_at_1="A crisp "+t.format("dddd")+" morning";r.created_at_2="in "+t.format("MMMM")}else{r.created_at_1="One fine "+t.format("dddd")+" evening";r.created_at_2="in "+t.format("MMMM")}r.text=e.text;r.user={};r.user.screen_name=e.user.screen_name;r.user.profile_image_url_https=e.user.profile_image_url_https.replace("normal","bigger");r.media=!1;if(((i=e["media"])!=null?(s=i[0])!=null?s["media_url_https"]:void 0:void 0)!=null){r.media=[];r.media_url_https=e.media[0].media_url_https}return r};e.retrieveMoreTweets=function(n){return t({method:"GET",url:"/ajax/twitter/favourites.json"}).success(function(t,r,i,s){e.allTweets=t;return e.getNext(n)}).error(function(t,n,r,i){return e.allTweets=!1})};return e.getNext=function(t){var n,r,i,s,o;if(typeof e.allTweets[0]=="undefined")e.retrieveMoreTweets(t);else if(!(e.tweetCount>=e.allTweets.length)){for(r=i=s=e.tweetCount,o=e.tweetCount+t;s<=o?i<o:i>o;r=s<=o?++i:--i){n=e.convertTweetToDisplayableTweet(e.allTweets[r]);e.displayTweets.push(n);e.tweetCount++}return e.displayTweets}}};TwitterController.$inject=["$scope","$http"]}).call(this);