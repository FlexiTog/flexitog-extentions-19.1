define(
    'code25.FlexitogGlobal.Register', [
        'SC.Configuration', 'Utils', 'Tools', 'jQuery', 'Backbone.CollectionView', 'require', 'Profile.Model', 'Handlebars', 'code25_flexitogglobal_register.tpl'
    ],
    function (
        Configuration, Utils, Tools, jQuery, BackboneCollectionView, require, ProfileModel, Handlebars, code25_flexitogglobal_register_tpl
    ) {
        'use strict';

        return {
            mount: function (container) {

                try {

                    if (SC.ENVIRONMENT.SCTouchpoint == "checkout") {
                        if (require) {
                            var LoginRegisterView = require("LoginRegister.View");
                            if (LoginRegisterView) {
                                _.extend(LoginRegisterView.prototype, {

                                    initialize: _.wrap(LoginRegisterView.prototype.initialize, function (initialize, options) {

                                        initialize.apply(this, _.rest(arguments));
                                        //this.enableRegister = true;

                                        if (!document.getElementById("recaptcha")) {
                                            var script = document.createElement('script');
                                            script.id = 'recaptcha';
                                            script.type = 'text/javascript';
                                            script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf4D7gZAAAAAOCq2Gb3kc9pRoQ6rYnb3IozOQil';
                                            document.getElementsByTagName('head')[0].appendChild(script);
                                        }


                                    })
                                });
                            }

                            var LoginRegisterRegisterView = require("LoginRegister.Register.View");

                            if (LoginRegisterRegisterView) {
                                LoginRegisterRegisterView.prototype.template = code25_flexitogglobal_register_tpl;

                                LoginRegisterRegisterView.prototype.submitForm = function (e, model, props) {
                                    e.preventDefault();
                                    var self = this;
                                    var data = jQuery(e.target).closest('form').serializeObject();

                                    grecaptcha.ready(function () {
                                        grecaptcha.execute('6Lf4D7gZAAAAAOCq2Gb3kc9pRoQ6rYnb3IozOQil', {
                                            action: 'submit'
                                        }).then(function (token) {
                                            // Add your logic to submit to your backend server here.
                                            console.log("Captcha " + token);
                                           // model.set("token",token);
                                           
                                           //
                                           //data.token=token;
                                           console.log(self);
                                           self.$el.find("#token").val(token);
                                           
                                            return self.cancelableTrigger('before:LoginRegister.register', data)
                                                .then(function () {
                                        //             console.log("model",model);
                                        //    console.log("props",props);
                                        //    console.log("data",data);
                                        //    console.log("e",e);
                                           
                                                    self.saveForm(e, model, props);
                                                });

                                        });
                                    });


                                    


                                }
                            }
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
    });