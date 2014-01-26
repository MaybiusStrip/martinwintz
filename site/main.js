$(function() {

  $('a[href*=#]:not([href=#])').click(
    function () {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&
        location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({ scrollTop: target.offset().top }, 1000);
          return false;
        }
      }
    }
  );

  for (var i = 0; i < 1; i += 0.1 ) {
    console.log('velocity at', i, getVelocity(i));
  }

  function getVelocity(x) { return -((2 * x) - 1) ^ 2 + 1; }

});
