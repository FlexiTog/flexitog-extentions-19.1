// code25.BannerCCTView, this is the view your cct
// will load after dragged into the application

define('code25.BannerCCT.View'
,	[
		'CustomContentType.Base.View'

	,	'code25_bannercct.tpl'

	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView

	,	code25_bannercct_tpl

	,	jQuery
	,	_
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: code25_bannercct_tpl,
		initialize: function ()
		{
			
		}
	,	getContext: function getContext()
		{
			console.log(this.settings);
			
			return this.settings;
		}
	});
});