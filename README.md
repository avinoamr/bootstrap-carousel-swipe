bootstrap-carousel-swipe
========================

Adding swipe behavior to Bootstrap's Carousel

## Usage

Just include the library in your page and create the carousel components
normally, as described in the [official Bootstrap documentation](http://getbootstrap.com/javascript/#carousel).
The swipe functionality will be added automatically to all carousels on the page as
long as the browser supports the [HTML5 touch events](http://www.html5rocks.com/en/mobile/touch/).

```html
<!-- Bootstrap is required -->
<script src="bootstrap/dist/js/bootstrap.js"></script>
<script src="carousel-swipe.js"></script>

<!-- Create carousels normally: http://getbootstrap.com/javascript/#carousel -->
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  ...
</div>

<script>
  $("#carousel-example-generic").carousel()
</script>
```

You can control the swipe sensitivity by passing the `swipe` directive to the carousel
inititalization:

```javascript
$("#carousel-example-generic").carousel({
  swipe: 30 // percent-per-second, default is 50. Pass false to disable swipe
});
```


