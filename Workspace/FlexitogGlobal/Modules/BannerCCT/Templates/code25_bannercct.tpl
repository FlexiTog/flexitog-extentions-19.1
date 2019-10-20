

  <div class="cct-banner" style="background-color:{{custrecord_c25_banner_margincolour}};">
    
    <div class="cct-banner-inner" style="color:{{custrecord_c25_banner_fgcolour}};background-color:{{custrecord_c25_banner_bgcolour}};">
      {{#if custrecord_c25_banner_bgimage_url}}<img src='{{resizeImage custrecord_c25_banner_bgimage_url 'zoom'}}' />{{/if}}
      <div class="cct-banner-inner-container">
<div class="cct-banner-contentleft">{{{custrecord_c25_banner_leftcontent}}}</div>
<div class="cct-banner-contentright">{{{custrecord_c25_banner_rightcontent}}}</div>
</div>
</div>
  </div>

<!--
<div class="cct-banner">
  <div class="cct-banner-inner"
    style="background-color:{{custrecord_code25_banner_bgcolour}};color:{{custrecord_code25_banner_fgcolour}};{{#if custrecord_code25_banner_bgimage_url}}background-image:url('{{resizeImage custrecord_code25_banner_bgimage_url 'zoom'}}');{{/if}}">
    <div class="cct-banner-inner-container">
      <div>{{custrecord_code25_banner_contentleft}}</div>
      <div>{{custrecord_code25_banner_contentright}}</div>
    </div>
  </div>
</div>



  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->