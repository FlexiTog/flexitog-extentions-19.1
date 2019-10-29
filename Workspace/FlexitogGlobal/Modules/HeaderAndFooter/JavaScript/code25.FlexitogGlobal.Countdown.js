/**
 * Description : Countdown clock for the cart dropdown.
 * @Author : Gordon Truslove
 * @Date   : 10/26/2019, 12:45:55 PM
 */
define(
    'code25.FlexitogGlobal.Countdown.View', [
        'SC.Configuration', 'jQuery', 'Backbone', 'Backbone.CompositeView', 'underscore', 'Utils', 'code25_flexitogglobal_countdown.tpl'
    ],
    function (
        Configuration, jQuery, Backbone, BackboneCompositeView, _, Utils, code25_flexitogglobal_countdown_tpl
    ) {
        'use strict';

        return Backbone.View.extend({

            template: code25_flexitogglobal_countdown_tpl,
            initialize: function (options) {
                this.application = options.application;
                
            },
            close:function(){
                clearInterval(this.timer);
            }
            ,
            events: {},
            childViews: {},
            getContext: function getContext() {

                if(!Configuration.get().countdown.showClock)
			{
                return {showCountdown:false};
            }

                var showCountdown = false;
                var date = new Date();
                var day = date.getDay();

                var cutoff = new Date(date.getTime());
                cutoff.setHours(16);
                cutoff.setMinutes(0);
                cutoff.setSeconds(0);
                cutoff.setMilliseconds(0);
                var diff = cutoff.getTime() - date.getTime();
                var milli = diff % 1000;
                diff = (diff - milli) / 1000;
                var seconds = diff % 60;
                diff = (diff - seconds) / 60;
                var minutes = diff % 60;
                diff = (diff - minutes) / 60;
                var hours = diff % 24;

                //console.log(diff+" "+hours+"hr "+minutes+"min "+seconds+"sec "+milli+"milli");
                var message;
                day = 0; //TEMP!
                if (day >= 0 && day <= 3) { //Monday to Thursday
                    showCountdown = true;
                    message = "For Next Day Delivery";
                } else if (day == 4) { //Friday
                    showCountdown = true;
                    message = "For Monday Delivery (next working day)";
                }
                if(cutoff.getTime()<date.getTime()){
                    showCountdown = false;
                }
                //console.log();
                if(showCountdown&&!this.timer){
                    var self=this;
                    this.timer = setInterval(function() {
                        self.render();
                   }, 1000);
                }
                return {
                    showCountdown: showCountdown,
                    message: message,
                    hours:hours,
                    minutes:minutes,
                    seconds:seconds

                };
            }

        });

    });