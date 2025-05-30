/* Slider 1*/
var	tpj = jQuery;
	if(window.RS_MODULES === undefined) window.RS_MODULES = {};
	if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
	RS_MODULES.modules["revslider11"] = {once: RS_MODULES.modules["revslider11"]!==undefined ? RS_MODULES.modules["revslider11"].once : undefined, init:function() {
		window.revapi1 = window.revapi1===undefined || window.revapi1===null || window.revapi1.length===0  ? document.getElementById("rev_slider_1_1") : window.revapi1;
		if(window.revapi1 === null || window.revapi1 === undefined || window.revapi1.length==0) { window.revapi1initTry = window.revapi1initTry ===undefined ? 0 : window.revapi1initTry+1; if (window.revapi1initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider11"].init()}); return;}
		window.revapi1 = jQuery(window.revapi1);
		if(window.revapi1.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_1_1"); return;}
		revapi1.revolutionInit({
				revapi:"revapi1",
				sliderLayout:"fullwidth",
				visibilityLevels:"1240,1240,778,480",
				gridwidth:"1230,1230,778,480",
				gridheight:"790,790,500,300",
				lazyType:"smart",
				spinner:"spinner0",
				perspective:600,
				perspectiveType:"local",
				editorheight:"790,768,500,300",
				responsiveLevels:"1240,1240,778,480",
				progressBar:{disableProgressBar:true},
				navigation: {
					mouseScrollNavigation:false,
					onHoverStop:false,
					bullets: {
						enable:true,
						tmp:"<span class=\"tp-bullet-image\"></span>",
						style:"hebe",
						hide_onmobile:true,
						hide_under:"767px",
						h_align:"right",
						h_offset:20,
						container:"layergrid"
					}
				},
				viewPort: {
					global:true,
					globalDist:"-200px",
					enable:false,
					visible_area:"20%"
				},
				fallbacks: {
					allowHTML5AutoPlayOnAndroid:true
				},
		});
		
	}} // End of RevInitScript
/* Slider 2*/
var	tpj = jQuery;
	if(window.RS_MODULES === undefined) window.RS_MODULES = {};
	if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
	RS_MODULES.modules["revslider22"] = {once: RS_MODULES.modules["revslider22"]!==undefined ? RS_MODULES.modules["revslider22"].once : undefined, init:function() {
		window.revapi2 = window.revapi2===undefined || window.revapi2===null || window.revapi2.length===0  ? document.getElementById("rev_slider_2_1") : window.revapi2;
		if(window.revapi2 === null || window.revapi2 === undefined || window.revapi2.length==0) { window.revapi2initTry = window.revapi2initTry ===undefined ? 0 : window.revapi2initTry+1; if (window.revapi2initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider22"].init()}); return;}
		window.revapi2 = jQuery(window.revapi2);
		if(window.revapi2.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_2_1"); return;}
		revapi2.revolutionInit({
				revapi:"revapi2",
				sliderLayout:"fullwidth",
				visibilityLevels:"1240,1240,778,480",
				gridwidth:"1230,1230,778,480",
				gridheight:"880,880,600,400",
				lazyType:"smart",
				spinner:"spinner0",
				perspective:600,
				perspectiveType:"local",
				editorheight:"880,768,600,400",
				responsiveLevels:"1240,1240,778,480",
				progressBar:{disableProgressBar:true},
				navigation: {
					mouseScrollNavigation:false,
					onHoverStop:false,
					bullets: {
						enable:true,
						tmp:"<span class=\"tp-bullet-image\"></span>",
						style:"hebe",
						hide_onmobile:true,
						hide_under:"767px",
						h_align:"right",
						v_align:"center",
						h_offset:30,
						v_offset:0,
						direction:"vertical"
					}
				},
				viewPort: {
					global:true,
					globalDist:"-200px",
					enable:false,
					visible_area:"20%"
				},
				fallbacks: {
					allowHTML5AutoPlayOnAndroid:true
				},
		});
		
	}} // End of RevInitScript
/* Slider 3*/
var	tpj = jQuery;
		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider33"] = {once: RS_MODULES.modules["revslider33"]!==undefined ? RS_MODULES.modules["revslider33"].once : undefined, init:function() {
			window.revapi3 = window.revapi3===undefined || window.revapi3===null || window.revapi3.length===0  ? document.getElementById("rev_slider_3_1") : window.revapi3;
			if(window.revapi3 === null || window.revapi3 === undefined || window.revapi3.length==0) { window.revapi3initTry = window.revapi3initTry ===undefined ? 0 : window.revapi3initTry+1; if (window.revapi3initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider33"].init()}); return;}
			window.revapi3 = jQuery(window.revapi3);
			if(window.revapi3.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_3_1"); return;}
			revapi3.revolutionInit({
					revapi:"revapi3",
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1240,778,480",
					gridwidth:"1230,1230,778,480",
					gridheight:"920,920,600,400",
					lazyType:"smart",
					spinner:"spinner0",
					perspective:600,
					perspectiveType:"local",
					editorheight:"920,768,600,400",
					responsiveLevels:"1240,1240,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						mouseScrollNavigation:false,
						onHoverStop:false,
						bullets: {
							enable:true,
							tmp:"<span class=\"tp-bullet-image\"></span>",
							style:"hebe",
							hide_onmobile:true,
							hide_under:"767px",
							h_align:"right",
							v_align:"center",
							h_offset:30,
							v_offset:0,
							direction:"vertical"
						}
					},
					viewPort: {
						global:true,
						globalDist:"-200px",
						enable:false,
						visible_area:"20%"
					},
					fallbacks: {
						allowHTML5AutoPlayOnAndroid:true
					},
			});
			
		}} // End of RevInitScript
		if (window.RS_MODULES.checkMinimal!==undefined) { window.RS_MODULES.checkMinimal();};