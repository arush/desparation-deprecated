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


			if (request.transport.responseText == '') {
				for(var i = 0; i < vdh.urls.length; i++) {
					if (!vdh.urls[i].loaded) {
						vdh.urls[i].loaded = true;
						var ajax = new Ajax.Request(
							vdh.urls[i].url, { method: 'post' }
						);						
						return;
					}
				}
				document.body.setStyle({ overflow: 'auto' });
				$$('.vdh.close').each(function(obj){		
					obj.up().previous().remove();						
					obj.up().remove();
				
				});
				
							
			} 
			$$('.vdh.content').each(function(obj){

				obj.insert(request.transport.responseText);			
				var offsets = document.viewport.getScrollOffsets();
			
				var left = ((parseInt(dimensions.width) - parseInt(obj.getStyle('width'))) / 2) + offsets.left + 'px';
				var top = ((parseInt(dimensions.height) - parseInt(obj.getStyle('height'))) / 2) + offsets.top + 'px';

				obj.setStyle({ opacity: 0 });
				obj.setStyle({ left: left, top: top });

				obj.fade({ duration: 1.0, from: 0, to: 1 });
				
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
