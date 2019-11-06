define(
	'code25.FlexitogGlobal.Main', [
		'Utils', 'code25.FlexitogGlobal.Header.View', 'Header.Profile.View', 'Footer.View', 'Header.MiniCart.View', 'code25_flexitogglobal_header_profile.tpl', 'code25_flexitogglobal_footer.tpl', 'code25_flexitogglobal_mini_cart.tpl', 'code25.BannerCCT.View', 'code25.AccordionCCT.View', 'code25.GridCCT.View', 'code25.FlexitogGlobal.Countdown.View', 'Facets.FacetedNavigationItem.View', 'code25_flexitogglobal_navitem.tpl', 'Facets.CategoryCell.View', 'code25_flexitogglobal_categorycell.tpl', 'Facets.Browse.View', 'Backbone.CollectionView', 'require', 'code25.FlexitogGlobal.Home.View'
	],
	function (
		Utils, HeaderView, HeaderProfileView, FooterView, HeaderMiniCartView, code25_flexitogglobal_header_profile_tpl, code25_flexitogglobal_footer_tpl, code25_flexitogglobal_mini_cart_tpl, code25BannerCCTView, code25AccordionCCTView, code25GridCCTView, CountdownView, FacetedNavigationItemView, code25_flexitogglobal_navitem_tpl, FacetsCategoryCellView, code25_flexitogglobal_categorycell_tpl, FacetsBrowseView, BackboneCollectionView, require, HomeView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				// using the 'Layout' component we add a new child view inside the 'Header' existing view 
				// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
				// more documentation of the Extensibility API in
				// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

				try {
					var CMS = container.getComponent('CMS');
					//Custom content types
					CMS.registerCustomContentType({
						id: 'c25_banner',
						view: code25BannerCCTView
					});
					CMS.registerCustomContentType({
						id: 'c25_accordion',
						view: code25AccordionCCTView
					});
					CMS.registerCustomContentType({
						id: 'c25_grid',
						view: code25GridCCTView
					});


					//translation
					var environmentComponent = container.getComponent('Environment');
					var lang = ['en', 'en_US', 'en_GB'];
					for (var i = 0; i < lang.length; i++) {
						// environmentComponent.setTranslation(lang[i], [{
						// 	key: 'Welcome to the store',
						// 	value: 'FlexiTog | Thermal clothing for Cold stores, Freezers and Winter wear'
						// }]);
						environmentComponent.setTranslation(lang[i], [{
							key: 'Add to Wishlist',
							value: 'Add to Product List'
						}]);
						environmentComponent.setTranslation(lang[i], [{
							key: 'Added to Wishlist',
							value: 'Added to Product List'
						}]);
						environmentComponent.setTranslation(lang[i], [{
							key: "My Wishlist",
							value: 'My Product List'
						}]);
						environmentComponent.setTranslation(lang[i], [{
							key: 'Wishlist',
							value: 'Product List'
						}]);
					}


					/** @type {LayoutComponent} */
					var layout = container.getComponent('Layout');
					//add custom templates to extisting views.
					HeaderProfileView.prototype.template = code25_flexitogglobal_header_profile_tpl;
					FooterView.prototype.template = code25_flexitogglobal_footer_tpl;
					HeaderMiniCartView.prototype.template = code25_flexitogglobal_mini_cart_tpl;
					FacetedNavigationItemView.prototype.template = code25_flexitogglobal_navitem_tpl;
					FacetsCategoryCellView.prototype.template = code25_flexitogglobal_categorycell_tpl;
					//HeaderMiniCartView.prototype.

					layout.addChildView('Countdown', function () {
						return new CountdownView({});
					});
//extend the category cells to include an active value and optional siblings.
					_.extend(FacetsCategoryCellView.prototype, {
						getContext: _.wrap(FacetsCategoryCellView.prototype.getContext, function (getContext, options) {
							var res = getContext.apply(this, _.rest(arguments));
							res.active=this.model.get("active");
								return res;
							})
						});

					//show siblings when there are no sub categories
					FacetsBrowseView.prototype.childViews['Facets.CategoryCells'] = function () {
						var catmodel = this.model.get('category');
						var catllist = [];
						if (catmodel) {
							catllist = catmodel.get('categories') || [];
							if (catllist.length == 0) {
								catllist = catmodel.get('siblings') || [];
							}
						}
						//console.log(Backbone.history.fragment);
						for(var i=0;i<catllist.length;i++){
							catllist[i].active=catllist[i].fullurl=="/"+Backbone.history.fragment;
						}
						
						return new BackboneCollectionView({
							childView: FacetsCategoryCellView,
							collection: catllist
						});

					}



					//HomeView.prototype.title=_('FlexiTog | Thermal clothing for Cold stores, Freezers and Winter wear').translate();

					if (layout) {
						layout.registerView('Header', function () {
							return new HeaderView({
								application: container
							});
						});
					}
					//override the home page type.
					var pageType = container.getComponent('PageType');

					pageType.registerPageType({
						'name': 'home-page',
						'routes': ['', '?*params'],
						'view': HomeView,
						'defaultTemplate': {
							'name': 'home.tpl',
							'displayName': 'Home Default',
							'thumbnail': Utils.getAbsoluteUrl('img/default-layout-home.png')
						}
					});

					//Header Scroll
					var lastScroll = 0,
						headerScroll = 0;

					//handle animation on scroll.
					function animate(element, reset) {
						var $this = jQuery(element);
						if (reset) {
							$this.removeClass("ft-animate-play")
						}
						if (!$this.hasClass("ft-animate-play")) {

							var $parent = jQuery(parent);

							var win = $(window);



							$this.find("h1,h2,h3,h4,h5,h6,p").each(function () {
								var $el = $(this);
								var top = $el.offset().top;
								if (top < win.scrollTop() + win.height() - 50) {
									$this.addClass("ft-animate-play");
								}
							});

						}
					}

					function jAnimate(reset) {
						jQuery(".ft-animate").each(function () {
							animate(this, reset);
						});
					}

					function jAnimateReset(reset) {
						jAnimate(true);
					}
					window.addEventListener("scroll", function (event) {

						var doc = document.documentElement;
						var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
						var diff = top - lastScroll;
						diff /= 2; //Divide differenct by 2 for a clearer visual experience.
						lastScroll = top;
						var header = document.getElementById("site-header");
						var headerHeight = header.clientHeight + 20; //20 is for the logo hanging down
						headerScroll -= diff;
						if (headerScroll > 0) {
							headerScroll = 0;
						} else if (headerScroll < -headerHeight) {
							headerScroll = -headerHeight;
						}
						header.style.marginTop = headerScroll + "px";

						jAnimate();

					});
					//make sure the animation is checked when the cms changes.
					Backbone.on("landing-page-rendered", function () {
						window.setTimeout(jAnimateReset, 100); // Wait a bit
						window.setTimeout(jAnimateReset, 500); //Just in case there is a delay
					});


					//live chat script

					var head = document.getElementsByTagName('head')[0];
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.setAttribute("data-jv-id", "kvcK0uHckw");
					script.async = true;
					script.defer = true;
					script.src = '//code.jivosite.com/widget.js';

					head.appendChild(script);

					//These changes are not global, just shopping or checkout etc.
					//Set the home description. This is an optional module!
					if (SC.ENVIRONMENT.SCTouchpoint == "shopping") {
						if (require) {
							// var HomeView = require("Home.View");
							// if (HomeView) {
							// 	HomeView.prototype.metaDescription = _("UK & Europe’s leading brand for protective coldstore clothing in low & sub-zero tempuratures. Keeping people warm and comfortable since 1976.").translate();
							// }
							var CookieWarningBannerView = require("CookieWarningBanner.View");
							if (CookieWarningBannerView) {
								//Add cookie to new header
								HeaderView.addChildViews({
									'Message.Placeholder': function wrapperFunction() {
										return function () {
											return new CookieWarningBannerView({
												application: container
											});
										};
									}
								});
							}
						}
					} else if (SC.ENVIRONMENT.SCTouchpoint == "checkout") {
						// Override some PO numbers to add validation.

						var OrderWizardModulePaymentMethodPurchaseNumber = require("OrderWizard.Module.PaymentMethod.PurchaseNumber");
						if (OrderWizardModulePaymentMethodPurchaseNumber) {

							OrderWizardModulePaymentMethodPurchaseNumber.prototype.submit = function () {

								var purchase_order_number = this.$('[name=purchase-order-number]').val() || '';

								this.wizard.model.set('purchasenumber', purchase_order_number);
								if (purchase_order_number.length > 0) {
									this.error = false;
									this.render();
									return jQuery.Deferred().resolve();
								} else {
									this.error = true;
									this.render();
									return jQuery.Deferred().reject();
								}

							}
							OrderWizardModulePaymentMethodPurchaseNumber.prototype.getContext = function () {
								return {
									//@property {String} purchaseNumber
									purchaseNumber: this.wizard.model.get('purchasenumber'),
									error: this.error

								};
							}
						}
					}

				} catch (err) {
					console.log(err);
				}
			}
		};
	});