/**
 * @Author : Gordon Truslove ()
 * @Link   : 
 * @Date   : 10/15/2019, 3:18:06 PM
 */
/*
	© 2019 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Header
define(
	'code25.FlexitogGlobal.Menu.MyAccount'
,	[
		'SC.Configuration'
		,'Profile.Model'
	,	'code25_flexitogglobal_menu_myaccount.tpl'
	,	'Backbone'
	,	'underscore'
	,	'jQuery'
	,	'ProductList.Utils'
	]
,	function(
		Configuration
		,ProfileModel
	,	code25_flexitogglobal_menu_myaccount_tpl
	,	Backbone
	,	_
	,	jQuery
	,	ProductListUtils
	)
{
	'use strict';

	// @class Header.Profile.View @extends Backbone.View
	return Backbone.View.extend({

		template: code25_flexitogglobal_menu_myaccount_tpl

	,	initialize: function()
		{
			this.productListModule = ProductListUtils(this.options.application);

			this.isProductListEnabled = this.productListModule.isProductListEnabled();

			if (this.isProductListEnabled)
			{
				this.productListsPromise = this.productListModule.getProductListsPromise();

				this.product_list_collection = this.productListModule.getProductLists();
				
				var self = this;

				this.debounced_render = _.debounce(_.bind(this.render, this), 250);

				this.productListsPromise.done(function ()
				{
					_.each(self.product_list_collection.models, function (list)
					{
						list.get('items').on('add remove', function ()
						{
							self.debounced_render();
						}, this);
					}, this);

					self.debounced_render();
				});

				this.product_list_collection.on('add remove change:name', this.debounced_render);
			}
			else
			{
				this.productListsPromise = jQuery.Deferred();
			}
			ProfileModel.getPromise().done(function()
			{
				self.render();
			});
		}

	,	render: function ()
		{
			this._render();

			if (this.$('.header-menu-myaccount-level3-orders').children().length === 1)
			{
				//All children menu of the order section have been removed (lack of permissions) and only the back options is present
				this.$('.header-menu-myaccount-level2-orders').remove();
			}
		}

	,	destroy: function()
		{
			if (this.product_list_collection)
			{
				this.product_list_collection.off('add remove', this.debounced_render);
			}

			this._destroy();
		}

		// @method getContext @return {Header.Profile.View.Context}
	,	getContext: function()
		{

			var profile = ProfileModel.getInstance()
			,	is_loading = !_.getPathFromObject(Configuration, 'performance.waitForUserProfile', true) && ProfileModel.getPromise().state() !== 'resolved'
			,	is_logged_in = (profile.get('isLoggedIn') === 'T' || profile.get('isRecognized') === 'T') && profile.get('isGuest') === 'F';

			if (this.product_list_collection)
			{	
				this.product_list_collection.each(function (product_list)
				{
					var url = 'wishlist/' + (product_list.get('internalid') || 'tmpl_' + product_list.get('templateId'));
					product_list.set('url', url, {silent: true}); 
				}); 
			}
			
			var isSCISIntegrationEnabled = Configuration.get('siteSettings.isSCISIntegrationEnabled', false);
var displayName=profile.get('firstname') || profile.get('lastname');
if(profile.get('firstname') && profile.get('lastname')){
	displayName+=" "+profile.get('lastname');
}
			// @class Header.Profile.View.Context
			return {
				showExtendedMenu: !is_loading && is_logged_in
				// @property {Boolean} isProductListsEnabled
				,isProductListsEnabled: !!this.isProductListEnabled
				// @property {Boolean} isSingleList
			,	isSingleList: !!this.productListModule.isSingleList()
				// @property {Boolean} isCaseModuleEnabled
			,	isCaseModuleEnabled: SC && SC.ENVIRONMENT && SC.ENVIRONMENT.casesManagementEnabled
				// @property {Boolean} productListsReady
			,	productListsReady: this.productListsPromise.state() === 'resolved'	
				// @property {ProductList.Collection|Array} productLists
			,	productLists: this.product_list_collection || []

				// @property {Boolean} purchasesPermissions
			,	purchasesPermissions: isSCISIntegrationEnabled ? 'transactions.tranFind.1,transactions.tranPurchases.1' : 'transactions.tranFind.1,transactions.tranSalesOrd.1'

				// @property {Boolean} returnsPermissions
			,	returnsPermissions: isSCISIntegrationEnabled ? 'transactions.tranFind.1,transactions.tranPurchasesReturns.1' : 'transactions.tranFind.1,transactions.tranRtnAuth.1'
			,companyName:profile.get('companyname')
			,	displayName: displayName
			};
		}
	});

});