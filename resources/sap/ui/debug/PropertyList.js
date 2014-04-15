/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.debug.PropertyList");jQuery.sap.require("jquery.sap.strings");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.base.DataType");jQuery.sap.require("sap.ui.core.Element");jQuery.sap.require("sap.ui.core.Core");sap.ui.base.EventProvider.extend("sap.ui.debug.PropertyList",{constructor:function(c,w,p){sap.ui.base.EventProvider.apply(this,arguments);this.oWindow=w;this.oParentDomRef=p;this.oCore=c;this.bEmbedded=top.window==w;this.mProperties={};var t=this;jQuery(p).bind("click",function(e){t.onclick(e)}).bind("focusin",function(e){t.onfocus(e)}).bind("keydown",function(e){t.onkeydown(e)});if(!this.bEmbedded){jQuery(p).bind("mouseover",function(e){t.onmouseover(e)}).bind("mouseout",function(e){t.onmouseout(e)})}this.oParentDomRef.style.border="solid 1px gray";this.oParentDomRef.style.padding="2px"}});
sap.ui.debug.PropertyList.prototype.exit=function(){jQuery(this.oParentDomRef).unbind()};
sap.ui.debug.PropertyList.prototype.update=function(p){var c=p.getParameter("controlId");this.oParentDomRef.innerHTML="";var C=this.oCore.getElementById(c);if(!C){this.oParentDomRef.innerHTML="Please select a valid control";return}if(!C.getMetadata||!C.getMetadata()){this.oParentDomRef.innerHTML="Control does not provide Metadata.";return}this.mProperties={};var m=C.getMetadata(),h=[];h.push("<span data-sap-ui-quickhelp='"+this._calcHelpId(m)+"'>Type : "+m.getName()+"</span><br >");h.push("Id : "+C.getId()+"<br >");h.push("<button id='sap-debug-propertylist-apply' sap-id='"+c+"' style='border:solid 1px gray;background-color:#d0d0d0;font-size:8pt;'>Apply Changes</button>");if(!this.bEmbedded){h.push("<div id='sap-ui-quickhelp' style='position:fixed;display:none;padding:5px;background-color:rgb(200,220,231);border:1px solid gray;overflow:hidden'>Help</div>")}h.push("<div style='border-bottom:1px solid gray'>&nbsp;</div><table cellspacing='1' style='font-size:8pt;width:100%;table-layout:fixed'>");while(m instanceof sap.ui.core.ElementMetadata){var P=m.getProperties();var H=false;if(!jQuery.isEmptyObject(P)){if(!H&&m!==C.getMetadata()){h.push("<tr><td colspan=\"2\">BaseType: ");h.push(m.getName());h.push("</td></tr>");H=true}m.getJSONKeys();this.printProperties(h,C,P)}var P=this.getAggregationsAsProperties(m);if(!jQuery.isEmptyObject(P)){if(!H&&m!==C.getMetadata()){h.push("<tr><td colspan=\"2\">BaseType: ");h.push(m.getName());h.push("</td></tr>");H=true}m.getJSONKeys();this.printProperties(h,C,P)}m=m.getParent()}h.push("</table>");this.oParentDomRef.innerHTML=h.join("");this.mHelpDocs={}};
sap.ui.debug.PropertyList.prototype.getAggregationsAsProperties=function(m){function i(t){if(!t){return false}if(t.indexOf("[]")>0){t=t.substring(t.indexOf("[]"))}if(t==="boolean"||t==="string"||t==="int"||t==="float"){return true}if(t==="void"){return false}return false}var r={};for(var a in m.getAggregations()){var A=m.getAggregations()[a];if(A.altTypes&&A.altTypes[0]&&i(A.altTypes[0])){r[a]={name:a,type:A.altTypes[0],_oParent:A._oParent}}}return r};
sap.ui.debug.PropertyList.prototype.printProperties=function(h,c,p,a){for(var i in p){var N=i,t=p[i].type,m=c["get"+N];if(!m){N=jQuery.sap.charToUpperCase(N,0)}var v=c["get"+N]();h.push("<tr><td>");this.mProperties[N]=t;h.push("<span data-sap-ui-quickhelp='",this._calcHelpId(p[i]._oParent,i),"' >",N,'</span>');h.push("</td><td>");if(t=="string"||t=="int"||t=="float"||jQuery.sap.endsWith(t,"[]")){var C='',T='';if(v===null){C='color:#a5a5a5;';v='(null)'}else if(v instanceof sap.ui.core.Element){C='color:#a5a5a5;';if(jQuery.isArray(v)){v=v.join(", ")}else{v=v.toString()}T=' title="This aggregation currently references an Element. You can set a '+t+' value instead"'}h.push("<input type='text' style='width:100%;font-size:8pt;background-color:#f5f5f5;"+C+"' value='"+jQuery.sap.escapeHTML(""+v)+"'"+T+" sap-name='"+N+"'/>")}else if(t=="boolean"){h.push("<input type='checkbox' sap-name='"+N+"' ");if(v==true){h.push("checked='checked'")}h.push("/>")}else if(t!="void"){var e=jQuery.sap.getObject(t);if(!e||e instanceof sap.ui.base.DataType){h.push("<input type='text' style='width:100%;font-size:8pt;background-color:#f5f5f5;' value='"+jQuery.sap.escapeHTML(""+v)+"'"+T+" sap-name='"+N+"'/>")}else{h.push("<select style='width:100%;font-size:8pt;background-color:#f5f5f5;' sap-name='"+N+"'>");t=t.replace("/",".");for(var n in e){h.push("<option ");if(n==v){h.push(" selected ")}h.push("value='"+t+"."+n+"'>");h.push(n);h.push("</option>")}h.push("</select>")}}else{h.push("&nbsp;")}h.push("</td></tr>")}};
sap.ui.debug.PropertyList.prototype.onkeydown=function(e){if(e.keyCode==13){this.applyChanges("sap-debug-propertylist-apply")}};
sap.ui.debug.PropertyList.prototype.onclick=function(e){var s=e.target;if(s.id=="sap-debug-propertylist-apply"){this.applyChanges("sap-debug-propertylist-apply")}};
sap.ui.debug.PropertyList.prototype.onfocus=function(e){var s=e.target;if(s.tagName==="INPUT"&&s.getAttribute("sap-name")){if(s.style.color==='#a5a5a5'){s.style.color='';s.value=''}}};
sap.ui.debug.PropertyList.prototype.applyChanges=function(sId){var oSource=this.oParentDomRef.ownerDocument.getElementById(sId),sControlId=oSource.getAttribute("sap-id"),oControl=this.oCore.getElementById(sControlId),aInput=oSource.parentNode.getElementsByTagName("INPUT"),aSelect=oSource.parentNode.getElementsByTagName("SELECT");for(var i=0;i<aInput.length;i++){var oInput=aInput[i],sName=oInput.getAttribute("sap-name");oMethod=oControl["set"+sName];if(!oMethod){sName=jQuery.sap.charToUpperCase(sName,0)}if(oControl["set"+sName]){var oType=sap.ui.base.DataType.getType(this.mProperties[sName]);var vValue=this.mProperties[sName]==="boolean"?oInput.checked:oType.parseValue(oInput.value);if(oType.isValid(vValue)&&vValue!=="(null)"){oControl["set"+sName](vValue)}}}for(var i=0;i<aSelect.length;i++){var oSelect=aSelect[i],sName=oSelect.getAttribute("sap-name"),oMethod=oControl["set"+sName];if(!oMethod){sName=jQuery.sap.charToUpperCase(sName,0)}var oValue=null;if(oSelect.value){eval("oValue = "+oSelect.value);oControl["set"+sName](oValue)}}this.oCore.applyChanges()};
sap.ui.debug.PropertyList.prototype.showQuickHelp=function(s){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined}var t=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(t){this.sCurrentHelpId=s.getAttribute("data-sap-ui-quickhelp");var r=jQuery(s).rect();t.style.left=(r.left+40+10)+"px";t.style.top=(r.top-40)+"px";t.style.display='block';t.style.opacity='0.2';t.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity=20)';if(this.mHelpDocs[this.sCurrentHelpId]){this.updateQuickHelp(this.mHelpDocs[this.sCurrentHelpId],2000)}else{t.innerHTML="<b>Quickhelp</b> for "+this.sCurrentHelpId+" is being retrieved...";this.sCurrentHelpDoc=this.sCurrentHelpId;this.sCurrentHelpDocPart=undefined;if(this.sCurrentHelpId.indexOf('#')>=0){this.sCurrentHelpDoc=this.sCurrentHelpId.substring(0,this.sCurrentHelpId.indexOf('#'));this.sCurrentHelpDocPart=this.sCurrentHelpId.substring(this.sCurrentHelpId.indexOf('#')+1)}var u=this.oWindow.jQuery.sap.getModulePath(this.sCurrentHelpDoc,".control");var a=this;jQuery.ajax({async:true,url:u,dataType:'xml',error:function(x,b){a.receiveQuickHelp(undefined)},success:function(d){a.receiveQuickHelp(d)}});this.oQuickHelpTimer=setTimeout(function(){a.hideQuickHelp()},2000)}}};
sap.ui.debug.PropertyList.prototype.receiveQuickHelp=function(d){if(d){var c=d.getElementsByTagName("control")[0];if(c){var g=function(x,N){var r=[];var C=x.firstChild;while(C){if(N===C.nodeName){r.push(C)}C=C.nextSibling};return r};var n=g(c,"name");var N='';if(n[0]){N=n[0].text||n[0].textContent}var D=g(c,"documentation");if(D[0]){if(N&&D[0]){var a=[];a.push("<div style='font-size:10pt;font-weight:bold;padding:5px 0px;margin-bottom:5px;border-bottom:1px solid gray'>",N.replace('/','.'),"</div>");a.push("<div style='padding:2px 0px;'>",D[0].text||D[0].textContent,"</div>");this.mHelpDocs[this.sCurrentHelpDoc]=a.join("")}}var p=g(c,"properties");if(p[0]){p=g(p[0],"property")}for(var i=0,l=p.length;i<l;i++){var P=p[i];var N=P.getAttribute("name");var t=P.getAttribute("type")||"string";var s=P.getAttribute("defaultValue")||"empty/undefined";var D=g(P,"documentation");if(N&&D[0]){var a=[];a.push("<div style='font-size:10pt;font-weight:bold;padding:3px 0px;margin-bottom:3px;border-bottom:1px solid gray'>",N,"</div>");a.push("<div style='padding:2px 0px;'><i><strong>Type</strong></i>: ",t,"</div>");a.push("<div style='padding:2px 0px;'>",D[0].text||D[0].textContent,"</div>");a.push("<div style='padding:2px 0px;'><i><strong>Default Value</strong></i>: ",s,"</div>");this.mHelpDocs[this.sCurrentHelpDoc+"#"+N]=a.join("")}};var p=g(c,"aggregations");if(p[0]){p=g(p[0],"aggregation")}for(var i=0,l=p.length;i<l;i++){var P=p[i];var N=P.getAttribute("name");var t=P.getAttribute("type")||"sap.ui.core/Control";var s=P.getAttribute("defaultValue")||"empty/undefined";var D=g(P,"documentation");if(N&&D[0]&&!this.mHelpDocs[this.sCurrentHelpDoc+"#"+N]){var a=[];a.push("<div style='font-size:10pt;font-weight:bold;padding:3px 0px;margin-bottom:3px;border-bottom:1px solid gray'>",N,"</div>");a.push("<div style='padding:2px 0px;'><i><strong>Type</strong></i>: ",t,"</div>");a.push("<div style='padding:2px 0px;'>",D[0].text||D[0].textContent,"</div>");a.push("<div style='padding:2px 0px;'><i><strong>Default Value</strong></i>: ",s,"</div>");this.mHelpDocs[this.sCurrentHelpDoc+"#"+N]=a.join("")}}}if(this.mHelpDocs[this.sCurrentHelpId]){this.updateQuickHelp(this.mHelpDocs[this.sCurrentHelpId],2000)}else{this.updateQuickHelp(undefined,0)}}else{this.updateQuickHelp(undefined,0)}};
sap.ui.debug.PropertyList.prototype.updateQuickHelp=function(n,t){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined}var T=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(T){if(!n){T.innerHTML="<i>No quick help...</i>";;T.style.display='none'}else{T.innerHTML=n;var a=this;this.oQuickHelpTimer=setTimeout(function(){a.hideQuickHelp()},t)}}};
sap.ui.debug.PropertyList.prototype.hideQuickHelp=function(){var t=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(t){t.style.display='none'}this.bMovedOverTooltip=false};
sap.ui.debug.PropertyList.prototype._calcHelpId=function(m,n){var h=m.getName();if(n){h=h+"#"+n}return h};
sap.ui.debug.PropertyList.prototype._isChildOfQuickHelp=function(d){while(d){if(d.id==="sap-ui-quickhelp"){return true}d=d.parentNode};return false};
sap.ui.debug.PropertyList.prototype.onmouseover=function(e){var s=e.target;if(this._isChildOfQuickHelp(s)){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined}this.bMovedOverTooltip=true;var t=this.oParentDomRef.ownerDocument.getElementById("sap-ui-quickhelp");if(t){t.style.opacity='';t.style.filter=''}}else if(s.getAttribute("data-sap-ui-quickhelp")){this.showQuickHelp(s)}};
sap.ui.debug.PropertyList.prototype.onmouseout=function(e){var s=e.target;if(this._isChildOfQuickHelp(s)){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined}this.bMovedOverTooltip=false;var t=this;this.oQuickHelpTimer=setTimeout(function(){t.hideQuickHelp()},50)}else if(s.getAttribute("data-sap-ui-quickhelp")){if(this.oQuickHelpTimer){clearTimeout(this.oQuickHelpTimer);this.oQuickHelpTimer=undefined}if(!this.bMovedOverTooltip){var t=this;this.oQuickHelpTimer=setTimeout(function(){t.hideQuickHelp()},800)}}};
