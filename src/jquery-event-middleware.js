(function($) {

  $.fn.onIf = function() {
    var $self = $(this);
    if(arguments.length < 2) {
      return;
    }

    var args = Array.prototype.slice.call(arguments);

    var eventToBind = args.splice(0,1)[0];
    var subSelector = null;
    // last arg has to be a callback
    var callback = args.pop();

    if(args.length > 0) {
      if(typeof args[0] === 'string') {
        subSelector = args.splice(0, 1)[0];
      }
    }

    // the rest of the args represent middleware functions now!
    var middleware = args;

    function runMiddleware(e) {
      var noBreaks = true;

      for(var i = 0; i < middleware.length; i++) {
        if( middleware[i](e) === false ) {
          noBreaks = false;
          break;
        }
      }
      if(noBreaks) {
        return callback(e);
      }
    }

    if(subSelector) {
      $self.on(eventToBind, subSelector, runMiddleware);
    } else {
      $self.on(eventToBind, runMiddleware);
    }
  };

})(jQuery);