(function($) {

    $.fn.typewriter = function(callback) {
        this.each(function() {
            var $ele = $(this), str = $ele.text(), progress = 0;
            $ele.text('');
            var timer = setInterval(function() {
                
                $ele.text(str.substring(0, progress++) + (progress & 1 ? '_' : ''));

                if (progress >= str.length) {
                    clearInterval(timer);
                    // alert('bewbs');
                    callback();
                    // insert logic for callback here
                } 
            }, 15);
        });
        return this;
    };
    
})(jQuery);