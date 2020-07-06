
define(
	'code25.FlexitogGlobal.Main', [
		'SC.Configuration', 'Utils', 'Tools', 'jQuery', 'code25.FlexitogGlobal.Header.View', 'Header.Profile.View', 'Footer.View', 'Header.MiniCart.View', 'code25_flexitogglobal_header_profile.tpl', 'code25_flexitogglobal_footer.tpl', 'code25_flexitogglobal_mini_cart.tpl', 'code25.BannerCCT.View', 'code25.AccordionCCT.View', 'code25.GridCCT.View', 'code25.FlexitogGlobal.Countdown.View', 'Facets.FacetedNavigationItem.View', 'code25_flexitogglobal_navitem.tpl', 'Facets.CategoryCell.View', 'code25_flexitogglobal_categorycell.tpl', 'Facets.Browse.View', 'Backbone.CollectionView', 'require', 'code25.FlexitogGlobal.Home.View', 'Profile.Model', 'Handlebars', 'code25.FlexitogGlobal.WhoIsThisFor'
	],
	function (
		Configuration, Utils, Tools, jQuery, HeaderView, HeaderProfileView, FooterView, HeaderMiniCartView, code25_flexitogglobal_header_profile_tpl, code25_flexitogglobal_footer_tpl, code25_flexitogglobal_mini_cart_tpl, code25BannerCCTView, code25AccordionCCTView, code25GridCCTView, CountdownView, FacetedNavigationItemView, code25_flexitogglobal_navitem_tpl, FacetsCategoryCellView, code25_flexitogglobal_categorycell_tpl, FacetsBrowseView, BackboneCollectionView, require, HomeView, ProfileModel, Handlebars, code25FlexitogGlobalWhoIsThisFor
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
						try {
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
						} catch (e) {
							console.log(e);
						}
					}

					//handlebars to create simplified text
					Handlebars.registerHelper('simplify', function (text) {
						var text = text || "",
							char, body = "";
						for (var i = 0; i < text.length; i++) {
							char = text.charAt(i);
							if (char.toLowerCase() != char.toUpperCase()) {
								body += char;
							} else {
								body += " ";
							}
						}
						return body;
					})


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
							res.active = this.model.get("active");
							return res;
						})
					});


					//show siblings when there are no sub categories
					FacetsBrowseView.prototype.childViews['Facets.CategoryCells'] = function () {
						//console.log(this.translator.getCategoryUrl());
						var catmodel = this.model.get('category');
						var catllist = [];
						if (catmodel) {
							catllist = catmodel.get('categories') || [];
							if (catllist.length == 0) {
								catllist = catmodel.get('siblings') || [];
							}
						}
						//console.log(Backbone.history.fragment);
						for (var i = 0; i < catllist.length; i++) {
							catllist[i].active = catllist[i].fullurl == "/" + Backbone.history.fragment;
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
					// if (SC.ENVIRONMENT.SCTouchpoint == "shopping") {
					// 	var pageType = container.getComponent('PageType');

					// 	pageType.registerPageType({
					// 		'name': 'home-page',
					// 		'routes': ['', '?*params'],
					// 		'view': HomeView,
					// 		'defaultTemplate': {
					// 			'name': 'home.tpl',
					// 			'displayName': 'Home Default',
					// 			'thumbnail': Utils.getAbsoluteUrl('img/default-layout-home.png')
					// 		}
					// 	});
					// }

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
						code25FlexitogGlobalWhoIsThisFor.mount(container);
						}
					} else if (SC.ENVIRONMENT.SCTouchpoint == "checkout") {

						//filter the payment methods
						// var CreditCardEditFormView=require('CreditCard.Edit.Form.View');
						// _.extend(CreditCardEditFormView.prototype, {
						// 	getContext: _.wrap(CreditCardEditFormView.prototype.getContext, function (getContext, options) {
						// 		var res = getContext.apply(this, _.rest(arguments));
						// 		// console.log("credit card context!",res);
						// 		// console.log("paymentMethods",JSON.stringify(res.paymentMethods));
						// 		//paymentMethods

						// 		var currency = SC.ENVIRONMENT && SC.ENVIRONMENT.currentCurrency && SC.ENVIRONMENT.currentCurrency.internalid;
						// 		var session_currency = SC.SESSION && SC.SESSION.currency && SC.SESSION.currency.internalid;

						// 		var currentCurrency = session_currency || currency;
						// 		var match="," + currentCurrency + ",";
						// 		//console.log(match);
						// 		for (var i = res.paymentMethods.length - 1; i >= 0; i--) {
						// 			if (res.paymentMethods[i].key.indexOf(match)==-1) {
						// 				res.paymentMethods.splice(i,1);
						// 			}
						// 		}

						// 		return res;
						// 	})
						// });

						// Override some PO numbers to add validation.

						var WizardStep = require("Wizard.Step");
						if (WizardStep) {
							WizardStep.prototype.showError = function () {
								try {
									if (this.error) {
										console.log("Checkout Error:", this.error);
										var msg = this.error.errorMessage;
										var code = this.error.errorCode;
										if (code == "ERR_WS_UNHANDLED_ERROR") {
											if (msg && msg.indexOf("An error has occurred") > -1) {
												console.log("Error Message:", msg);
												console.log("Error Code:", code);
											} else {
												// var global_view_message = new GlobalViewsMessageView({
												// 	message: this.wizard.processErrorMessage(this.error.errorMessage),
												// 	type: 'error',
												// 	closable: true
												// });

												// this.$('[data-type="alert-placeholder-step"]').html(global_view_message.render().$el.html());

												// jQuery('body').animate({
												// 	scrollTop: jQuery('body .global-views-message-error:first').offset().top
												// }, 600);

												if (msg.indexOf("rejected") > -1 || msg.indexOf("payment") > -1 || msg.indexOf("merchant") > -1 || msg.indexOf("processing") > -1) {
													msg = "We were unable to process this payment.<br /><br /><ol><li>Check the payment and address details have been entered correctly.</li><li>Check the account has sufficient funds.</li><li>Try a different card.</li><li>Contact us for assistance.</li></ol>";
												}
												//purchase-order-number
												Tools.showErrorInModal(container, _("Unable to Continue").translate(), msg);
											}
										}
										this.error = null;
									}
								} catch (e) {
									console.log(e);
								}
							}
						}

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

								//add name to empty purchased by value.
								var profile = ProfileModel.getInstance(),
									is_loading = !Configuration.get('performance.waitForUserProfile', true) && ProfileModel.getPromise().state() !== 'resolved';

								if (profile && !is_loading) {
									var options = this.wizard.model.get("options");
									if (!options || options.custbody_weborder_placed_by == "") {

										var firstname = profile.get("firstname");
										var lastname = profile.get("lastname");
										options.custbody_weborder_placed_by = firstname || lastname;
										if (firstname && lastname) {
											options.custbody_weborder_placed_by += " " + lastname;
										}

									}
								}
								//include error
								return {
									//@property {String} purchaseNumber
									purchaseNumber: this.wizard.model.get('purchasenumber'),
									error: this.error

								};
							}
						}
					}
					//IE BUG

					console.log("Flexitog Extension Loaded");
				} catch (err) {
					console.log(err);
				}
			}
		};
	});