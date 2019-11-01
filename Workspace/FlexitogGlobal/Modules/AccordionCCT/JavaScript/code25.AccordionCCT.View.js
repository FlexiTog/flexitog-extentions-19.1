// code25.AccordionCCTView, this is the view your cct
// will load after dragged into the application

define('code25.AccordionCCT.View', [
	'CustomContentType.Base.View'

	, 'code25_accordioncct.tpl'

	, 'jQuery', 'underscore'
], function (
	CustomContentTypeBaseView

	, code25_accordioncct_tpl

	, jQuery, _
) {
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: code25_accordioncct_tpl,
		initialize: function () {
			
		},	events: {
			'click [data-action="show-accordion"]': 'showAccordion'
		}
		,showAccordion:function(e){
			var current=jQuery(e.target).closest(".cct-accordion")[0];
			jQuery(".cct-accordion").each(function(){
				var $this=jQuery(this);
				var $columns=$this.find(".cct-accordion-columns");
				if(this==current){
					$this.toggleClass("open");
					$columns.slideToggle();
				}else{
					$this.removeClass("open");
					$columns.slideUp();
				}
				
			});
		}
		,
		getContext: function getContext() {
			
			var blank = ["<h1><br></h1>","<h2><br></h2>","<h3><br></h3>","<h4><br></h4>","<h5><br></h5>","<p><br></p>", "<a><br></a>","<p></p>", "<br>", ""];
			var content = ["custrecord_c25_accordion_content1", "custrecord_c25_accordion_content2", "custrecord_c25_accordion_content3"];
			var hasContent,columns=0;
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
				}else{
					columns++;
				}
			}
			this.settings.columnClass="cct-accordion-"+columns+"columns";
			//console.log(this.settings);
			
			return this.settings;
		}
	});
});