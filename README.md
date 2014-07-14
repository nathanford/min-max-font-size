min-max-font-size
=================

Using vw or vh CSS units? Set a min or max font-size for your type.

## Setup

Add `mm-fontsize.js` at the end of your HTML page, just before the closing `body` tag.

```HTML
	…
	
	<script src="./path-to-js/mm-fontsize.js" type="text/javascript"></script>
		
</body>
</html>
```

Now you can start manually adjusting kerning in your own CSS.

## CSS Syntax

To use the min-font-size or max-font-size propery, just write it in your CSS like any other property:

```CSS
h1 {
	font-size: 4vw
	max-font-size: 50px;
	min-font-size: 20px;
} 
```

Notes: 
* This is only for when using vw or vh units for font size.
* Right now, `px` is the only unit accepted for min and max-font-size. (Working on ems.)

## This script is a Stylefill

A ‘Stylefill’ is a way to create new CSS properties using JavaScript. Stylefills are similar in concept to a [polyfill](http://remysharp.com/2010/10/08/what-is-a-polyfill/), but are only focussed on extending CSS in new ways, and [Stylefill.js](https://github.com/nathanford/stylefill/) is a library to help make it much easier.

## Support

mm-fontsize.js should work in all modern browsers, and IE9+.