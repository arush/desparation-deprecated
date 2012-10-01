function recurlyTooltip(){var e={id:"popover","class":"popover top"},t={id:"arrow","class":"arrow"},n={id:"popover-inner","class":"popover-inner"},r={id:"popover-title","class":"popover-title"},i={id:"popover-content","class":"popover-content"},s=new Element("div",e),o=new Element("div",t),u=new Element("div",n),a=new Element("h3",r);a.update("Return Like a Man&trade; (+£2.49)");var f=new Element("p",i);f.update("<p>Choose this and we'll arrange a free, fully insured courier to come pick up anything you want to return or exchange. Otherwise, no dramas, just post it back to us yourself if you want to return anything.</p>");jQuery(".add_ons.any").prepend(s);jQuery("#popover").append(o);jQuery("#popover").append(u);jQuery("#popover-inner").append(a);jQuery("#popover-inner").append(f);jQuery(".add_on_return-like-a-man").hover(function(){jQuery("#popover").fadeIn(500)},function(){jQuery("#popover").fadeOut(500)})}function recurlyPostProcess(e){var t=jQuery.noConflict(),n,r,i;if(t.cookie("basket")!=null){basketExists=!0;n=t.parseJSON(t.cookie("basket"));r=n.basket;t(".add_on").hide();t(".add_ons .quantity .placeholder").html("")}else basketExists=!1;var s=!1;if(basketExists){n.frequency==="trial"&&(s=!0);t("#recurlyDiv .recurring_cost .cost").hide();s&&t("#recurlyDiv .plan .interval").html("billed only once");var o,u;for(o=0;o<r.length;o++){u=".add_on_";u+=r[o].recurlyCode;if(r[o].qty>0){t(u+" .quantity input").val(r[o].qty);t(u+" .name").prepend(document.createTextNode(r[o].qty+"x "));t(u).show();t("#opc-payment").hasClass("active")&&t(u).click()}t(u).removeClass("add_on").addClass("add_on_readonly");t(u+" .quantity input").remove()}}var a=document.getElementById("shipping:country_id"),f=a.options[a.selectedIndex].value;if(f==="GB"){t("#opc-payment").hasClass("active")&&t(".add_on_ship-uk").click();t(".add_on_ship-uk").removeClass("add_on").addClass("add_on_readonly");t(".add_on_ship-uk").show()}else if(f==="AT"||f==="BE"||f==="DE"||f==="DK"||f==="ES"||f==="FI"||f==="FR"||f==="FO"||f==="GR"||f==="GL"||f==="IE"||f==="IT"||f==="LU"||f==="NL"||f==="PT"||f==="SE"){t("#opc-payment").hasClass("active")&&t(".add_on_ship-eu-west").click();t(".add_on_ship-eu-west").removeClass("add_on").addClass("add_on_readonly");t(".add_on_ship-eu-west").show()}else if(f==="BG"||f==="CY"||f==="CZ"||f==="EE"||f==="HU"||f==="LT"||f==="LV"||f==="MT"||f==="PL"||f==="RO"||f==="SK"||f==="SI"){t("#opc-payment").hasClass("active")&&t(".add_on_ship-eu-east").click();t(".add_on_ship-eu-east").removeClass("add_on").addClass("add_on_readonly");t(".add_on_ship-eu-east").show()}else{t("#opc-payment").hasClass("active")&&t(".add_on_ship-intl").click();t(".add_on_ship-intl").removeClass("add_on").addClass("add_on_readonly");t(".add_on_ship-intl").show()}t(".recurly .coupon .check").click(function(){var e=t("input.coupon_code").val();_kmq.push(["set",{"Coupon used":e}])})}function doFade(e){count=0;nextLi=parseInt(e);e="#"+e;fadeThings=jQuery("#popup-slide").children("ul").children("li").eq(nextLi).find(".fadein");var t=fadeThings.size(),n;timer=setInterval(function(){if(count>=t)clearInterval(timer);else{n=fadeThings.eq(count);startFade(n);count++}},500)}function startFade(e){jQuery(e).animate({opacity:1},500)}var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string,r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();document.observe("dom:loaded",function(){$$(".sliders .holder .slider").each(function(e){var t=e.select("ul li").length*parseInt(e.select("ul li")[0].getStyle("width")),n=parseInt(e.getStyle("margin-left"));n+=parseInt(e.getStyle("margin-right"));e.setStyle({width:t+n+100+"px"})});$$(".sliders .holder .left").each(function(e){e.observe("click",function(){var t=e.up().firstDescendant().firstDescendant().childElements()[e.up().firstDescendant().firstDescendant().childElements().length-1],n=document.createElement("li");n.innerHTML=t.innerHTML;t.remove();e.up().firstDescendant().firstDescendant().insert({top:n});t=n;t.setStyle({marginLeft:parseInt(t.getStyle("width"))*-1+"px"});var r=parseInt(t.getStyle("margin-left")),i=r+parseInt(t.getStyle("width"));new Effect.Tween(t,r,i,{duration:.2},function(e){this.setStyle({marginLeft:e+"px"})})})});$$(".sliders .holder .right").each(function(e){e.observe("click",function(){var t=e.up().firstDescendant().firstDescendant().firstDescendant(),n=parseInt(t.getStyle("margin-left")),r=n+parseInt(t.getStyle("width"))*-1;new Effect.Tween(t,n,r,{duration:.2,afterFinish:function(){var n=document.createElement("li");n.innerHTML=t.innerHTML;t.remove();e.up().firstDescendant().firstDescendant().insert(n)}},function(e){this.setStyle({marginLeft:e+"px"})})})})});var count;