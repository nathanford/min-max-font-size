min-max-font-size
=================

Using vw or vh CSS units for font-size? Set a min or max font-size for your type.

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

mm-fontsize.js will work in any browser that accepts [vw or vh CSS units](http://caniuse.com/#search=viewport%20units).

## License

This script is released under The MIT License (MIT)

Copyright (c) 2015 Nathan Ford

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
