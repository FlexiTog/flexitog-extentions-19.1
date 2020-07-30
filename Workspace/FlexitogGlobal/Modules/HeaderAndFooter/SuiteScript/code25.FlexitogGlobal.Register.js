
define(
    'code25.FlexitogGlobal.Register',
    [
        'Application'
    ],
    function (
        Application
    ) {
        'use strict';
        Application.on('before:Account.Register.ServiceController.post', function () {
            var res;

            try {
                var e = arguments[0];
                res = nlapiRequestURL("https://www.google.com/recaptcha/api/siteverify", {
                    secret: "6Lf4D7"+"gZAAAAAPC_"+"-WeeXtJ7Swgrw"+"ytjM4Fn1iYi",
                    response: e.data.token
                }, null);
            } catch (err) {
                nlapiLogExecution("debug", "reCAPTCHA error", err);
            }
            if (res) {
                var gRes = JSON.parse(res.getBody());
                if (!gRes.success) {
                    nlapiLogExecution("debug", "reCAPTCHA blocked", "Request blocked: " + res.getBody() + " " + JSON.stringify(e.data));
                    throw new Error("reCAPTCHA blocked this request. (" + gRes.score + ")");
                }else{
                    nlapiLogExecution("debug", "reCAPTCHA passed", "Request passed: " + res.getBody());
                }
            }

        });

    });