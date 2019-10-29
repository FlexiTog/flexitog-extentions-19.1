define(
	'code25.FlexitogGlobal.Main', [
		'code25.FlexitogGlobal.Header.View', 'Header.Profile.View', 'Footer.View', 'Header.MiniCart.View', 'code25_flexitogglobal_header_profile.tpl', 'code25_flexitogglobal_footer.tpl', 'code25_flexitogglobal_mini_cart.tpl', 'code25.BannerCCT.View', 'code25.AccordionCCT.View', 'code25.GridCCT.View', 'code25.FlexitogGlobal.Countdown.View', 'Facets.FacetedNavigationItem.View', 'code25_flexitogglobal_navitem.tpl', 'Facets.CategoryCell.View', 'code25_flexitogglobal_categorycell.tpl', 'Facets.Browse.View', 'Backbone.CollectionView'
	],
	function (
		HeaderView, HeaderProfileView, FooterView, HeaderMiniCartView, code25_flexitogglobal_header_profile_tpl, code25_flexitogglobal_footer_tpl, code25_flexitogglobal_mini_cart_tpl, code25BannerCCTView, code25AccordionCCTView, code25GridCCTView, CountdownView, FacetedNavigationItemView, code25_flexitogglobal_navitem_tpl, FacetsCategoryCellView, code25_flexitogglobal_categorycell_tpl, FacetsBrowseView, BackboneCollectionView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				// using the 'Layout' component we add a new child view inside the 'Header' existing view 
				// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
				// more documentation of the Extensibility API in
				// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

				var CMS = container.getComponent('CMS');
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

				/** @type {LayoutComponent} */
				var layout = container.getComponent('Layout');

				HeaderProfileView.prototype.template = code25_flexitogglobal_header_profile_tpl;
				FooterView.prototype.template = code25_flexitogglobal_footer_tpl;
				HeaderMiniCartView.prototype.template = code25_flexitogglobal_mini_cart_tpl;
				FacetedNavigationItemView.prototype.template = code25_flexitogglobal_navitem_tpl;
				FacetsCategoryCellView.prototype.template = code25_flexitogglobal_categorycell_tpl;
				//HeaderMiniCartView.prototype.

				layout.addChildView('Countdown', function () {
					return new CountdownView({});
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

				//Header Scroll
				var lastScroll = 0,
					headerScroll = 0;
				window.addEventListener("scroll", event => {

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
				});

				//live chat script

				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.setAttribute("data-jv-id", "kvcK0uHckw");
				script.async=true;
				script.defer=true;
				script.src = '//code.jivosite.com/widget.js';
				
				head.appendChild(script);

			}
		};
	});