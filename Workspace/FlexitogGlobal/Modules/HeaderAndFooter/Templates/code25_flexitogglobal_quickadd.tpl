<div class="quick-add-box">
    <form novalidate action="#">
        <div class="quick-add-box-left" data-input="quickaddSearch" data-validation="control-group">
            <label for="quickaddSearch">{{itemTitle}}</label>
            <div class="quick-add-box-input" data-validation="control">
                <div class="quick-add-box-input-search" data-view="ItemsSearcher"></div>
                <a class="quick-add-box-input-search-reset" data-type="quick-add-reset">
                    <i class="quick-add-box-input-search-reset-icon"></i>
                </a>
            </div>
        </div>
        <div class="quick-add-float">
            <label class="product-views-option-text-label" for="{{cartOptionId}}">
                {{translate "Who is this for?"}} <span class="ft-price-vat">({{ translate "optional"}})</span>
                <a id="header-contact-us" href="#" class="header-subheader-settings-link" data-toggle="dropdown">
                    <i class="sc-tooltip" data-action="help"></i>
                </a>
                <div class="suggestion-help product-details-information-tab-content-container">
                    {{translate '<h3>Who is this for?</h3><p>This field is <b>optional</b>. Information added into this field will appear against the item on your sales orders/ delivery note and invoice.</p><p><b>Process for adding multiple names for items.</b></p><p>If you require multiple items with different names then you will need to add the items one at a time entering a new name on each item you add.</p><ul><li>Select your size</li><li>Include your name</li><li>Select Quantity (1) or as many as you are purchasing for that wearer</li><li>Add the item to the cart</li><li>Repeat the process as required for each new person/wearer.</li></ul>'}}
                </div>
            </label>
            <input name="custcol_c25_whoisthisfor" type="text" id="custcol_c25_whoisthisfor"
                class="product-views-option-text-input suggestion-input" autocomplete="false"
                placeholder="{{translate 'Add a person/wearers name…'}}">
            <div id="suggestions" class="suggestion-box"></div>
        </div>
        <div class="quick-add-float" data-input="quickaddSearch" data-validation="control-group">
            <label for="quantity" class="quick-add-input-quantity">{{quantityTitle}}</label>
            <div class="quick-add-box-right-main">
                <div class="quick-add-box-right-input" data-validation="control">
                    <div class="quick-add-box-right-actionable-input-qty">
                        <button type="button" class="quick-add-box-right-quantity-remove" data-action="minus">-</button>
                        <input data-type="quantity-input" type="number" name="quantity" id="quantity"
                            class="quick-add-box-right-quantity-value" min="1">
                        <button type="button" class="quick-add-box-right-quantity-add" data-action="plus">+</button>
                    </div>
                    <small class="quick-add-box-minimum-top" data-type="minimum-quantity"></small>
                </div>

                <button class="quick-add-box-button" type="submit">{{translate 'Add Item'}}</button>
                <small class="quick-add-box-minimum-bottom" data-type="minimum-quantity"></small>
            </div>
        </div>
    </form>
</div>



{{!----
Use the following context variables when customizing this template:

	itemTitle (String)
	quantityTitle (String)

----}}