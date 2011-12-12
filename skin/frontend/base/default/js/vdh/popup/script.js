var vdh = new Object();
vdh.timeOut = 0;
vdh.windowSize = function(w) {
	var offsets = document.viewport.getScrollOffsets();
    return {
    	width: document.viewport.getWidth() + 'px', 
    	height: document.viewport.getHeight() + 'px',
    	left: offsets.left + 'px',
    	top: offsets.top + 'px'
    
    }
}
vdh.queue = {
	requestHandler: function(transport) {
		vdh.queue.sending = false;
		if (transport.responseText == '') {
			var nextUrl = false;
			for(var i = 0; i < vdh.urls.length; i++) {
				if (!vdh.urls[i].loaded) {
					vdh.urls[i].loaded = true;
					nextUrl = true;
					vdh.queue.send(vdh.urls[i].url);
					break;
				}
			}
			if (!nextUrl) {
				document.body.setStyle({ overflow: 'auto' });
				$$('.vdh.close').each(function(obj){		
					obj.up().previous().remove();						
					obj.up().remove();
					for(var i = 0; i < vdh.urls.length; i++) {				
						vdh.urls[i].loaded = false;
					}					
				
				});
			}
		} else {
			$$('.vdh.content').each(function(obj){
				obj.setStyle({display: 'block'});
				obj.innerHTML = '<a class="vdh close"><span>close</span></a>';		
				obj.insert(transport.responseText);			
			
				var dimensions = vdh.windowSize();
				var offsets = document.viewport.getScrollOffsets();
			
				var left = ((parseInt(dimensions.width) - parseInt(obj.getStyle('width'))) / 2) + offsets.left + 'px';
				var top = ((parseInt(dimensions.height) - parseInt(obj.getStyle('height'))) / 2) + offsets.top + 'px';
	
				obj.setStyle({ opacity: 0 });
				obj.setStyle({ left: left, top: top });
	
				obj.fade({ duration: 1.0, from: 0, to: 1 });
				
				
				vdh.formListener();			
				vdh.closeListener();							
			});
		}
		vdh.count();
		vdh.queue.iterate();
	},
	queue: [],
	sending: false,
	send: function(url) {
		this.queue.push(url);
		if (!this.sending) {
			this.sending = true;
			this.iterate();			
		}
	},

	iterate: function() {
		url = this.queue.pop();
		if (url) {

			$$('.vdh.overlay').each(function(obj){

				if (vdh.popupCount > 0) {
					obj.setStyle({ display: 'block'});

				}
			});		
			if (url.request) {
				var ajax = url.request({
					onSuccess: vdh.queue.requestHandler
				});
			} else {
				var ajax = new Ajax.Request(
					url, {
					method: 'post',
					onSuccess: vdh.queue.requestHandler
				});
			}
		}
	}
};
vdh.formListener = function() {
	$$('.vdh.content form').each(function(obj){
		Event.observe(obj, 'submit', function(e){
			e.stop();
			var postData = '';
			for (var i = 0; i < this.elements.length; i++) {
				if (postData != '') { postData += '/'; }
				postData += this.elements[i].name + '/' + this.elements[i].value;
			}
			vdh.queue.send(this.action + '/' + postData);

		});
	});	
}

vdh.closeListener = function() {
	$$('.vdh.close').each(function(obj){

		Event.observe(obj, 'click', function(){
			document.body.setStyle({ overflow: 'auto' });
			this.up().previous().remove();						
			this.up().remove();
			for(var i = 0; i < vdh.urls.length; i++) {				
				vdh.urls[i].loaded = false;
			}					

		});

	});	
}

vdh.trim = function(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
vdh.popup = function(suppress) {

	if (suppress) { return; }

	document.body.insert('<div class="vdh overlay loading"></div>');
	document.body.insert('<div class="vdh content"><a class="vdh close"><span>close</span></a></div>');	
	document.body.setStyle({ overflow: 'hidden' });


	var dimensions = vdh.windowSize();

	$$('.vdh.overlay').each(function(obj){

		obj.setStyle(dimensions);
		obj.setStyle({ opacity: 0 });
		obj.setStyle({top:0}); //arush
		obj.fade({ duration: 1.0, from: 0, to: 0.7 });

		Event.observe(obj, 'click', function(){
			document.body.setStyle({ overflow: 'auto' });
			this.next().remove();						
			this.remove();
			for(var i = 0; i < vdh.urls.length; i++) {				
				vdh.urls[i].loaded = false;
			}			

		});

	});



	if (vdh.urls[0].loaded) {
		vdh.urls[0].loaded = false;
	}
	vdh.urls[0].loaded = true;	
	vdh.queue.send(vdh.urls[0].url);

}
vdh.count = function() {
	var ajax = new Ajax.Request('/popup/form/count', {
		method: 'post',
		onSuccess: function(transport) {
			vdh.popupCount = transport.responseText;
			$('popupCounter').innerHTML = vdh.popupCount;				
			if (vdh.popupCount > 0 && vdh.loggedIn) {
				$('popupMessages').setStyle({ display: 'block' });
			} else {
				$('popupMessages').setStyle({ display: 'none' });			
			}
		}
	});

}
vdh.popupCount = 0;

document.observe('dom:loaded', function(){
	Event.observe($('popupMessages'), 'click', function(){
		if (vdh.popupCount > 0) {
			clearTimeout(vdh.timeOut);
			vdh.popup(false);			
		}

	});
});

Ajax.Responders.register({
	onComplete: function(request) {
		if (request.url.indexOf('/popup/form/page/index') >= 0) {
			var scripts = new Array();
		
			var matched = request.transport.responseText.match(/<script(.*)>[\s\S]*<\/script>/gi);
			if (matched != null) { scripts = matched; }
			
			for (var i = 0; i < scripts.length; i++) {
				var tmp = scripts[i].replace(/<script(.*)>([\s\S]*)<\/script>/gi, "$2");
				eval(tmp);
			}
			
		}
	}
});
