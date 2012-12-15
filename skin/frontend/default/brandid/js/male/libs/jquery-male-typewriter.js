(function($) {

    $.fn.typewriter = function(callback) {
        this.css('display','block');
        this.each(function() {
            var $ele = $(this), str = $ele.text(), progress = 0;
            $ele.text('');
            var timer = setInterval(function() {
                
                $ele.text(str.substring(0, progress++) + (progress & 1 ? '_' : ''));

                if (progress > str.length+1) {
                    clearInterval(timer);
                    // alert('bewbs');
                    
                    if(typeof(callback) !== "undefined") {
                        callback();
                    }
                        

                    // insert logic for callback here
                } 
            }, 25);
        });
        return this;
    };
    
})(jQuery);