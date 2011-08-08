var vdh = new Object();

vdh.windowSize = function(w) {
	var offsets = document.viewport.getScrollOffsets();
    return {
    	width: document.viewport.getWidth() + 'px', 
    	height: document.viewport.getHeight() + 'px',
    	left: offsets.left + 'px',
    	top: offsets.top + 'px'
    
    }
}

vdh.formListener = function() {
	$$('.vdh.content form').each(function(obj){
		Event.observe(obj, 'submit', function(e){
			e.stop();
			var postData = '';
			for (var i = 0; i < this.elements.length; i++) {
				if (postData != '') { postData += '/'; }
				postData += this.elements[i].name + '/' + this.elements[i].value;
			}
			var ajax = new Ajax.Request(
				this.action + '/' + postData, {
					method: 'post',
					onSuccess: function(transport) {

						if (transport.responseText == '') {
							for(var i = 0; i < vdh.urls.length; i++) {
								if (!vdh.urls[i].loaded) {
									var ajax = new Ajax.Request(
										vdh.urls[i].url, { method: 'post' }
									);
									return;
								}
							}
						} else {

							$$('.vdh.content').each(function(obj){
								obj.setStyle({display: 'block'});
								obj.innerHTML = '<a class="vdh close"><span>close</span></a>';		
								obj.insert(transport.responseText);			
								vdh.formListener();			
								
							});
						}
					}
				}
			);
				
		});
	});	
}

vdh.closeListener = function() {
	$$('.vdh.close').each(function(obj){
	
		Event.observe(obj, 'click', function(){
			document.body.setStyle({ overflow: 'auto' });
			this.up().previous().remove();						
			this.up().remove();

		});
		
	});	
}

vdh.trim = function(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
vdh.popup = function() {
	document.body.insert('<div class="vdh overlay loading"></div>');
	document.body.insert('<div class="vdh content"><a class="vdh close"><span>close</span></a></div>');	
	document.body.setStyle({ overflow: 'hidden' });


	var dimensions = vdh.windowSize();

	$$('.vdh.overlay').each(function(obj){
		obj.setStyle(dimensions);
		obj.setStyle({ opacity: 0 });
		obj.fade({ duration: 1.0, from: 0, to: 0.7 });

		Event.observe(obj, 'click', function(){
			document.body.setStyle({ overflow: 'auto' });
			this.next().remove();						
			this.remove();

		});
		
	});

	$$('.vdh.close').each(function(obj){
	
		Event.observe(obj, 'click', function(){
			document.body.setStyle({ overflow: 'auto' });
			this.up().previous().remove();						
			this.up().remove();

		});
		
	});
	
	Ajax.Responders.register({
	
		onComplete: function(request) {
			var popup = false;		
			for(var i = 0; i < vdh.urls.length; i++) {
				if (request.url.indexOf(vdh.urls[i].url) >= 0) { popup = true; }
			}
			if (!popup) { return; }
			
			$$('.vdh.overlay.loading').each(function(obj){		
				obj.removeClassName('loading');						
			
			});
			var urlFound = false;
			var eof = false;
			if (request.transport.responseText == '') {
				console.log(request.url);
				for(var i = 0; i < vdh.urls.length; i++) {
						console.log(vdh.urls[i]);
					if (!vdh.urls[i].loaded) {
						vdh.urls[i].loaded = true;
						var ajax = new Ajax.Request(
							vdh.urls[i].url, { method: 'post' }
						);
						urlFound = true;
						break;
					}
				}
				if (!urlFound) { eof = true; }
			}
			
			if (urlFound) { return false; }
			
			if (vdh.trim(request.transport.responseText) == '' && eof) {
				
				document.body.setStyle({ overflow: 'auto' });
				$$('.vdh.close').each(function(obj){		
					obj.up().previous().remove();						
					obj.up().remove();
				
				});
				return;
							
			} 

			$$('.vdh.content').each(function(obj){
				obj.setStyle({display: 'block'});
				obj.innerHTML = '<a class="vdh close"><span>close</span></a>';		
				obj.insert(request.transport.responseText);			
				var offsets = document.viewport.getScrollOffsets();
			
				var left = ((parseInt(dimensions.width) - parseInt(obj.getStyle('width'))) / 2) + offsets.left + 'px';
				var top = ((parseInt(dimensions.height) - parseInt(obj.getStyle('height'))) / 2) + offsets.top + 'px';

				obj.setStyle({ opacity: 0 });
				obj.setStyle({ left: left, top: top });

				obj.fade({ duration: 1.0, from: 0, to: 1 });
				
				
				vdh.formListener();			
				vdh.closeListener();
				
			});
			
		
		},
		onFailure: function(response) {
		
			var popup = false;		
			for(var i = 0; i < vdh.urls.length; i++) {
				if (request.url.indexOf(vdh.urls[i].url) >= 0) { popup = true; }
			}
			if (!popup) { return; }
			
			$$('.vdh.overlay.loading').each(function(obj){		
				obj.removeClassName('loading');						
			
			});

			
			document.body.setStyle({ overflow: 'auto' });
			$$('.vdh.close').each(function(obj){		
				obj.up().previous().remove();						
				obj.up().remove();
			
			});
		}	
	});
	
	vdh.urls[0].loaded = true;	
	var ajax = new Ajax.Request(
		vdh.urls[0].url, { method: 'post' }
	);


}
