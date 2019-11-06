/**
 * Description : When a web order is taken, set the contact field.
 * 
 * @Author : Gordon Truslove
 * @Date   : 11/1/2019, 2:56:18 PM
 * 
 * 
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search','N/runtime'],

    function (record, search,runtime) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function beforeSubmit(scriptContext) {
            try {
                if (scriptContext.type == scriptContext.UserEventType.CREATE) {

                    var currentRecord = scriptContext.newRecord;
                    log.debug("webstore", "create "+runtime.executionContext);
                    if (runtime.executionContext == "WEBSTORE") {

                        log.debug("webstore", "new order");
                        var userObj = runtime.getCurrentUser();
                        var contact = userObj.contact;
                        log.debug("contact", "contact=" + contact);

                        if (contact > 0) {
                            currentRecord.setValue({
                                fieldId: 'custbody_nbs121_ordered_by',
                                value: contact,
                                ignoreFieldChange: true
                            });
                        }
                    }
                }
            } catch (err) {
                log.debug("error", JSON.stringify(err));
            }

        }

        return {
            beforeSubmit: beforeSubmit
        };

    });