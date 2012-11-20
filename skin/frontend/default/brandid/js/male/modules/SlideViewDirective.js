/**
 * Custom Directives
 */
angular.module('SlideViewDirective',[])

/**
 * CSS3 animations for changing views
 *
 * Thanks to Sebastian from Angular Google Groups
 * https://groups.google.com/d/msg/angular/5j97NqjTwi0/6SkZQczqRSQJ
 * 
 */
.directive('slideView', function ($http, $templateCache, $route, $anchorScroll, $compile, $controller, Navigation) {    
  return {
      restrict:'ECA',
      terminal:true,
      link:function (scope, parentElm, attr) {
          var partials = [],
            inClass = attr.inClass,
            outClass = attr.outClass,
            currentPartial, lastPartial;
          
          scope.$on('$routeChangeSuccess', update);
          update();
          
          //Create just an element for a partial
          function createPartial(template) {
            //Create it this way because some templates give error
            //when you just do angular.element(template) (unknown reason)
            var d = document.createElement("div");
            d.innerHTML = template;
            $('.page', d).addClass(Navigation.transition);
            return {
              element: angular.element(d.children[0]),
              //Store a reference to controller, but don'r create it yet
              controller: $route.current && $route.current.controller,
              locals: $route.current && $route.current.locals
            };
          }
          
          //'Angularize' a partial: Create scope/controller, $compile element, insert into dom
          function setupPartial(partial) {
            var cur = $route.current;
            partial.scope = cur.locals.$scope = scope.$new();
            //partial.controller contains a reference to the 
            //controller constructor at first
            //Now we actually instantiate it
            if (partial.controller) {
              partial.controller = $controller(partial.controller, partial.locals);
              partial.element.contents().data('$ngControllerController', partial.controller);
              $compile(partial.element.contents())(partial.scope);
            }
            parentElm.append(partial.element);
            partial.scope.$emit('$viewContentLoaded');
          } 
          
          function destroyPartial(partial) {
            partial.scope.$destroy();
            partial.element.remove();
            partial = null;
          } 
           
          //Transition end stuff from bootstrap:
          //http://twitter.github.com/bootstrap/assets/js/bootstrap-transition.js
          var transEndEvents = [
            'webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 
            'otransitionend', 'transitionend'
          ];
          function onTransitionEnd(el, callback) {
            for (var i=0; i<transEndEvents.length; i++) {
              el[0].addEventListener(transEndEvents[i], callback);
            }
          }
          
          function transition(inPartial, outPartial) {
            //Do a timeout so the initial class for the
            //element has time to 'take effect'
            setTimeout(function() {
              inPartial.element.addClass(inClass);
              onTransitionEnd(inPartial.element, updatePartialQueue);
              if (outPartial) {
                $(outPartial.element).removeClass();
  								outPartial.element.addClass(outClass);
  								outPartial.element.addClass(Navigation.transition);
                onTransitionEnd(outPartial.element, function() {
                  destroyPartial(outPartial);
                });
              }
            });
          }
          
          function updatePartialQueue() {
            //Bring in a new partial if it exists
            if (partials.length > 0) {         
              var newPartial = partials.pop();
              setupPartial(newPartial);
              transition(newPartial, currentPartial);
              currentPartial = newPartial; 
            }
          } 
          
          function update() {
              if ($route.current && $route.current.locals.$template) {
                partials.unshift(createPartial($route.current.locals.$template));
                updatePartialQueue();
              }
          }
      }
  };
});