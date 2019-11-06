<div class="order-wizard-paymentmethod-purchasenumber-module">
	<h3 class="order-wizard-paymentmethod-purchasenumber-module-title">
		{{translate 'Purchase Order Number'}}
	</h3>
	<div class="order-wizard-paymentmethod-purchasenumber-module-row">
		<label for="purchase-order-number"
			class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-label">
			{{translate 'Enter Purchase Order Number'}} <span class="address-edit-fields-group-label-required">*</span>
		</label>
		<div>
			<input type="text" name="purchase-order-number" id="purchase-order-number"
				class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-value"
				value="{{purchaseNumber}}">
			{{#if error}}
			 <p data-validation-error="block">Purchase Order Number is required</p>
			{{/if}}
		</div>
	</div>
</div>

<div class="order-wizard-paymentmethod-purchasenumber-module">
	<h3 class="order-wizard-paymentmethod-purchasenumber-module-title">
		{{translate 'Ordered By'}}
	</h3>
	<div class="order-wizard-paymentmethod-purchasenumber-module-row">
		<label for="purchase-order-number"
			class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-label">
			{{translate 'Please enter your full name'}} <span class="address-edit-fields-group-label-required">*</span>
		</label>
		<input type="text" name="custbody_weborder_placed_by" id="custbody_weborder_placed_by"
			class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-value"
			value="{{model.options.custbody_weborder_placed_by}}">
	</div>
</div>

{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}