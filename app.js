// Magic numbers plugin
( function ($) {
  $.awsmCounter = function (el, options) {
    var _self = this;

    _self.$el = $(el);
    _self.el = el;
    $.awsmCounter.defaultOptions = {
      timeout: 250,
      ascend: true,
      animation: false,
      duration: 2000,
      seperator: ',',
      offsetTrigger: 1000,
    };
    _self.triggered = false;

    _self.list = '<ul>' +
                    '<li>0</li>' +
                    '<li>1</li>' +
                    '<li>2</li>' +
                    '<li>3</li>' +
                    '<li>4</li>' +
                    '<li>5</li>' +
                    '<li>6</li>' +
                    '<li>7</li>' +
                    '<li>8</li>' +
                    '<li>9</li>' +
                '</ul>';

    // Add a reverse reference to the DOM object
    _self.$el.data("awsmCounter", _self);

    _self.init = function () {
      _self.options = $.extend( {}, $.awsmCounter.defaultOptions, options );

      _self.$el.addClass('awsm-counter');
      _self.prepareHTML();
      _self.initStyles();
      _self.addScrollWatch();
    };

    _self.prepareHTML = function () {
      var digits = _self.$el.text().trim();
      var content = [];

      var counter = 0;
      for (var i = digits.length - 1; i >= 0; i--) {
        if (_self.options.seperator && counter % 3 === 0 && counter !== 0) {
          content.push('<span class="seperator">' + _self.options.seperator + '</span>');
        }
        content.push(_self.numTemplate(digits[i]));
        counter++;
      }

      _self.$el.html(content.reverse().join(''));
    };

    _self.numTemplate = function (digit) {
      return '<span class="mn-number" data-num="' + digit + '">' +
                '<span class="mn-number-string">' + digit + '</span>' +
                _self.list +
              '</span>';
    };

    _self.initStyles = function () {
      _self.$el.find('.mn-number-string').css('opacity', '0');
      _self.$el.find('.mn-number').each(function (index, item) {
        var transitionValue = (_self.options.animation ? _self.options.duration + 'ms' : '0');
        var transformValue = 'translateY(' + (_self.options.ascend ? '0' : '-9em') + ')';

        $(this).find('ul').css({
          'transition': transitionValue,
          'transform': transformValue
        });
      });
    };

    _self.addScrollWatch = function () {
      var $w = $(window);
      $w.on('scroll.number', function () {
        if ($w.scrollTop() >= _self.$el.offset().top - _self.options.offsetTrigger && !_self.triggered) {
          _self.startAnimations();
          _self.triggered = true;
        }
      }).trigger('scroll.number');
    };

    _self.startAnimations = function () {
      if (_self.options.animation) {
        _self.$el.find('.mn-number').each(function (index, item) {
          setTimeout(function () {
            $(item).find('ul').css({
              'transform': 'translateY(-' + $(item).data('num') + 'em)'
            });
          }, _self.options.timeout);
        });
      } else {
        _self.$el.find('.mn-number').each(function (index, item) {
          var timer = 0;
          var num = $(item).data('num');
          var timeout =  num > 0 ? num : 2;
          setTimeout(function () {
            var interv = setInterval(function () {
              var temp = Math.floor(Math.random() * 10);
              $(item).find('ul').css({
                'transform': 'translateY(-' + temp + 'em)'
              });
            }, 100);
            setTimeout(function () {
              clearInterval(interv);
              $(item).find('ul').css({
                'transform': 'translateY(-' + $(item).data('num') + 'em)'
              })
            }, _self.options.duration);

          }, _self.options.timeout);
        });
      }
    }

    _self.init();
  };

  $.fn.awsmCounter = function (options) {
    return this.each(function () {
      (new $.awsmCounter(this, options));
    });
  };

} )( jQuery );
// Plugin end


jQuery(document).ready(function () {

  $('.nav li a').on('click', function (e) {
    e.preventDefault();
    $('.nav li').removeClass('active');
    $('.section').removeClass('active');
    $(this).parent().addClass('active');
    $($(this).attr('href')).addClass('active');
    if ($(this).attr('href') === '#demo') {
      initPlugin();
    }
  });

  function initPlugin() {
    $('.js-awsm-counter-1').awsmCounter({
      ascend: false,
      animation: true,
      timeout: 0,
      seperator: '-',
      offsetTrigger: 500,
    });

    $('.js-awsm-counter-2').awsmCounter({
      duration: 4000,
      ascend: false,
      animation: false,
      timeout: 200,
      seperator: ',',
    });
    $('.js-awsm-counter-3').awsmCounter();
  }

});
