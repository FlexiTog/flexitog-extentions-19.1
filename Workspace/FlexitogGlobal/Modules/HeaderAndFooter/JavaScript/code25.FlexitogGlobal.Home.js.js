/**
 * Description : Override the home view to add SEO.
 * @Author : Gordon Truslove
 * @Date   : 11/6/2019, 10:23:01 AM
 */
define(
    'code25.FlexitogGlobal.Home.View', [

		'SC.Configuration'
	,	'Utilities.ResizeImage'

	,	'home.tpl'

	,	'Backbone'
	,	'jQuery'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Configuration

	,	resizeImage
	,	home_tpl

	,	Backbone
	,	jQuery
	,	_
	,	Utils
	)
{
	'use strict';

	//@module Home.View @extends Backbone.View
	return Backbone.View.extend({

		template: home_tpl

	,	title: _('FlexiTog | Thermal clothing for Cold stores, Freezers and Winter wear').translate()

    ,	page_header: _('FlexiTog | Thermal clothing for Cold stores, Freezers and Winter wear').translate()
    ,	metaDescription: _('UK & Europe’s leading brand for protective coldstore clothing in low & sub-zero tempuratures. Keeping people warm and comfortable since 1976.').translate()

	,	attributes: {
			'id': 'home-page'
		,	'class': 'home-page'
		}

	,	events:
		{
			'click [data-action=slide-carousel]': 'carouselSlide'
		}

	,	initSlider: function initSlider()
		{
			_.initBxSlider(this.$('[data-slider]'), {
				nextText: '<a class="home-gallery-next-icon"></a>'
			,	prevText: '<a class="home-gallery-prev-icon"></a>'
			});
		}

	,	initialize: function ()
		{
			this.windowWidth = jQuery(window).width();
			this.options.application.getLayout().on('afterAppendView', this.initSlider, this);

			var windowResizeHandler = _.throttle(function ()
			{
				if (_.getDeviceType(this.windowWidth) === _.getDeviceType(jQuery(window).width()))
				{
					return;
				}
				this.showContent();

				_.resetViewportWidth();

				this.windowWidth = jQuery(window).width();

			}, 1000);

			this._windowResizeHandler = _.bind(windowResizeHandler, this);

			jQuery(window).on('resize', this._windowResizeHandler);
		}

	,	destroy: function()
		{
			Backbone.View.prototype.destroy.apply(this, arguments);
			jQuery(window).off('resize', this._windowResizeHandler);
			this.options.application.getLayout().off('afterAppendView', this.initSlider, this);
		}

		// @method getContext @return Home.View.Context
	,	getContext: function()
		{
			var carouselImages = _.map(Configuration.get('home.carouselImages', []), function(url)
			{
				return Utils.getAbsoluteUrlOfNonManagedResources(url);
			});

			var bottomBannerImages = _.map(Configuration.get('home.bottomBannerImages', []), function(url)
			{
				return Utils.getAbsoluteUrlOfNonManagedResources(url);
			});

			return {
				// @class Home.View.Context
				// @property {String} imageResizeId
				imageHomeSize: Utils.getViewportWidth() < 768 ? 'homeslider' : 'main'
				// @property {String} imageHomeSizeBottom
			,	imageHomeSizeBottom: Utils.getViewportWidth() < 768 ? 'homecell' : 'main'
				// @property {Array} carouselImages
			,	carouselImages: carouselImages
				// @property {Array} bottomBannerImages
    		,	bottomBannerImages: bottomBannerImages
    			// @class Home.View
			};
		}

	});



});
