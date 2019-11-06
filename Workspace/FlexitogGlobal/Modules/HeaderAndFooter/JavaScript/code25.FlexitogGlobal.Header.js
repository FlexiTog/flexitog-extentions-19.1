/*
	© 2019 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Header
define(
	'code25.FlexitogGlobal.Header.View', [
		'SC.Configuration', 'Profile.Model', 'Header.MiniCart.View', 'Header.MiniCartSummary.View', 'code25.FlexitogGlobal.Profile', 'code25.FlexitogGlobal.Menu', 'GlobalViews.HostSelector.View', 'GlobalViews.CurrencySelector.View'

		, 'code25_flexitogglobal_header.tpl', 'header_sidebar.tpl'

		, 'jQuery', 'Backbone', 'Backbone.CompositeView', 'underscore', 'Utils', 'SiteSearch.View', 'code25_flexitogglobal_sitesearch.tpl'
	],
	function (
		Configuration, ProfileModel, HeaderMiniCartView, HeaderMiniCartSummaryView, HeaderProfileView, HeaderMenuView, GlobalViewsHostSelectorView, GlobalViewsCurrencySelectorView

		, code25_flexitogglobal_header_tpl, header_sidebar_tpl


		, jQuery, Backbone, BackboneCompositeView, _, Utils, SiteSearchView, code25_flexitogglobal_sitesearch_tpl
	) {
		'use strict';

		// @class Header.View @extends Backbone.View
		return Backbone.View.extend({

			template: code25_flexitogglobal_header_tpl

				,
			events: {
				'click [data-action="show-sitesearch"]': 'showSiteSearch' //Keeping to be backward compatible
					,
				'click [data-action="header-sidebar-show"]': 'showSidebar',
				'click [data-action="header-sidebar-hide"]': 'hideSidebar',
				'click [data-type="header-sidebar-menu"]': 'hideSidebar',
				'click .header-menu-level1-anchor': 'clickTopLevel',
				'click .header-menu-level2-anchor': 'hideSidebar',
				'mouseenter #header-quick-link':'startHover',
				'mousemove #header-quick-link':'startHover',
				'mouseleave #header-quick-link':'stopHover',
				'mouseenter #header-cart-link':'startHover',
				'mousemove #header-cart-link':'startHover',
				'mouseleave #header-cart-link':'stopHover'
				
			}
,startHover:function(e){
	var self=this;
	if(this.hoverTimeout){
	clearTimeout(this.hoverTimeout);
	}
	this.hoverTimeout=setTimeout(function(){self.isHover(e);},100)
}
,stopHover:function(){
	clearTimeout(this.hoverTimeout);
}
,isHover:function(e){
	e.target.click();
}
			,
			initialize: function () {
					Backbone.history.on('all', this.verifyShowSiteSearch, this);
				}
				// @method showMiniCart
				//@return {Void}
				,
			showMiniCart: function () {
					this.$('[data-type="mini-cart"]').parent().addClass('open');
				}
				//Keeping this here to be backward compatible with themes prior to 2018.2.0
				,
			showSiteSearch: function (ev) {
					ev && ev.preventDefault();
					// This add a class 'active' to change button color
					this.$('[data-action="show-sitesearch"]').toggleClass('active');
					this.$('[data-type="SiteSearch"]').toggle();
					this.getChildViewInstance('SiteSearch').showSiteSearch();
				}
				//Keeping this here to be backward compatible with themes prior to 2018.2.0, do not use this!
				,
			hideSiteSearch: function () {
					// This hide Sitesearch div
					this.$('[data-type="SiteSearch"]').hide();
				}
				//Keeping this here to be backward compatible with themes prior to 2018.2.0, do not use this!
				,
			verifyShowSiteSearch: function () {
				if (this.$('[data-action="show-sitesearch"]').length > 0) {
					var hash = Backbone.history.getFragment() || '';
					hash = hash.indexOf('?') === -1 ? hash : hash.substring(0, hash.indexOf('?'));
					var is_home = hash === '' || hash === '/';

					if (Utils.getDeviceType() !== 'desktop' && is_home) {
						this.showSiteSearch(null, true);
					} else {
						// This hide sitesearch when navigate
						this.hideSiteSearch();
					}
				}
			},
			clickTopLevel: function (e) {
					var mobileMenu = jQuery(".header-sidebar-toggle-wrapper").css("display") == "block";
					if (mobileMenu) {
						
						e.preventDefault();
						e.stopPropagation();
						var Li=jQuery(e.target).closest('li');
						var currentLi=Li[0];
						Li.parent().find("li").each(function(){
							if(this!=currentLi){
								$(this).removeClass("ft-mobile-sub-cat");
								$(this).find(".header-menu-level-mobile-container").slideUp();
							}
						});
						Li.toggleClass("ft-mobile-sub-cat");
						Li.find(".header-menu-level-mobile-container").slideToggle();

					} else {
						
						this.hideSidebar(e);
					}
				}
				// @method showSidebar
				//@return {Void}
				,
			showSidebar: function () {
					jQuery('#main').addClass('header-sidebar-opened');
				}

				// @method hideSidebar
				//@return {Void}
				,
			hideSidebar: function (e) {
					if (e.target.tagName === 'A') {
						if (this.activeLink) {
							this.activeLink.removeClass('active');
						}
						this.activeLink = jQuery(e.target);
						this.activeLink.addClass('active');
					}
					jQuery('#main').removeClass('header-sidebar-opened');
				}

				,
			childViews: {
				'Header.SiteSearch': function () {
					var search = new SiteSearchView({
						application: this.options.application,
						header: true
					});
					search.template = code25_flexitogglobal_sitesearch_tpl;
					return search;
				},
				'Header.MiniCart': function () {
					return new HeaderMiniCartView();
				},
				'Header.MiniCartSummary': function () {
					return new HeaderMiniCartSummaryView();
				},
				'Header.Profile': function () {
					var password_protected_site = SC.ENVIRONMENT.siteSettings.siteloginrequired === 'T';
					var isLoggedIn = ProfileModel.getInstance().get('isLoggedIn') === 'T';
					if (!password_protected_site || isLoggedIn) {
						var header_profile_view_options = _.extend({
							showMyAccountMenu: true,
							application: this.options.application
						}, this.options.headerProfileViewOptions || {});
						return new HeaderProfileView(header_profile_view_options);
					} else {
						return null;
					}
				},
				'Header.Menu': function () {
					var header_view_options = _.extend({
						application: this.options.application
					}, this.options.headerProfileViewOptions || {});

					return new HeaderMenuView(header_view_options);
				},
				'Global.HostSelector': function () {
					return new GlobalViewsHostSelectorView();
				},
				'Global.CurrencySelector': function () {
					return new GlobalViewsCurrencySelectorView();
				}
			}

			// @method getContext
			// @return {Header.View.Context}
			,
			getContext: function getContext() {
					var environment = SC.ENVIRONMENT,
						show_languages = environment.availableHosts && environment.availableHosts.length > 1,
						show_currencies = environment.availableCurrencies && environment.availableCurrencies.length > 1 && !Configuration.get('header.notShowCurrencySelector');

					// @class Header.View.Context
					return {
						// @property {Profile.Model} profileModel
						profileModel: ProfileModel.getInstance()
							// @property {Boolean} showLanguages
							,
						showLanguages: show_languages
							// @property {Boolean} showCurrencies
							,
						showCurrencies: show_currencies
							// @property {Boolean} showLanguagesOrCurrencies
							,
						showLanguagesOrCurrencies: show_languages || show_currencies
							// @property {Boolean} showLanguagesAndCurrencies
							,
						showLanguagesAndCurrencies: show_languages && show_currencies
							// @property {Boolean} isHomeTouchpoint
							,
						isHomeTouchpoint: Configuration.currentTouchpoint === 'home'
							// @property {String} cartTouchPoint
							,
						cartTouchPoint: Configuration.get('modulesConfig.Cart.startRouter', false) ? Configuration.currentTouchpoint : 'viewcart'
					};
					// @class Header.View
				}

				//@method destroy Override default destroy method to clean navigation event handlers
				//@return {Void}
				,
			destroy: function () {
				Backbone.View.prototype.destroy.apply(this, arguments);
				Backbone.history.off('all', this.verifyShowSiteSearch);
			}
		});

	});