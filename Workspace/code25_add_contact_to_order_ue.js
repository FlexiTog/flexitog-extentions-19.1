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
define(['N/record', 'N/search'],

    function (record, search) {

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

            if (scriptContext.type == scriptContext.UserEventType.CREATE) {

                var currentRecord = scriptContext.newRecord;
                var duedate = currentRecord.getValue({
                    fieldId: 'duedate'
                });

                if (runtime.executionContext == "WEBSTORE") {
                    
                }
            }

        }

        return {
            beforeSubmit: beforeSubmit
        };

    });