/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'vuesax-lais\'">' + entity + '</span>' + html;
	}
	var icons = {
		'vl-marker': '&#xe91b;',
		'vl-marker-2': '&#xe91c;',
		'vl-marker-3': '&#xe91d;',
		'vl-marker-4': '&#xe91e;',
		'vl-dose-check': '&#xe900;',
		'vl-dose-syringe': '&#xe901;',
		'vl-dose': '&#xe902;',
		'vl-flu': '&#xe903;',
		'vl-lung': '&#xe904;',
		'vl-polio': '&#xe905;',
		'vl-quick-access': '&#xe906;',
		'vl-situation-room': '&#xe907;',
		'vl-syringe-02-check': '&#xe908;',
		'vl-syringe-02': '&#xe909;',
		'vl-syringe-03-check': '&#xe90a;',
		'vl-syringe-03': '&#xe90b;',
		'vl-syringe-04-check': '&#xe90c;',
		'vl-syringe-04': '&#xe90d;',
		'vl-syringe-add': '&#xe90e;',
		'vl-syringe-broken': '&#xe90f;',
		'vl-syringe-check': '&#xe910;',
		'vl-syringe-close': '&#xe911;',
		'vl-syringe-edit': '&#xe912;',
		'vl-syringe-time': '&#xe913;',
		'vl-syringe': '&#xe914;',
		'vl-test-tube-virus': '&#xe915;',
		'vl-test-tube': '&#xe916;',
		'vl-vaccination-date': '&#xe917;',
		'vl-vaccination-monitoring': '&#xe918;',
		'vl-vaccine-card': '&#xe919;',
		'vl-virus': '&#xe91a;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/vl-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
