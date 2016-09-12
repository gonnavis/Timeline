Angular Mousewheel
==================

An AngularJS directive for cross-browser mouse wheel support, using the small and standalone [Hamster.js](https://github.com/monospaced/hamster.js) library.

[See it in action](http://monospaced.github.io/angular-mousewheel).

Usage
-----

as attribute

    msd-wheel="{expression}"

as class

    class="msd-wheel: {expression};"

The event callback receives 3 extra arguments which are the normalized “deltas” of the mouse wheel.

    msd-wheel="myFunction($event, $delta, $deltaX, $deltaY)"

    class="msd-wheel: myFunction($event, $delta, $deltaX, $deltaY);"

Install
-------

    bower install angular-mousewheel or npm install angular-mousewheel

Include [Hamster.js](https://github.com/monospaced/hamster.js) and the `mousewheel.js` script provided by this component in your app, and add `monospaced.mousewheel` to your app’s dependencies.

Demo
----------------

[monospaced.github.io/angular-mousewheel](http://monospaced.github.io/angular-mousewheel)
