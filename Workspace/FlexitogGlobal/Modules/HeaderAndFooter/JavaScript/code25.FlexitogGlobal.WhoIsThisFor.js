define(
    'code25.FlexitogGlobal.WhoIsThisFor', [
        'SC.Configuration', 'Utils', 'Tools', 'jQuery', 'Backbone.CollectionView', 'require', 'Profile.Model', 'Handlebars', 'code25_flexitogglobal_option.tpl', 'code25_flexitogglobal_quickadd.tpl', 'Transaction.Line.Model', 'Product.Option.Model'
    ],
    function (
        Configuration, Utils, Tools, jQuery, BackboneCollectionView, require, ProfileModel, Handlebars, code25_flexitogglobal_option_tpl, code25_flexitogglobal_quickadd_tpl, TransactionLineModel, ProductOptionModel
    ) {
        'use strict';

        return {
            mount: function (container) {

                try {

                    if (SC.ENVIRONMENT.SCTouchpoint == "shopping") {
                        if (require) {

                            //Who is this for?

                            //stop the url loop
                            var ProductDetailsBaseView = require("ProductDetails.Base.View");
                            ProductDetailsBaseView.prototype.updateURL = function updateURL() {
                                var url = this.model.generateURL();
                                var option = url.indexOf("&custcol_c25_whoisthisfor");
                                if (option > -1) {
                                    var end = url.indexOf("&", option + 1);
                                    if (end == -1) {
                                        end = url.length;
                                    }
                                    url = url.substring(0, option) + url.substring(end);
                                }
                                Backbone.history.navigate(url, {
                                    replace: true
                                });
                            }

                            //mixins
                            var closeSuggestions = function (e) {
                                var self = this;
                                var value = self.$el.find(".suggestion-input").val();

                                setTimeout(function () {
                                    self.$el.find(".suggestion-box").hide();
                                    //save value, temp!
                                    var suggestions = self.getSuggestions();



                                    var lvalue = value.toLowerCase();
                                    for (var i = 0; i < suggestions.length; i++) {
                                        if (lvalue == suggestions[i].toLowerCase()) {
                                            return;
                                        }
                                    }
                                    suggestions.push(value);
                                    window.custentity_c25_whoisthisfor_suggestions = suggestions;

                                }, 200);

                            };

                            var getSuggestions = function () {
                                var custentity_c25_whoisthisfor_suggestions = window.custentity_c25_whoisthisfor_suggestions;
                                if (custentity_c25_whoisthisfor_suggestions) {
                                    return custentity_c25_whoisthisfor_suggestions;
                                }

                                var profile = ProfileModel.getInstance(),
                                    is_loading = !Configuration.get('performance.waitForUserProfile', true) && ProfileModel.getPromise().state() !== 'resolved';

                                if ((profile && !is_loading)) {
                                    var customFields = profile.get("customfields") || [];
                                    for (var i = 0; i < customFields.length; i++) {
                                        if (customFields[i].name == "custentity_c25_whoisthisfor_suggestions") {
                                            custentity_c25_whoisthisfor_suggestions = customFields[i].value || "";
                                            window.custentity_c25_whoisthisfor_suggestions = custentity_c25_whoisthisfor_suggestions.split(",");
                                        }
                                    }

                                    return (custentity_c25_whoisthisfor_suggestions || "").split(",");

                                }
                                return [];
                            };

                            var updateSuggestions = function (e) {
                                //console.log(e.target.value);

                                var suggestions = this.getSuggestions();

                                var match = [],
                                    value = e.target.value.toLowerCase();
                                for (var i = 0; i < suggestions.length; i++) {
                                    if ((!value || suggestions[i].toLowerCase().indexOf(value) > -1) && suggestions[i]) {
                                        match.push(suggestions[i]);
                                    }
                                }
                                var $suggestions = this.$el.find(".suggestion-box");

                                if (match.length > 0) {
                                    var body = "<ul class=\"suggestion-list\">";
                                    for (var i = 0; i < match.length; i++) {
                                        body += "<li><a class=\"header-menu-level1-anchor\" onclick=\"var input=(jQuery||$)(this).closest('form').find('.suggestion-input');input.focus();input.val(this.innerHTML);event&&event.preventDefault();\">" + match[i] + "</a></li>";
                                    }
                                    body += "</ul>";
                                    $suggestions.html(body);
                                    $suggestions.show();
                                } else {
                                    $suggestions.hide();
                                }

                            };
                            //quick add in cart.
                            var QuickAddView = require("QuickAdd.View");
                            if (QuickAddView) {


                                _.extend(QuickAddView.prototype, {

                                    initialize: _.wrap(QuickAddView.prototype.initialize, function (initialize, options) {

                                        initialize.apply(this, _.rest(arguments));
                                        this.prefix = "";
                                        this.template = code25_flexitogglobal_quickadd_tpl;
                                        this.events['keyup .suggestion-input'] = 'updateSuggestions';
                                        this.events['focus .suggestion-input'] = 'updateSuggestions';
                                        this.events['blur .suggestion-input'] = 'closeSuggestions';

                                        this.closeSuggestions = closeSuggestions;
                                        this.getSuggestions = getSuggestions;
                                        this.updateSuggestions = updateSuggestions;
                                    })
                                });

                                QuickAddView.prototype.saveForm = function (e) {
                                    e.preventDefault();

                                    Backbone.Validation.bind(this);

                                    this.model.set(this.$('form').serializeObject());

                                    var product = this.model.get('selectedProduct');

                                    if (this.model.isValid(true) && product) {
                                        product.set('quantity', parseInt(this.model.get('quantity'), 10));

                                        var selected_line = new TransactionLineModel(product.toJSON());

                                        selected_line.set('internalid', _.uniqueId('item_line'));
                                        selected_line.set('item', product.getItem().clone());
                                        var options = product.get('options').clone(),
                                            found = false;

                                        var val = $(".suggestion-input").val();
                                        for (var i = 0; i < options.models.length; i++) {
                                            if (options.models[i].get("cartOptionId") == "custcol_c25_whoisthisfor") {
                                                options.models[i].set("value", {
                                                    internalid: val,
                                                    label: val
                                                });
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found) {
                                            var newOption = new ProductOptionModel();

                                            newOption.set("cartOptionId", "custcol_c25_whoisthisfor");
                                            newOption.set("itemOptionId", "");
                                            newOption.set("label", "Who is this for?");
                                            newOption.set("type", "text");
                                            newOption.set("value", {
                                                internalid: val,
                                                label: val
                                            });
                                            newOption.set("values", []);
                                            newOption.set("isMatrixDimension", false);
                                            newOption.set("isMandatory", false);
                                            newOption.set("urlParameterName", "custcol_c25_whoisthisfor");
                                            newOption.set("useLabelsOnUrl", false);
                                            //newOption.set("index",10);

                                            options.add(newOption);

                                        }
                                        selected_line.set('options', options);

                                        //if the item is a matrix we add the parent so when saving the item in a product list (request a quote case)
                                        //we have the parent
                                        if (product.get('item').get('_matrixChilds').length) {
                                            selected_line.get('item').set('_matrixParent', product.get('item'));
                                        }
                                        selected_line.unset('selectedProduct');
                                        selected_line.unset('quickaddSearch');

                                        //@event {QuickAdd.View.SelectedLine.Properties} selectedLine
                                        this.trigger('selectedLine'
                                            //@class QuickAdd.View.SelectedLine.Properties
                                            , {
                                                //@property {Transaction.Line.Model} selectedLine
                                                selectedLine: selected_line
                                            });
                                        //@class QuickAdd.View

                                        this.$('[name="quantity"]').val('');
                                        this.$('[name="quantity"]').attr({
                                            'min': 1
                                        });
                                        this.$('[data-type="quick-add-reset"]').hide();
                                        this.itemsSearcherComponent.cleanSearch();
                                        this.itemsSearcherComponent.setFocus();
                                    }
                                }
                            }
                            //product details.
                            var ProductViewsOptionView = require("ProductViews.Option.View");
                            if (ProductViewsOptionView) {

                                _.extend(ProductViewsOptionView.prototype, {

                                    initialize: _.wrap(ProductViewsOptionView.prototype.initialize, function (initialize, options) {

                                        initialize.apply(this, _.rest(arguments));
                                        this.inModal = this.attributes && this.attributes["data-root-component-id"] == "ProductDetails.QuickView.View";

                                        if (this.inModal) {
                                            this.prefix = "in-modal-";
                                        } else {
                                            this.prefix = "";
                                        }
                                        if (this.options.model.get("cartOptionId") == "custcol_c25_whoisthisfor") {

                                            this.template = code25_flexitogglobal_option_tpl;
                                            this.events = {
                                                'keyup .suggestion-input': 'updateSuggestions',
                                                'focus .suggestion-input': 'updateSuggestions',
                                                'blur .suggestion-input': 'closeSuggestions'
                                            }

                                            this.closeSuggestions = closeSuggestions;
                                            this.getSuggestions = getSuggestions;
                                            this.updateSuggestions = updateSuggestions;
                                        }
                                    })
                                });
                            }
                        }
                    }
                    console.log("Who is this for loaded");
                } catch (err) {
                    console.log(err);
                }
            }
        };
    });