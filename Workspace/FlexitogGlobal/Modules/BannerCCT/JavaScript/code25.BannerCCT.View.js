// code25.BannerCCTView, this is the view your cct
// will load after dragged into the application

define('code25.BannerCCT.View', [
	'CustomContentType.Base.View'

	, 'code25_bannercct.tpl'

	, 'jQuery', 'underscore'
], function (
	CustomContentTypeBaseView

	, code25_bannercct_tpl

	, jQuery, _
) {
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: code25_bannercct_tpl,
		initialize: function () {

		},
		getContext: function getContext() {
			// ben was here testing
			var blank = ["<h1><br></h1>","<h2><br></h2>","<h3><br></h3>","<h4><br></h4>","<h5><br></h5>","<p><br></p>", "<a><br></a>","<p></p>", "<br>", ""];
			var content = ["custrecord_c25_banner_topcontent", "custrecord_c25_banner_leftcontent", "custrecord_c25_banner_rightcontent", "custrecord_c25_banner_bottomcontent"];
			var hasContent;
			for (var i = 0; i < content.length; i++) {
				hasContent = true;
				for (var j = 0; j < blank.length; j++) {
					if (this.settings[content[i]] == blank[j]) {
						hasContent = false;
						break;
					}
				}
				if (!hasContent) {
					this.settings[content[i] + "_isempty"] = true;
				}
			}
			if(this.settings.custrecord_c25_banner_leftcontent_isempty&&this.settings.custrecord_c25_banner_rightcontent_isempty){
				this.settings.topbottomonly=true;	
			}
			if(this.settings["custrecord_c25_banner_bgvideo_mp4"]&&this.settings["custrecord_c25_banner_bgvideo_mp4"].length>0&&this.settings["custrecord_c25_banner_bgvideo_webm"]&&this.settings["custrecord_c25_banner_bgvideo_webm"].length>0){
				this.settings["custrecord_c25_benner_hasvideo"]=true;
			}
			this.settings.drop=this.settings.custrecord_c25_banner_dropcontent=="T";
			//console.log(this.settings);
			
			return this.settings;
		}
	});
});