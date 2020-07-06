/**
 * Description : When a new customer is created copy the temp vat number to the real one. This is because the website populates custom fields automatically, so this route avoids changing the website backend.
 * 
 * @Author : Gordon Truslove
 * @Date   : 5/4/2020, 12:08:08 PM
 * Code 25 Ltd
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
//log.debug("VAT Number",scriptContext.type+" "+runtime.executionContext);
            if (scriptContext.type != scriptContext.UserEventType.DELETE) {

                var currentRecord = scriptContext.newRecord;
                var custentity_c25_vatnumber = currentRecord.getValue({
                    fieldId: 'custentity_c25_vatnumber'
                });
                //log.debug("VAT Number","custentity_c25_vatnumber="+custentity_c25_vatnumber);
                if (custentity_c25_vatnumber) {
                    currentRecord.setValue({
                        fieldId: 'vatregnumber',
                        value:custentity_c25_vatnumber
                    });
                    currentRecord.setValue({
                        fieldId: 'custentity_c25_vatnumber',
                        value:""
                    });
                }
            }
        }

        return {
            beforeSubmit: beforeSubmit
        };

    });