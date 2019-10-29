<div class="cct-banner" style="background-color:{{custrecord_c25_banner_margincolour}};">
{{#if custrecord_c25_banner_bgimage_url}}<img
      src='{{resizeImage custrecord_c25_banner_bgimage_url 'zoom'}}' />{{/if}}

  <div class="cct-banner-inner {{#if drop}}cct-banner-dropcontent{{/if}}"
    style="color:{{custrecord_c25_banner_fgcolour}};">
    
    <div class="cct-banner-inner-container {{#if topbottomonly}} cct-banner-topbottomonly{{/if}}">
      <div class="cct-banner-topcontent {{#if custrecord_c25_banner_topcontent_isempty}}cct-banner-contentempty{{/if}}">{{{custrecord_c25_banner_topcontent}}}</div>
      <div class="cct-banner-contentmiddle">
      <div class="cct-banner-contentleft {{#if custrecord_c25_banner_leftcontent_isempty}}cct-banner-contentempty{{/if}}">{{{custrecord_c25_banner_leftcontent}}}</div>
      <div class="cct-banner-contentright {{#if custrecord_c25_banner_rightcontent_isempty}}cct-banner-contentempty{{/if}}">{{{custrecord_c25_banner_rightcontent}}}</div>
      </div>
      <div class="cct-banner-bottomcontent {{#if custrecord_c25_banner_bottomcontent_isempty}}cct-banner-contentempty{{/if}}">{{{custrecord_c25_banner_bottomcontent}}}</div>
    </div>
  </div>
</div>
