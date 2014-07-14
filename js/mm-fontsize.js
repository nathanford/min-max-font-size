/* 

mm-fontsize.js

This script uses stylfill.js (https://github.com/nathanford/stylefill/) to allow properties to be written in the CSS.

To use the min-font-size or max-font-size propery, just write it in your CSS like any other property:

h1 {
	font-size: 4vw
	max-font-size: 50px;
	min-font-size: 20px;
} 

Notes: 
* This is only for when using vw or vh units for font size.
* Right now, only px is the only unit accepted for min and max-font-size

*/

var stylefill = {

	allRules : new Object(),
	
	allFills : new Object(),

	objSize : function(obj) {
	
    var size = 0, key;
    
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    
    return size;
	    
	},
	
	arraySliceShim : function () { // fixes Array.prototype.slice support for IE lt 9
	
		'use strict';
    var _slice = Array.prototype.slice;

    try {
        _slice.call(document.documentElement); 
    }
    catch (e) { // Fails in IE < 9
    
        Array.prototype.slice = function (begin, end) {
        
            var i, arrl = this.length, a = [];
            
            if (this.charAt) { 
            
                for (i = 0; i < arrl; i++) {
                    a.push(this.charAt(i));
                }
                
            }
            else { 
            
                for (i = 0; i < this.length; i++) { 
                    a.push(this[i]);
                }
                
            }
            
            return _slice.call(a, begin, end || a.length);
            
        };
        
    }
	
	},

	init : function (params) {
		
		this.allFills = params;
		
		this.getStyleSheet(params);
	
	},
	
	loadFile : function(params, url, scount) {
	
	    var req;
	
	    if (window.XMLHttpRequest) req = new XMLHttpRequest();
	    else req = new ActiveXObject("Microsoft.XMLHTTP");
	    
	    req.open("GET", url, true);
	
	    req.onreadystatechange = function() {
	    	
	      if (this.readyState == 4 && this.status == 200) stylefill.findRules(params, this.responseText, scount);
	      
	    };
	    
	    req.send(null);	
	
	},
	
	getStyleSheet : function (params) {
		
		var sheetstext = new Array(),
				sheets = Array.prototype.slice.call(document.getElementsByTagName('link')); // grab stylesheet links - not used yet
				
				sheets.push(Array.prototype.slice.call(document.getElementsByTagName('style'))[0]); // add on page CSS
		
		sheets.reverse();
			
		var scount = this.objSize(sheets);
		
		while (scount-- > 0) {
			
			var sheet = sheets[scount];
			
			if (sheet.innerHTML) this.findRules(params, sheet.innerHTML, scount);
			else if (sheet.href.match(document.domain)) this.loadFile(params, sheet.href, scount);
					
		}
	
	},
	
	checkRule : function (property) {
		
		var propertyCamel = property.replace(/(^|-)([a-z])/g, function (m1, m2, m3) { return m3.toUpperCase(); });
		
		if (('Webkit' + propertyCamel) in document.body.style 
		 || ('Moz' + propertyCamel) in document.body.style 
		 || ('O' + propertyCamel) in document.body.style 
		 || property in document.body.style) return true;
		
		else return false;
		
	},
	
	findRules : function (params, sheettext, scount) {
		
		if (sheettext) {
			
			var pcount = this.objSize(params);
			
			for (property in params) {
			
				var selreg = new RegExp('([^}{]+){([^}]+)?' + property.replace('-', '\\-') + '[\\s\\t]*:[\\s\\t]*([^;]+)', 'gi'), 
						selmatch,
						
						support = stylefill.checkRule(property);
				
				while (selmatch = selreg.exec(sheettext)) {
		   		
		   		var sels = selmatch[1].replace(/^([\s\n\r\t]+|\/\*.*?\*\/)+/, '').replace(/[\s\n\r\t]+$/, ''),
		   				val = selmatch[3];
					
					sels = sels.split(',');
					
					for (sel in sels) { 
					
						var s = sels[sel];
					
						if (!stylefill.allRules[s]) stylefill.allRules[s] = new Object();
						stylefill.allRules[s][property] = {
							'support': support,
							'value': val
						};
					
					}
				
				}
				
			}
			
			if (scount == 1) this.runFills();
			
		}
		
	},
	
	runFills : function () {
		
		var allRules = stylefill.allRules,
				allFills = stylefill.allFills;
		
		for (i in allRules) {
			
			var rules = allRules[i];
			
			for (j in rules) {
				
				var rule = rules[j],
						func = allFills[j],
						
						newrule = {
							
							support : rule['support'],
							selector: i,
							property: j,
							value: rule['value']
							
						};
						
				func(newrule);
			
			}
		
		}
		
	},
	
	binder : function (object, events, func) {
		
		var events = events.split(','),
				eventscount = events.length;
		
		while (eventscount-- > 0) {
		
			if (object.attachEvent) object.attachEvent('on' + events[eventscount].trim(), func);
			else object.addEventListener(events[eventscount].trim(), func, false);
		
		}
		
	}

};

/* Begin min-max-font-size functions */

var typo = {
	
	minMaxFontSize : function (selector) {
		
		var eles = document.querySelectorAll(selector),
				elescount = eles.length;
		
		while (elescount-- > 0) {
			
			var ele = eles[elescount],
					
					selRules = stylefill.allRules[selector],
					max = selRules['max-font-size'] ? selRules['max-font-size']['value'] : false,
					min = (selRules['min-font-size']) ? selRules['min-font-size']['value'] : false;
			
			ele.style.fontSize = '';
			
			var eleFontSize = parseFloat(window.getComputedStyle(ele, null).getPropertyValue('font-size'));
			
			if (min && eleFontSize <= parseFloat(min)) ele.style.fontSize = min; 
			else if (max && eleFontSize >= parseFloat(max)) ele.style.fontSize = max; 
				
		}
	
	}


};

typo.maxFontSize = typo.minFontSize = function (rule) {
	
	typo.minMaxFontSize(rule.selector);
	
	stylefill.binder(window, 'resize', function () { typo.minMaxFontSize(rule.selector); });
		
};

// assign the CSS property to the function
stylefill.init({
	'max-font-size' : typo.maxFontSize,
	'min-font-size' : typo.minFontSize
});