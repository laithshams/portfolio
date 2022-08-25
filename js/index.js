$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('bg-light scrolled', $(this).scrollTop() > $nav.height());
  });
});
