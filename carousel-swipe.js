+function ($) {
  'use strict';

  if ( !$.fn.carousel ) {
    throw new Error( "carousel-swipe required bootstrap carousel" )
  }

  // CAROUSEL CLASS DEFINITION
  // =========================

  var CarouselSwipe = function( element ) {
    this.$element    = $(element)
    this.carousel    = this.$element.data('bs.carousel')
    this.options     = $.extend({}, CarouselSwipe.DEFAULTS, this.carousel.options)
    this.$active     =
    this.$items      =
    this.$next       =
    this.$prev       = null

    var that = this, start, touch, current, dx, percent, cycling;
    this.$element.on('touchstart', function(ev) {
      if (!that.options.swipe) return;
      ev.preventDefault()
      cycling = that.carousel.interval
      cycling && that.carousel.pause() // pause to prevent cycling during swipe
      touch = ev.originalEvent.targetTouches[0]
      start = ev.timeStamp
    })

    this.$element.on('touchmove', function(ev) {
      current = ev.originalEvent.targetTouches[0]
      dx = -(touch.clientX - current.clientX)
      percent = dx / that.$element.width() * 100
      that.swipe(percent)
    })

    this.$element.on('touchend', function(ev) {
      var all = $()
        .add(that.$active).add(that.$prev).add(that.$next)
        .carousel_transition(true)

      var dt = (ev.timeStamp - start) / 1000;
      var speed = Math.abs(percent / dt); // percent-per-second
      if (percent > 40 || (percent > 0 && speed > that.options.swipe)) {
        that.carousel.prev()
      } else if (percent < -40 || (percent < 0 && speed > that.options.swipe)) {
        that.carousel.next();
      } else {
        that.$active
          .one($.support.transition.end, function () {
            all.removeClass( "prev next" )
          })
        .emulateTransitionEnd(that.$active.css('transition-duration').slice(0, -1) * 1000)
      }

      all.css('left', '')
      cycling && that.carousel.cycle()
      cycling = null
      that.$active = null // reset the active element
    });
  }

  CarouselSwipe.DEFAULTS = {
    swipe: 50 // percent per second
  }

  CarouselSwipe.prototype.swipe = function( percent ) {
    var $active = this.$active || this.getActive()

    if (percent < 0) {
        this.$prev
            .css('left', '' )
            .removeClass('prev')
            .carousel_transition(true)
        if (!this.$next.length || this.$next.hasClass('active')) return
        this.$next
            .carousel_transition(false)
            .addClass('next')
            .css('left', (percent + 100) + '%')
    } else {
        this.$next
            .css('left', '' )
            .removeClass('next')
            .carousel_transition(true)
        if (!this.$prev.length || this.$prev.hasClass('active')) return
        this.$prev
            .carousel_transition(false)
            .addClass('prev')
            .css('left', (percent - 100) + '%')
    }

    $active
        .carousel_transition(false)
        .css('left', percent + '%' )
  }

  CarouselSwipe.prototype.getActive = function() {
    this.$active = this.$element.find('.item.active')
    this.$items = this.$active.parent().children()

    this.$next = this.$active.next()
    if (!this.$next.length && this.options.wrap) {
      this.$next = this.$items.first();
    }

    this.$prev = this.$active.prev()
    if (!this.$prev.length && this.options.wrap) {
      this.$prev = this.$items.last();
    }

    return this.$active;
  }

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel
  $.fn.carousel = function() {
    old.apply(this, arguments);
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel.swipe')
      if (!data) $this.data('bs.carousel.swipe', new CarouselSwipe(this))
    })
  }

  $.extend($.fn.carousel,old);

  $.fn.carousel_transition = function(enable) {
    enable = enable ? '' : 'none';
    return this.each(function() {
      $(this)
        .css('-webkit-transition', enable)
        .css('transition', enable)
    })
  };

}(jQuery);