/**
 * @Author : Gordon Truslove ()
 * @Link   : 
 * @Date   : 10/15/2019, 3:18:06 PM
 */
// @module Header
define(
	'code25.FlexitogGlobal.Menu', [
		'Profile.Model', 'SC.Configuration', 'Header.Profile.View', 'Header.Menu.MyAccount.View', 'GlobalViews.HostSelector.View', 'GlobalViews.CurrencySelector.View'

		, 'code25_flexitogglobal_menu.tpl'

		, 'Backbone', 'Backbone.CompositeView', 'underscore', 'jQuery', 'jQuery.sidebarMenu'
	],
	function (
		ProfileModel, Configuration, HeaderProfileView, HeaderMenuMyAccountView, GlobalViewsHostSelectorView, GlobalViewsCurrencySelectorView

		, code25_flexitogglobal_menu_tpl

		, Backbone, BackboneCompositeView, _, jQuery
	) {
		'use strict';

		//@class Header.Menu.View @extends Backbone.View
		return Backbone.View.extend({

			template: code25_flexitogglobal_menu_tpl

				,
			events: {
				'mouseenter [data-toggle="categories-menu"]': 'menuOpen',
				'mouseleave [data-toggle="categories-menu"]': 'menuClose',
				'click [data-toggle="categories-menu"]': 'menuClose'
			}

			,
			menuOpen: function (e) {
					jQuery(e.currentTarget).addClass('open');
				}

				,
			menuClose: function (e) {
					jQuery(e.currentTarget).removeClass('open');
				}

				,
			initialize: function () {
					var self = this;
					BackboneCompositeView.add(this);

					this.options.application.on('Configuration.navigationData', this.render, this);

					ProfileModel.getPromise().done(function () {
						self.render();
					});
				}

				,
			childViews: {
				'Header.Profile': function () {
					return new HeaderProfileView({
						showMyAccountMenu: false,
						application: this.options.application
					});
				},
				'Header.Menu.MyAccount': function () {
					return new HeaderMenuMyAccountView(this.options);
				},
				'Global.HostSelector': function () {
					return new GlobalViewsHostSelectorView();
				},
				'Global.CurrencySelector': function () {
					return new GlobalViewsCurrencySelectorView();
				}
			}

			,
			render: function () {
				Backbone.View.prototype.render.apply(this, arguments);
				this.$('[data-type="header-sidebar-menu"]').sidebarMenu();
			},
			findCollections:function(parent, categories) {
				if(parent&&parent.collections){
					return;
				}
				for (var i = 0; i < categories.length; i++) {

					if (categories[i].href&&categories[i].href.indexOf("/collections") > -1) {
						categories[i].collection = true;
						if (parent) {
							parent.collections = parent.collections || [];
							parent.collections.push(categories[i]);
						}
					}
					if(categories[i].categories&&categories[i].categories.length>0){
						this.findCollections(categories[i],categories[i].categories);
					}

				}
			}
			// @method getContext
			// @return {Header.Sidebar.View.Context}
			,
			getContext: function () {
				var profile = ProfileModel.getInstance(),
					is_loading = !Configuration.get('performance.waitForUserProfile', true) && ProfileModel.getPromise().state() !== 'resolved',
					is_loged_in = profile.get('isLoggedIn') === 'T' && profile.get('isGuest') === 'F',
					environment = SC.ENVIRONMENT,
					show_languages = environment.availableHosts && environment.availableHosts.length > 1,
					show_currencies = environment.availableCurrencies && environment.availableCurrencies.length > 1 && !Configuration.get('header.notShowCurrencySelector');
				
				this.findCollections(null, Configuration.navigationData);
				//console.log(Configuration.navigationData);
				// @class Header.Sidebar.View.Context
				return {
					// @property {Array<NavigationData>} navigationItems
					categories: Configuration.navigationData || []
						// @property {Boolean} showExtendedMenu
						,
					showExtendedMenu: !is_loading && is_loged_in
						// @property {Boolean} showLanguages
						,
					showLanguages: show_languages
						// @property {Boolean} showCurrencies
						,
					showCurrencies: show_currencies
				};
			}
		});

	});