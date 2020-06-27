<div id="{{cartOptionId}}-container" class="product-views-option-text" data-type="option" data-cart-option-id="{{cartOptionId}}" data-item-option-id="{{itemOptionId}}">
	<div class="{{cartOptionId}}-controls-group" data-validation="control-group">
		{{#if showLabel}}
			<label class="product-views-option-text-label" for="{{cartOptionId}}">
				{{label}} {{#if showRequiredLabel}}<span class="product-views-option-text-label-required">*</span>{{/if}}
<a id="header-contact-us" href="#" class="header-subheader-settings-link" data-toggle="dropdown">
				<i class="sc-tooltip" data-action="help"></i>
				</a>
<div class="suggestion-help product-details-information-tab-content-container">
	{{translate '<h3>Who is this for?</h3><p>This field is <b>optional</b>. Information added into this field will appear against the item on your sales orders/ delivery note and invoice.</p><p>Adding multiple names for an item.</p><p>If you require multiple items with different names then you will need to add the items one at a time entering a new name on each item you add.</p><ul><li>Select your size</li><li>Include your name</li><li>Select Quantity (1) or as many as you are purchasing for that wearer</li><li>Add the item to the cart</li><li>Repeat the process as required for each new person/wearer.</li></ul><p>Nb: If you order a name badge logos for your jackets then the name entered here will be used for the logo.</p>'}}
</div>
			</label>
		{{/if}}
		<div data-validation="control">
			{{#if isTextArea}}
				<textarea
					name="{{cartOptionId}}"
					id="{{cartOptionId}}"
					class="product-views-option-text-area"
					data-toggle="text-option"
					data-available="true"
					data-id="{{itemOptionId}}">{{#if showSelectedValue}}{{selectedValue.internalId}}{{/if}}</textarea>
			{{else}}
			
				<input
					name="{{cartOptionId}}"
					type="{{#if isEmail}}email{{else}}text{{/if}}"
					id="{{cartOptionId}}"
					class="product-views-option-text-input suggestion-input"
					value="{{#if showSelectedValue}}{{selectedValue.internalId}}{{/if}}"
					data-toggle="text-option"
					data-id="{{itemOptionId}}"
					data-available="true"
					autocomplete="false"
					placeholder="{{translate 'Add a person/wearers name…'}}">
					<div id="suggestions" class="suggestion-box"></div>
			{{/if}}
		</div>
	</div>
</div>



{{!----
Use the following context variables when customizing this template: 
	
	model (Object)
	model.cartOptionId (String)
	model.itemOptionId (String)
	model.label (String)
	model.type (String)
	values (Array)
	showSelectedValue (Boolean)
	showRequiredLabel (Boolean)
	itemOptionId (String)
	cartOptionId (String)
	label (String)
	selectedValue (Object)
	isTextArea (Boolean)
	isEmail (Boolean)
	isText (Boolean)
	isCheckbox (Boolean)
	isDate (Boolean)
	isSelect (Boolean)
	showLabel (Boolean)
	showSmall (Boolean)

----}}
