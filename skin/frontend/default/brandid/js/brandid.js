//detect browser
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


document.observe('dom:loaded', function(){

	/* steve's slider */
	$$('.sliders .holder .slider').each(function(obj){
		var calculatedWidth = obj.select('ul li').length * parseInt(obj.select('ul li')[0].getStyle('width'));
		var margins = parseInt(obj.getStyle('margin-left'));
		margins += parseInt(obj.getStyle('margin-right'));
		obj.setStyle({ width: calculatedWidth + margins + 100 + 'px' });
	});
	
	$$('.sliders .holder .left').each(function(obj){
		obj.observe('click', function(){
			var target = obj.up().firstDescendant().firstDescendant().childElements()[obj.up().firstDescendant().firstDescendant().childElements().length-1];

			var lastChild = document.createElement('li');
			lastChild.innerHTML = target.innerHTML;
			target.remove();
			obj.up().firstDescendant().firstDescendant().insert({top: lastChild });
			target = lastChild;
			target.setStyle({ marginLeft: (parseInt(target.getStyle('width'))*-1) + 'px' })			
			var start = parseInt(target.getStyle('margin-left'));
			var end = start + parseInt(target.getStyle('width'));
			
			new Effect.Tween(
				target, start, end, { duration: 0.2	},
				function(p) { this.setStyle({marginLeft : p + "px" }) }
			);
		});	
	});
	$$('.sliders .holder .right').each(function(obj){
		obj.observe('click', function(){
			var target = obj.up().firstDescendant().firstDescendant().firstDescendant();
			var start = parseInt(target.getStyle('margin-left'));
			var end = start + (parseInt(target.getStyle('width')) * -1);
			new Effect.Tween(
				target, start, end, {
					duration: 0.2, afterFinish: function(){
						
						// if (end != parseInt(target.getStyle('width'))*-1) {
							var lastChild = document.createElement('li');
							lastChild.innerHTML = target.innerHTML;
							target.remove();
							obj.up().firstDescendant().firstDescendant().insert(lastChild);
						//}
					}
				},
				function(p) { this.setStyle({marginLeft : p + "px" }) }
			);
		});
	});
	

});

var count;

function doFade(el) {
		count = 0;
		nextLi = parseInt(el);
		el = "#" + el;
		
		fadeThings = jQuery("#popup-slide").children("ul").children("li").eq(nextLi).find(".fadein");
		
		var numFaders = fadeThings.size();
		
		var target;
		
		timer = setInterval(function() {
			if(count >= numFaders) { 
				clearInterval(timer);
			 }
			 else {
			 	target = fadeThings.eq(count);
			 	startFade(target);
				count++;
			 }
		}, 500);
		
	}

function startFade(el) {
		jQuery(el).animate({
			opacity: 1
			},500);

	}