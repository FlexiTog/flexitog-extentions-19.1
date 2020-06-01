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
                                fieldId: 'custbody_code25_webcontact',
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
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function afterSubmit(scriptContext) {
            try {
                if (scriptContext.type == scriptContext.UserEventType.CREATE) {

                    var currentRecord = scriptContext.newRecord;
                   // log.debug("webstore", "create "+runtime.executionContext);
                    if (runtime.executionContext == "WEBSTORE") {

                        var contact=currentRecord.getValue({
                            fieldId: 'custbody_code25_webcontact'
                        });

                        log.debug("contact", "copy contact=" + contact);

                        if (contact > 0) {
                           
                            record.submitFields({
                                type: currentRecord.type,
                                id: currentRecord.id,
                                values: {
                                    custbody_nbs121_ordered_by: contact
                                },
                                options: {
                                    enableSourcing: false,
                                    ignoreMandatoryFields : true
                                }
                            });
                        }
                    }
                }
            } catch (err) {
                log.debug("error", JSON.stringify(err));
            }

        }

        return {
            afterSubmit: afterSubmit,
            beforeSubmit: beforeSubmit
        };

    });