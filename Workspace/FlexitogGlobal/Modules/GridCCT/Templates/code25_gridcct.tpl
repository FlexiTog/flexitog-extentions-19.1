<div class="cct-grid {{custrecord_c25_grid_class}}" style="background-color:{{custrecord_c25_grid_margincolour}};{{#if custrecord_c25_grid_hasbgimage}}background-image:url('{{custrecord_c25_grid_bgimage_url}}');{{/if}}">

  <div class="cct-grid-inner"
    style="color:{{custrecord_c25_grid_fgcolour}};background-color:{{custrecord_c25_grid_bgcolour}};">

    <div class="cct-grid-columns">
      {{#if custrecord_c25_grid_title}}
      <h2 class="cct-grid-title">{{custrecord_c25_grid_title}}</h2>
      {{/if}}
      <div class="{{columnClass}} {{#if custrecord_c25_grid_content1_isempty}}cct-grid-contentempty{{/if}}">
        {{#if custrecord_c25_grid_content1_hasimage}}
        <img class="cct-grid-image" src="{{resizeImage custrecord_c25_grid_bgimage1_url 'main'}}" />

        <div class="cct-grid-content">
          {{/if}}
          {{#if custrecord_c25_grid_content1_hasvideo}}
          <div class="cct-grid-video">
            <script src="https://fast.wistia.com/embed/medias/{{custrecord_c25_grid_video1}}.jsonp" async></script>
            </script>
            <div class="cct-grid-video-responsive">
              <span
                class="wistia_embed wistia_async_{{custrecord_c25_grid_video1}} cct-grid-video-inner popover=true popoverAnimateThumbnail=true">&nbsp;</span>
            </div>
          </div>
          {{/if}}
          <div>{{{custrecord_c25_grid_content1}}}</div>
          {{#if custrecord_c25_grid_content1_hasimage}}
        </div>
        {{/if}}
      </div>
      <div class="{{columnClass}} {{#if custrecord_c25_grid_content2_isempty}}cct-grid-contentempty{{/if}}">
        {{#if custrecord_c25_grid_content2_hasimage}}
        <img class="cct-grid-image" src="{{resizeImage custrecord_c25_grid_bgimage2_url 'main'}}" />

        <div class="cct-grid-content">
          {{/if}}
          {{#if custrecord_c25_grid_content2_hasvideo}}
          <div class="cct-grid-video">
            <script src="https://fast.wistia.com/embed/medias/{{custrecord_c25_grid_video2}}.jsonp" async></script>
            </script>
            <div class="cct-grid-video-responsive">
              <span
                class="wistia_embed wistia_async_{{custrecord_c25_grid_video2}} cct-grid-video-inner popover=true popoverAnimateThumbnail=true">&nbsp;</span>
            </div>
          </div>
          {{/if}}
          <div>{{{custrecord_c25_grid_content2}}}</div>
          {{#if custrecord_c25_grid_content2_hasimage}}
        </div>
        {{/if}}
      </div>
      <div class="{{columnClass}} {{#if custrecord_c25_grid_content3_isempty}}cct-grid-contentempty{{/if}}">
        {{#if custrecord_c25_grid_content3_hasimage}}
        <img class="cct-grid-image" src="{{resizeImage custrecord_c25_grid_bgimage1_url 'main'}}" />

        <div class="cct-grid-content">
          {{/if}}
          {{#if custrecord_c25_grid_content3_hasvideo}}
          <div class="cct-grid-video">
            <script src="https://fast.wistia.com/embed/medias/{{custrecord_c25_grid_video3}}.jsonp" async></script>
            </script>
            <div class="cct-grid-video-responsive">
              <span
                class="wistia_embed wistia_async_{{custrecord_c25_grid_video3}} cct-grid-video-inner popover=true popoverAnimateThumbnail=true">&nbsp;</span>
            </div>
          </div>
          {{/if}}
          <div>{{{custrecord_c25_grid_content3}}}</div>
          {{#if custrecord_c25_grid_content3_hasimage}}
        </div>
        {{/if}}
      </div>
      <div class="{{columnClass}} {{#if custrecord_c25_grid_content4_isempty}}cct-grid-contentempty{{/if}}">
        {{#if custrecord_c25_grid_content4_hasimage}}
        <img class="cct-grid-image" src="{{resizeImage custrecord_c25_grid_bgimage1_url 'main'}}" />

        <div class="cct-grid-content">
          {{/if}}
          {{#if custrecord_c25_grid_content4_hasvideo}}
          <div class="cct-grid-video">
            <script src="https://fast.wistia.com/embed/medias/{{custrecord_c25_grid_video4}}.jsonp" async></script>
            </script>
            <div class="cct-grid-video-responsive">
              <span
                class="wistia_embed wistia_async_{{custrecord_c25_grid_video4}} cct-grid-video-inner popover=true popoverAnimateThumbnail=true">&nbsp;</span>
            </div>
          </div>
          {{/if}}
          {{#if custrecord_c25_grid_content4_hasimage}}
          <div>{{{custrecord_c25_grid_content4}}}</div>
          {{/if}}
        </div>
      </div>
      <div class="{{columnClass}} {{#if custrecord_c25_grid_content5_isempty}}cct-grid-contentempty{{/if}}">
        {{#if custrecord_c25_grid_content5_hasimage}}
        <img class="cct-grid-image" src="{{resizeImage custrecord_c25_grid_bgimage1_url 'main'}}" />

        <div class="cct-grid-content">
          {{/if}}
          {{#if custrecord_c25_grid_content5_hasvideo}}
          <div class="cct-grid-video">
            <script src="https://fast.wistia.com/embed/medias/{{custrecord_c25_grid_video5}}.jsonp" async></script>
            </script>
            <div class="cct-grid-video-responsive">
              <span
                class="wistia_embed wistia_async_{{custrecord_c25_grid_video5}} cct-grid-video-inner popover=true popoverAnimateThumbnail=true">&nbsp;</span>
            </div>
          </div>
          {{/if}}
          <div>{{{custrecord_c25_grid_content5}}}</div>
          {{#if custrecord_c25_grid_content5_hasimage}}
        </div>
        {{/if}}
      </div>
    </div>

  </div>
</div>