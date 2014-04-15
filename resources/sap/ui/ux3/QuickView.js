/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.QuickView");jQuery.sap.require("sap.ui.ux3.library");jQuery.sap.require("sap.ui.commons.CalloutBase");sap.ui.commons.CalloutBase.extend("sap.ui.ux3.QuickView",{metadata:{library:"sap.ui.ux3",properties:{"type":{type:"string",group:"Misc",defaultValue:null},"firstTitle":{type:"string",group:"Misc",defaultValue:null},"firstTitleHref":{type:"string",group:"Misc",defaultValue:null},"secondTitle":{type:"string",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"showActionBar":{type:"boolean",group:"Misc",defaultValue:true},"followState":{type:"sap.ui.ux3.FollowActionState",group:"Misc",defaultValue:sap.ui.ux3.FollowActionState.Default},"flagState":{type:"boolean",group:"Misc",defaultValue:false},"favoriteState":{type:"boolean",group:"Misc",defaultValue:false},"favoriteActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"updateActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"followActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"flagActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"openActionEnabled":{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{"content":{type:"sap.ui.core.Element",multiple:true,singularName:"content"},"actions":{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"action"},"actionBar":{type:"sap.ui.ux3.ActionBar",multiple:false}},events:{"actionSelected":{},"feedSubmit":{},"navigate":{allowPreventDefault:true}}}});sap.ui.ux3.QuickView.M_EVENTS={'actionSelected':'actionSelected','feedSubmit':'feedSubmit','navigate':'navigate'};jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");jQuery.sap.require("sap.ui.ux3.ActionBar");
sap.ui.ux3.QuickView.prototype.init=function(){var a;sap.ui.commons.CalloutBase.prototype.init.call(this);if(!this.getActionBar()){a=new sap.ui.ux3.ActionBar();function o(c){var p=c.getParameters();this.fireActionSelected(p)};a.attachActionSelected(jQuery.proxy(o,this));function b(c){var p=c.getParameters();this.fireFeedSubmit(p)};a.attachFeedSubmit(jQuery.proxy(b,this));this.setAggregation("actionBar",a,true)}};
sap.ui.ux3.QuickView.prototype.onmouseover=function(e){var p=this._getPopup();if(p.isOpen()&&p.getContent()==this){if(this.sCloseNowTimeout){jQuery.sap.clearDelayedCall(this.sCloseNowTimeout);this.sCloseNowTimeout=null}return}sap.ui.core.TooltipBase.prototype.onmouseover.call(this,e)};
sap.ui.ux3.QuickView.prototype.onAfterRendering=function(){var i,f=this.getDomRef(),d=[],I=this.getId();var r=jQuery.sap.byId(I+"-title");d.push(r);r=jQuery.sap.byId(I+"-link");if(!r.length){r=jQuery.sap.byId(I+"-name")}if(!r.length){return}d.push(r);r=jQuery.sap.byId(I+"-descr");if(r.length){d.push(r)}if(!this.oItemNavigation){this.oItemNavigation=new sap.ui.core.delegate.ItemNavigation(null,null,false);this.addDelegate(this.oItemNavigation)}this.oItemNavigation.setRootDomRef(f);this.oItemNavigation.setItemDomRefs(d);this.oItemNavigation.setCycling(false);this.oItemNavigation.setSelectedIndex(1);this.oItemNavigation.setPageSize(d.length)};
sap.ui.ux3.QuickView.prototype.onclick=function(e){var t=e.target;if(!t||!t.hasAttribute("href")){return}if(!this.fireEvent("navigate",{href:t.href},true,false)){e.preventDefault()}};
sap.ui.ux3.QuickView.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation}};
sap.ui.ux3.QuickView.prototype.insertAction=function(a,i){if(this.getActionBar()){this.getActionBar().insertBusinessAction(a,i)}return this};
sap.ui.ux3.QuickView.prototype.addAction=function(a){if(this.getActionBar()){this.getActionBar().addBusinessAction(a)}return this};
sap.ui.ux3.QuickView.prototype.removeAction=function(a){if(this.getActionBar()){this.getActionBar().removeBusinessAction(a)}return this};
sap.ui.ux3.QuickView.prototype.removeAllActions=function(){if(this.getActionBar()){this.getActionBar().removeAllBusinessActions()}return this};
sap.ui.ux3.QuickView.prototype.getActions=function(){if(this.getActionBar()){this.getActionBar().getBusinessActions()}return this};
sap.ui.ux3.QuickView.prototype.destroyActions=function(){if(this.getActionBar()){this.getActionBar().destroyBusinessActions()}return this};
sap.ui.ux3.QuickView.prototype.setFollowState=function(f){if(this.getActionBar()){this.getActionBar().setFollowState(f)}return this};
sap.ui.ux3.QuickView.prototype.getFollowState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFollowState()}return r};
sap.ui.ux3.QuickView.prototype.setFlagState=function(f){if(this.getActionBar()){this.getActionBar().setFlagState(f)}return this};
sap.ui.ux3.QuickView.prototype.getFlagState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFlagState()}return r};
sap.ui.ux3.QuickView.prototype.setFavoriteState=function(f){if(this.getActionBar()){this.getActionBar().setFavoriteState(f)}return this};
sap.ui.ux3.QuickView.prototype.getFavoriteState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFavoriteState()}return r};
sap.ui.ux3.QuickView.prototype.setFavoriteActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFavorite(e)}return this};
sap.ui.ux3.QuickView.prototype.getFavoriteActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFavorite()}return r};
sap.ui.ux3.QuickView.prototype.setFlagActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFlag(e)}return this};
sap.ui.ux3.QuickView.prototype.getFlagActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFlag()}return r};
sap.ui.ux3.QuickView.prototype.setUpdateActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowUpdate(e)}return this};
sap.ui.ux3.QuickView.prototype.getUpdateActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowUpdate()}return r};
sap.ui.ux3.QuickView.prototype.setFollowActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFollow(e)}return this};
sap.ui.ux3.QuickView.prototype.getFollowActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFollow()}return r};
sap.ui.ux3.QuickView.prototype.setOpenActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowOpen(e)}return this};
sap.ui.ux3.QuickView.prototype.getOpenActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowOpen()}return r};
sap.ui.ux3.QuickView.prototype.setIcon=function(i){this.setProperty("icon",i);if(this.getActionBar()){this.getActionBar().setThingIconURI(i)}return this};
sap.ui.ux3.QuickView.prototype.setActionBar=function(a){this.setAggregation("actionBar",a,true);if(this.getIcon()&&this.getActionBar()){this.getActionBar().setThingIconURI(this.getIcon())}return this};
