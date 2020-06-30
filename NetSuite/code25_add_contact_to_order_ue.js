/**
 * Description : When a web order is taken, set the contact field.
 * Also, Add "Who is this for?" suggestions to line and customer.
 * 
 * @Author : Gordon Truslove
 * @Date   : 11/1/2019, 2:56:18 PM
 * 
 * 
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/runtime'],

    function (record, search, runtime) {

        function beforeSubmit(scriptContext) {
            try {
                if (scriptContext.type == scriptContext.UserEventType.DELETE) return;

                var currentRecord = scriptContext.newRecord;

                if (scriptContext.type == scriptContext.UserEventType.CREATE) {

                    //log.debug("webstore", "create "+runtime.executionContext);
                    if (runtime.executionContext == "WEBSTORE") {

                        //log.debug("webstore", "new order");
                        var userObj = runtime.getCurrentUser();
                        var contact = userObj.contact;
                        //log.debug("contact", "contact=" + contact);

                        if (contact > 0) {
                            currentRecord.setValue({
                                fieldId: 'custbody_code25_webcontact',
                                value: contact,
                                ignoreFieldChange: true
                            });
                        }
                    }
                }

                //update suggestions

                var numLines = currentRecord.getLineCount({
                    sublistId: 'item'
                });

                var entity = currentRecord.getValue({
                    fieldId: 'entity'
                });
                log.debug("entity", entity);
                if (entity) {
                    
                    var custcol_c25_whoisthisfor, custcol_c25_whoisthisfor_old, custentity_c25_whoisthisfor_suggestions, lookupFields, suggestions, lvalue, found,newSuggestion=false;
                    for (var i = 0; i < numLines; i++) {

                        var custcol_c25_whoisthisfor = currentRecord.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_c25_whoisthisfor',
                            line: i
                        });
                        var custcol_c25_whoisthisfor_old = "";
                        var oldRecord = scriptContext.oldRecord;
                        if(oldRecord){
                            custcol_c25_whoisthisfor_old = oldRecord.getSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_c25_whoisthisfor',
                                line: i
                            });
                        }
                        //log.debug("who", custcol_c25_whoisthisfor + " = " + custcol_c25_whoisthisfor_old);
                        if (custcol_c25_whoisthisfor != custcol_c25_whoisthisfor_old) {
                            if (!suggestions) {
                                lookupFields = search.lookupFields({
                                    type: search.Type.CUSTOMER,
                                    id: entity,
                                    columns: ['custentity_c25_whoisthisfor_suggestions']
                                });
                               // log.debug("lookupFields", JSON.stringify(lookupFields));
                                custentity_c25_whoisthisfor_suggestions = lookupFields.custentity_c25_whoisthisfor_suggestions || "";

                                suggestions = custentity_c25_whoisthisfor_suggestions.split(",");
                            }
                            lvalue = custcol_c25_whoisthisfor.toLowerCase();
                            found = false;
                            for (var j = 0; j < suggestions.length; j++) {
                                if (lvalue == suggestions[j].toLowerCase()) {
                                    found = true;
                                }
                            }
                            if(!found){
                                newSuggestion=true;
                                suggestions.push(custcol_c25_whoisthisfor);
                            }

                        }
                    }

                    if(newSuggestion){
                        record.submitFields({
                            type: search.Type.CUSTOMER,
                            id: entity,
                            values: {custentity_c25_whoisthisfor_suggestions:suggestions.join(",")},
                            options: {
                                enableSourcing: false,
                                ignoreMandatoryFields: true
                            }
                        });
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

                        var contact = currentRecord.getValue({
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
                                    ignoreMandatoryFields: true
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