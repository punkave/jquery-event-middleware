# jQuery Event Middleware

#### Conditional middleware functions for your jQuery events

jQuery event middleware provides the function `$.onIf` with a syntax for binding jQuery events that must first pass through conditional statements. If any of the conditional statements fail, the event doesn't fire.

```javascript
function isDesktop() {
  return window.innerWidth > 1024;
}

$('.button').onIf('click', isDesktop, function(e) {
  console.log('This only fires if isDesktop is true.')
});
```

The syntax is inspired by the [Express.js](https://github.com/strongloop/express) framework, which makes use of a concept called "middleware" where a server route can have a series of functions called before the "real" callback. These functions can do anything from rerouting a user to changing properties of the request object to checking user permissions. Separating logic into middleware functions allows us to make our code more modular and maintainable.

## API

##### `$().onIf(eventType, [middleware1, middleware2, ...] callback)`

Calling `$.onIf` with no middleware is equivalent to calling `$.on` normally.

##### `$().onIf(eventType, selector, [middleware1, middleware2, ...] callback)`

You can provide a selector as the second argument in order to filter down the elements that fire the event, just as you can with `$.on`.

### Middleware

Middleware can come in the form of a function or a variable. If the function returns `false` or the variable is _falsey_ the final event is not fired.

Here we use middleware to do a little field validation:

```javascript
// check if the username they entered is valid
function usernameIsValid() {
  var username = $('.username').val();
  return (username.length >= 6);
}

$('body').onIf('click', '.submit', usernameIsValid, function(e) {
  console.log('The submit button was clicked with a valid username.');
});
```

Here we use a boolean variable set on page load to determine which events to bind:

```javascript
// set a boolean variable that tracks whether or not this device is touch-capable.
var isTouch = ('ontouchstart' in document.documentElement);

// for desktops
$('body').onIf('click', '.button', !isTouch, function(e) {
  console.log('click!');
});

// for touch devices
$('body').onIf('touchstart', isTouch, function(e) {
  console.log('touch start!');
});
```

Note that boolean variables are passed by value, not reference; if the `isTouch` property in the example above was to change at some point the event would still not fire. For this you would wrap it in a function that can return the most up-to-date value.

