// code25.GridCCTView, this is the view your cct
// will load after dragged into the application

define('code25.GridCCT.View', [
	'CustomContentType.Base.View'

	, 'code25_gridcct.tpl'

	, 'jQuery', 'underscore'
], function (
	CustomContentTypeBaseView

	, code25_gridcct_tpl

	, jQuery, _
) {
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: code25_gridcct_tpl,
		initialize: function () {

		},
		getContext: function getContext() {

			var blank = ["<h1><br></h1>", "<h2><br></h2>", "<h3><br></h3>", "<h4><br></h4>", "<h5><br></h5>", "<p><br></p>", "<a><br></a>", "<p></p>", "<br>", ""];
			var content = ["custrecord_c25_grid_content1", "custrecord_c25_grid_content2", "custrecord_c25_grid_content3", "custrecord_c25_grid_content4", "custrecord_c25_grid_content5"];
			var hasContent, columns = 0,
				video, hasVideos,image;
			for (var i = 0; i < content.length; i++) {
				hasContent = true;
				video = this.settings["custrecord_c25_grid_video" + (i + 1)];
				image = this.settings["custrecord_c25_grid_bgimage" + (i + 1)];
				if ((!video || video.length == 0)&&(!image||image.length==0)) {
					for (var j = 0; j < blank.length; j++) {
						if (this.settings[content[i]] == blank[j]) {
							hasContent = false;
							break;
						}
					}
				}else if(video&&video.length>0){
					this.settings[content[i] + "_hasvideo"] = true;
					hasVideos = true;
				}else if(image&&image.length>0){
					this.settings[content[i] + "_hasimage"] = true;
				}
				if (!hasContent) {
					this.settings[content[i] + "_isempty"] = true;
				} else {
					columns++;
				}
			}
			this.settings.columnClass = "cct-grid-" + columns + "columns";

			if (hasVideos) {
				//Load video script on the fly. For a little speed increase.
				var videoScriptLoaded = window["videoScriptLoaded"];
				if (!videoScriptLoaded) {
					window["videoScriptLoaded"] = true;
					var scriptTag = document.createElement("script");
					var self = this;
					scriptTag.onload = function (loadEvent) {
						self.render();
					}
					scriptTag.type = "text/javascript";
					scriptTag.src = "https://fast.wistia.com/assets/external/E-v1.js";

					document.getElementsByTagName("head")[0].appendChild(scriptTag);
				}
			}
			if(this.settings["custrecord_c25_grid_bgimage"]&&this.settings["custrecord_c25_grid_bgimage"].length>0){
				this.settings["custrecord_c25_grid_hasbgimage"]=true;
			}
// console.log(this.settings);
			return this.settings;
		}
	});
});