(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/TravelApp/i18n/i18n.properties":
/*!**********************************************************!*\
  !*** ./build.definitions/TravelApp/i18n/i18n.properties ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/AppUpdateFailure.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/AppUpdateFailure.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/TravelApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/AppUpdateSuccess.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/AppUpdateSuccess.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/TravelApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/TravelApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/ClientIsMultiUserMode.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/GetClientSupportVersions.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/GetClientSupportVersions.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/GetClientVersion.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/GetClientVersion.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/OnWillUpdate.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/OnWillUpdate.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/TravelApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/TravelApp/Actions/com_initium_hpcl/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/TravelApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/AttachmentDynamicPath.js":
/*!********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/AttachmentDynamicPath.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AttachmentDynamicPath)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AttachmentDynamicPath(clientAPI) {

    let ID = clientAPI.getBindingObject().attachmentId;
    return "/document/jobs/"+ID;
}


/***/ }),

/***/ "./build.definitions/TravelApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/TravelApp/Services/TravelApp.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/TravelApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Logging/LogLevels.js":
/*!****************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Logging/LogLevels.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Logging/SetTraceCategories.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Logging/SetTraceCategories.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Logging/SetUserLogLevel.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Logging/SetUserLogLevel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Logging/ToggleLogging.js":
/*!********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Logging/ToggleLogging.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Logging/TraceCategories.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Logging/TraceCategories.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Logging/UserLogSetting.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Logging/UserLogSetting.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/Service/Initialize.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/Service/Initialize.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _com_initium_hpcl = context.executeAction('/TravelApp/Actions/com_initium_hpcl/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_com_initium_hpcl]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/TravelApp/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/TravelApp/Rules/addExpenseButtonVisibility.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/addExpenseButtonVisibility.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addExpenseButtonVisibility)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function addExpenseButtonVisibility(clientAPI) {

    let StatusText = clientAPI.getBindingObject().Status;

    return StatusText === 'Approved';
}


/***/ }),

/***/ "./build.definitions/TravelApp/Rules/approveRectedVisibility.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/approveRectedVisibility.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ approveRectedVisibility)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function approveRectedVisibility(clientAPI) {

    let StatusText = clientAPI.getBindingObject().Status;

    return StatusText === 'Open';
}


/***/ }),

/***/ "./build.definitions/TravelApp/Rules/createFlightDetails.js":
/*!******************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/createFlightDetails.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createFlightDetails)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
// export default function createFlightDetails(clientAPI) {

//     // const pageProxy = clientAPI.getPageProxy().getPageProxy();
//     // const attachmentControl = pageProxy.getControl("SectionedTable0").getControl("FCAttachment");
//     // const attachmentControl = clientAPI.getControl("FCAttachment");
    
//     // const value = clientAPI.getPageProxy().getControl("SectionedTable0").getControl('FCAttachment').getValue();
//     // if (!value.length) return;

//     // const formData = new FormData(), blob = new Blob([value[0].content], { type: value[0].contentType }),
//     //     file = new File([blob], value[0].urlString, { type: value[0].contentType });
    
//     // formData.append("file", file);
//     // formData.append("headers", file);
//     // formData.append("options", JSON.stringify({
//     //     "schemaId": "cf8cc8a9-1eee-42d9-9a3e-507a61baac23",
//     //     "clientId": "default",
//     //     "documentType": "invoice",
//     //     "receivedDate": new Date().toISOString().split("T")[0]
//     // }));

//     // return fetch("/nsTravelApp/document_information_extraction/document/jobs", {
//     //     method: 'POST',
//     //     body: formData
//     // }).then(p => p.json()).then((res)=>{return res.id});

// }

function createFlightDetails(clientAPI) {

    // Store formData in clientAPI so the action can access it
    // clientAPI.clientData.formData = formData;

    // Execute the action
    return clientAPI.executeAction('/TravelApp/Actions/postAttachmentData.action')
        .then(result => {
            // Process the action result, e.g., show a success message
           return result.data;
        })
        .catch(error => {
            // Handle the error, e.g., show an error message
            console.error('Error submitting form:', error);
            return null;
        });
}



/***/ }),

/***/ "./build.definitions/TravelApp/Rules/fetchAttachmentData.js":
/*!******************************************************************!*\
  !*** ./build.definitions/TravelApp/Rules/fetchAttachmentData.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchAttachmentData)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function fetchAttachmentData(clientAPI) {

    const value = clientAPI.getPageProxy().getControl("SectionedTable0").getControl('FCAttachment').getValue();
    if (!value.length) return;

    const formData = new FormData(), blob = new Blob([value[0].content], { type: value[0].contentType }),
        file = new File([blob], value[0].urlString, { type: value[0].contentType });
    
    formData.append("file", file);
    formData.append("headers", file);
    formData.append("options", JSON.stringify({
        "schemaId": "cf8cc8a9-1eee-42d9-9a3e-507a61baac23",
        "clientId": "default",
        "documentType": "invoice",
        "receivedDate": new Date().toISOString().split("T")[0]
    }));

    return formData;

}


/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let travelapp_actions_application_appupdate_action = __webpack_require__(/*! ./TravelApp/Actions/Application/AppUpdate.action */ "./build.definitions/TravelApp/Actions/Application/AppUpdate.action")
let travelapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./TravelApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/TravelApp/Actions/Application/AppUpdateFailureMessage.action")
let travelapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./TravelApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/TravelApp/Actions/Application/AppUpdateProgressBanner.action")
let travelapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./TravelApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/TravelApp/Actions/Application/AppUpdateSuccessMessage.action")
let travelapp_actions_application_logout_action = __webpack_require__(/*! ./TravelApp/Actions/Application/Logout.action */ "./build.definitions/TravelApp/Actions/Application/Logout.action")
let travelapp_actions_application_navtoabout_action = __webpack_require__(/*! ./TravelApp/Actions/Application/NavToAbout.action */ "./build.definitions/TravelApp/Actions/Application/NavToAbout.action")
let travelapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./TravelApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/TravelApp/Actions/Application/NavToActivityLog.action")
let travelapp_actions_application_navtosupport_action = __webpack_require__(/*! ./TravelApp/Actions/Application/NavToSupport.action */ "./build.definitions/TravelApp/Actions/Application/NavToSupport.action")
let travelapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./TravelApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/TravelApp/Actions/Application/OnWillUpdate.action")
let travelapp_actions_application_reset_action = __webpack_require__(/*! ./TravelApp/Actions/Application/Reset.action */ "./build.definitions/TravelApp/Actions/Application/Reset.action")
let travelapp_actions_application_resetmessage_action = __webpack_require__(/*! ./TravelApp/Actions/Application/ResetMessage.action */ "./build.definitions/TravelApp/Actions/Application/ResetMessage.action")
let travelapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./TravelApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/TravelApp/Actions/Application/UserMenuPopover.action")
let travelapp_actions_approveerrormsg_action = __webpack_require__(/*! ./TravelApp/Actions/ApproveErrorMsg.action */ "./build.definitions/TravelApp/Actions/ApproveErrorMsg.action")
let travelapp_actions_approverequestsrv_action = __webpack_require__(/*! ./TravelApp/Actions/approveRequestSrv.action */ "./build.definitions/TravelApp/Actions/approveRequestSrv.action")
let travelapp_actions_approvesuccessmsg_action = __webpack_require__(/*! ./TravelApp/Actions/ApproveSuccessMsg.action */ "./build.definitions/TravelApp/Actions/ApproveSuccessMsg.action")
let travelapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./TravelApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/TravelApp/Actions/CloseModalPage_Cancel.action")
let travelapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./TravelApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/TravelApp/Actions/CloseModalPage_Complete.action")
let travelapp_actions_closepage_action = __webpack_require__(/*! ./TravelApp/Actions/ClosePage.action */ "./build.definitions/TravelApp/Actions/ClosePage.action")
let travelapp_actions_com_initium_hpcl_service_closeoffline_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/CloseOffline.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOffline.action")
let travelapp_actions_com_initium_hpcl_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineFailureMessage.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineFailureMessage.action")
let travelapp_actions_com_initium_hpcl_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineSuccessMessage.action")
let travelapp_actions_com_initium_hpcl_service_downloadoffline_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/DownloadOffline.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/DownloadOffline.action")
let travelapp_actions_com_initium_hpcl_service_downloadstartedmessage_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/DownloadStartedMessage.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/DownloadStartedMessage.action")
let travelapp_actions_com_initium_hpcl_service_initializeoffline_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/InitializeOffline.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/InitializeOffline.action")
let travelapp_actions_com_initium_hpcl_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/InitializeOfflineFailureMessage.action")
let travelapp_actions_com_initium_hpcl_service_syncfailuremessage_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action")
let travelapp_actions_com_initium_hpcl_service_syncstartedmessage_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/SyncStartedMessage.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/SyncStartedMessage.action")
let travelapp_actions_com_initium_hpcl_service_uploadoffline_action = __webpack_require__(/*! ./TravelApp/Actions/com_initium_hpcl/Service/UploadOffline.action */ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/UploadOffline.action")
let travelapp_actions_createflightdetailssrv_action = __webpack_require__(/*! ./TravelApp/Actions/createFlightDetailsSrv.action */ "./build.definitions/TravelApp/Actions/createFlightDetailsSrv.action")
let travelapp_actions_createhotelbookingdetailssrv_action = __webpack_require__(/*! ./TravelApp/Actions/createHotelBookingDetailsSrv.action */ "./build.definitions/TravelApp/Actions/createHotelBookingDetailsSrv.action")
let travelapp_actions_createhotelfailed_action = __webpack_require__(/*! ./TravelApp/Actions/createHotelFailed.action */ "./build.definitions/TravelApp/Actions/createHotelFailed.action")
let travelapp_actions_createtravelreqentityfailurem_action = __webpack_require__(/*! ./TravelApp/Actions/CreateTravelReqEntityFailureM.action */ "./build.definitions/TravelApp/Actions/CreateTravelReqEntityFailureM.action")
let travelapp_actions_createtravelrequestsrv_action = __webpack_require__(/*! ./TravelApp/Actions/CreateTravelRequestSrv.action */ "./build.definitions/TravelApp/Actions/CreateTravelRequestSrv.action")
let travelapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./TravelApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/TravelApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let travelapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./TravelApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/TravelApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let travelapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./TravelApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/TravelApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let travelapp_actions_genericbannermessage_action = __webpack_require__(/*! ./TravelApp/Actions/GenericBannerMessage.action */ "./build.definitions/TravelApp/Actions/GenericBannerMessage.action")
let travelapp_actions_genericmessagebox_action = __webpack_require__(/*! ./TravelApp/Actions/GenericMessageBox.action */ "./build.definitions/TravelApp/Actions/GenericMessageBox.action")
let travelapp_actions_genericnavigation_action = __webpack_require__(/*! ./TravelApp/Actions/GenericNavigation.action */ "./build.definitions/TravelApp/Actions/GenericNavigation.action")
let travelapp_actions_generictoastmessage_action = __webpack_require__(/*! ./TravelApp/Actions/GenericToastMessage.action */ "./build.definitions/TravelApp/Actions/GenericToastMessage.action")
let travelapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./TravelApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/TravelApp/Actions/Logging/LogUploadFailure.action")
let travelapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./TravelApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/TravelApp/Actions/Logging/LogUploadSuccessful.action")
let travelapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./TravelApp/Actions/Logging/UploadLog.action */ "./build.definitions/TravelApp/Actions/Logging/UploadLog.action")
let travelapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./TravelApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/TravelApp/Actions/Logging/UploadLogProgress.action")
let travelapp_actions_navtoaddexpensepage_action = __webpack_require__(/*! ./TravelApp/Actions/NavToAddExpensePage.action */ "./build.definitions/TravelApp/Actions/NavToAddExpensePage.action")
let travelapp_actions_navtoapprovaldetailspage_action = __webpack_require__(/*! ./TravelApp/Actions/navToApprovalDetailsPage.action */ "./build.definitions/TravelApp/Actions/navToApprovalDetailsPage.action")
let travelapp_actions_navtoattachmentdetails_action = __webpack_require__(/*! ./TravelApp/Actions/NavToAttachmentDetails.action */ "./build.definitions/TravelApp/Actions/NavToAttachmentDetails.action")
let travelapp_actions_navtocreateflightdetails_action = __webpack_require__(/*! ./TravelApp/Actions/NavToCreateFlightDetails.action */ "./build.definitions/TravelApp/Actions/NavToCreateFlightDetails.action")
let travelapp_actions_navtocreaterequestpage_action = __webpack_require__(/*! ./TravelApp/Actions/NavtoCreateRequestPage.action */ "./build.definitions/TravelApp/Actions/NavtoCreateRequestPage.action")
let travelapp_actions_navtohotelbookingspage_action = __webpack_require__(/*! ./TravelApp/Actions/NavToHotelBookingsPage.action */ "./build.definitions/TravelApp/Actions/NavToHotelBookingsPage.action")
let travelapp_actions_navtotravelrequestdetailspage_action = __webpack_require__(/*! ./TravelApp/Actions/NavToTravelrequestDetailsPage.action */ "./build.definitions/TravelApp/Actions/NavToTravelrequestDetailsPage.action")
let travelapp_actions_navtoupdatetravelrequestdetailspage_action = __webpack_require__(/*! ./TravelApp/Actions/navToUpdateTravelRequestDetailsPage.action */ "./build.definitions/TravelApp/Actions/navToUpdateTravelRequestDetailsPage.action")
let travelapp_actions_postattachmentdata_action = __webpack_require__(/*! ./TravelApp/Actions/postAttachmentData.action */ "./build.definitions/TravelApp/Actions/postAttachmentData.action")
let travelapp_actions_rejectrequestsrv_action = __webpack_require__(/*! ./TravelApp/Actions/rejectRequestSrv.action */ "./build.definitions/TravelApp/Actions/rejectRequestSrv.action")
let travelapp_actions_requestrejectedsuccessmsg_action = __webpack_require__(/*! ./TravelApp/Actions/RequestRejectedSuccessMsg.action */ "./build.definitions/TravelApp/Actions/RequestRejectedSuccessMsg.action")
let travelapp_actions_requestrejecterrormsg_action = __webpack_require__(/*! ./TravelApp/Actions/RequestRejectErrorMsg.action */ "./build.definitions/TravelApp/Actions/RequestRejectErrorMsg.action")
let travelapp_actions_updatetraveldetailserrormsg_action = __webpack_require__(/*! ./TravelApp/Actions/updateTravelDetailsErrorMsg.action */ "./build.definitions/TravelApp/Actions/updateTravelDetailsErrorMsg.action")
let travelapp_actions_updatetravelrequestsrv_action = __webpack_require__(/*! ./TravelApp/Actions/updateTravelRequestSrv.action */ "./build.definitions/TravelApp/Actions/updateTravelRequestSrv.action")
let travelapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./TravelApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/TravelApp/Globals/Application/AppDefinition_Version.global")
let travelapp_globals_application_applicationname_global = __webpack_require__(/*! ./TravelApp/Globals/Application/ApplicationName.global */ "./build.definitions/TravelApp/Globals/Application/ApplicationName.global")
let travelapp_globals_application_supportemail_global = __webpack_require__(/*! ./TravelApp/Globals/Application/SupportEmail.global */ "./build.definitions/TravelApp/Globals/Application/SupportEmail.global")
let travelapp_globals_application_supportphone_global = __webpack_require__(/*! ./TravelApp/Globals/Application/SupportPhone.global */ "./build.definitions/TravelApp/Globals/Application/SupportPhone.global")
let travelapp_i18n_i18n_properties = __webpack_require__(/*! ./TravelApp/i18n/i18n.properties */ "./build.definitions/TravelApp/i18n/i18n.properties")
let travelapp_jsconfig_json = __webpack_require__(/*! ./TravelApp/jsconfig.json */ "./build.definitions/TravelApp/jsconfig.json")
let travelapp_pages_addexpenses_page = __webpack_require__(/*! ./TravelApp/Pages/addExpenses.page */ "./build.definitions/TravelApp/Pages/addExpenses.page")
let travelapp_pages_application_about_page = __webpack_require__(/*! ./TravelApp/Pages/Application/About.page */ "./build.definitions/TravelApp/Pages/Application/About.page")
let travelapp_pages_application_support_page = __webpack_require__(/*! ./TravelApp/Pages/Application/Support.page */ "./build.definitions/TravelApp/Pages/Application/Support.page")
let travelapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./TravelApp/Pages/Application/UserActivityLog.page */ "./build.definitions/TravelApp/Pages/Application/UserActivityLog.page")
let travelapp_pages_approvaldetails_page = __webpack_require__(/*! ./TravelApp/Pages/approvalDetails.page */ "./build.definitions/TravelApp/Pages/approvalDetails.page")
let travelapp_pages_approvals_page = __webpack_require__(/*! ./TravelApp/Pages/Approvals.page */ "./build.definitions/TravelApp/Pages/Approvals.page")
let travelapp_pages_attachmentdetails_page = __webpack_require__(/*! ./TravelApp/Pages/AttachmentDetails.page */ "./build.definitions/TravelApp/Pages/AttachmentDetails.page")
let travelapp_pages_boardingdetailstab_page = __webpack_require__(/*! ./TravelApp/Pages/boardingDetailsTab.page */ "./build.definitions/TravelApp/Pages/boardingDetailsTab.page")
let travelapp_pages_createflight_page = __webpack_require__(/*! ./TravelApp/Pages/createFlight.page */ "./build.definitions/TravelApp/Pages/createFlight.page")
let travelapp_pages_createhotel_page = __webpack_require__(/*! ./TravelApp/Pages/createHotel.page */ "./build.definitions/TravelApp/Pages/createHotel.page")
let travelapp_pages_createrequest_page = __webpack_require__(/*! ./TravelApp/Pages/CreateRequest.page */ "./build.definitions/TravelApp/Pages/CreateRequest.page")
let travelapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./TravelApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/TravelApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let travelapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./TravelApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/TravelApp/Pages/ErrorArchive/ErrorArchive_List.page")
let travelapp_pages_main_page = __webpack_require__(/*! ./TravelApp/Pages/Main.page */ "./build.definitions/TravelApp/Pages/Main.page")
let travelapp_pages_mainnav_page = __webpack_require__(/*! ./TravelApp/Pages/mainNav.page */ "./build.definitions/TravelApp/Pages/mainNav.page")
let travelapp_pages_traveldetailstab_page = __webpack_require__(/*! ./TravelApp/Pages/travelDetailsTab.page */ "./build.definitions/TravelApp/Pages/travelDetailsTab.page")
let travelapp_pages_travelrequest_page = __webpack_require__(/*! ./TravelApp/Pages/travelRequest.page */ "./build.definitions/TravelApp/Pages/travelRequest.page")
let travelapp_pages_travelrequestdetails_page = __webpack_require__(/*! ./TravelApp/Pages/travelRequestDetails.page */ "./build.definitions/TravelApp/Pages/travelRequestDetails.page")
let travelapp_pages_updatetravelrequest_page = __webpack_require__(/*! ./TravelApp/Pages/updateTravelRequest.page */ "./build.definitions/TravelApp/Pages/updateTravelRequest.page")
let travelapp_rules_addexpensebuttonvisibility_js = __webpack_require__(/*! ./TravelApp/Rules/addExpenseButtonVisibility.js */ "./build.definitions/TravelApp/Rules/addExpenseButtonVisibility.js")
let travelapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./TravelApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/TravelApp/Rules/Application/AppUpdateFailure.js")
let travelapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./TravelApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/TravelApp/Rules/Application/AppUpdateSuccess.js")
let travelapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./TravelApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/TravelApp/Rules/Application/ClientIsMultiUserMode.js")
let travelapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./TravelApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/TravelApp/Rules/Application/GetClientSupportVersions.js")
let travelapp_rules_application_getclientversion_js = __webpack_require__(/*! ./TravelApp/Rules/Application/GetClientVersion.js */ "./build.definitions/TravelApp/Rules/Application/GetClientVersion.js")
let travelapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./TravelApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/TravelApp/Rules/Application/OnWillUpdate.js")
let travelapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./TravelApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/TravelApp/Rules/Application/ResetAppSettingsAndLogout.js")
let travelapp_rules_approverectedvisibility_js = __webpack_require__(/*! ./TravelApp/Rules/approveRectedVisibility.js */ "./build.definitions/TravelApp/Rules/approveRectedVisibility.js")
let travelapp_rules_attachmentdynamicpath_js = __webpack_require__(/*! ./TravelApp/Rules/AttachmentDynamicPath.js */ "./build.definitions/TravelApp/Rules/AttachmentDynamicPath.js")
let travelapp_rules_createflightdetails_js = __webpack_require__(/*! ./TravelApp/Rules/createFlightDetails.js */ "./build.definitions/TravelApp/Rules/createFlightDetails.js")
let travelapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./TravelApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/TravelApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let travelapp_rules_fetchattachmentdata_js = __webpack_require__(/*! ./TravelApp/Rules/fetchAttachmentData.js */ "./build.definitions/TravelApp/Rules/fetchAttachmentData.js")
let travelapp_rules_logging_loglevels_js = __webpack_require__(/*! ./TravelApp/Rules/Logging/LogLevels.js */ "./build.definitions/TravelApp/Rules/Logging/LogLevels.js")
let travelapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./TravelApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/TravelApp/Rules/Logging/SetTraceCategories.js")
let travelapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./TravelApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/TravelApp/Rules/Logging/SetUserLogLevel.js")
let travelapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./TravelApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/TravelApp/Rules/Logging/ToggleLogging.js")
let travelapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./TravelApp/Rules/Logging/TraceCategories.js */ "./build.definitions/TravelApp/Rules/Logging/TraceCategories.js")
let travelapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./TravelApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/TravelApp/Rules/Logging/UserLogSetting.js")
let travelapp_rules_service_initialize_js = __webpack_require__(/*! ./TravelApp/Rules/Service/Initialize.js */ "./build.definitions/TravelApp/Rules/Service/Initialize.js")
let travelapp_services_com_initium_hpcl_service = __webpack_require__(/*! ./TravelApp/Services/com_initium_hpcl.service */ "./build.definitions/TravelApp/Services/com_initium_hpcl.service")
let travelapp_services_document_information_extraction_service = __webpack_require__(/*! ./TravelApp/Services/document_information_extraction.service */ "./build.definitions/TravelApp/Services/document_information_extraction.service")
let travelapp_services_travelapp_service = __webpack_require__(/*! ./TravelApp/Services/TravelApp.service */ "./build.definitions/TravelApp/Services/TravelApp.service")
let travelapp_styles_styles_css = __webpack_require__(/*! ./TravelApp/Styles/Styles.css */ "./build.definitions/TravelApp/Styles/Styles.css")
let travelapp_styles_styles_json = __webpack_require__(/*! ./TravelApp/Styles/Styles.json */ "./build.definitions/TravelApp/Styles/Styles.json")
let travelapp_styles_styles_less = __webpack_require__(/*! ./TravelApp/Styles/Styles.less */ "./build.definitions/TravelApp/Styles/Styles.less")
let travelapp_styles_styles_nss = __webpack_require__(/*! ./TravelApp/Styles/Styles.nss */ "./build.definitions/TravelApp/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	travelapp_actions_application_appupdate_action : travelapp_actions_application_appupdate_action,
	travelapp_actions_application_appupdatefailuremessage_action : travelapp_actions_application_appupdatefailuremessage_action,
	travelapp_actions_application_appupdateprogressbanner_action : travelapp_actions_application_appupdateprogressbanner_action,
	travelapp_actions_application_appupdatesuccessmessage_action : travelapp_actions_application_appupdatesuccessmessage_action,
	travelapp_actions_application_logout_action : travelapp_actions_application_logout_action,
	travelapp_actions_application_navtoabout_action : travelapp_actions_application_navtoabout_action,
	travelapp_actions_application_navtoactivitylog_action : travelapp_actions_application_navtoactivitylog_action,
	travelapp_actions_application_navtosupport_action : travelapp_actions_application_navtosupport_action,
	travelapp_actions_application_onwillupdate_action : travelapp_actions_application_onwillupdate_action,
	travelapp_actions_application_reset_action : travelapp_actions_application_reset_action,
	travelapp_actions_application_resetmessage_action : travelapp_actions_application_resetmessage_action,
	travelapp_actions_application_usermenupopover_action : travelapp_actions_application_usermenupopover_action,
	travelapp_actions_approveerrormsg_action : travelapp_actions_approveerrormsg_action,
	travelapp_actions_approverequestsrv_action : travelapp_actions_approverequestsrv_action,
	travelapp_actions_approvesuccessmsg_action : travelapp_actions_approvesuccessmsg_action,
	travelapp_actions_closemodalpage_cancel_action : travelapp_actions_closemodalpage_cancel_action,
	travelapp_actions_closemodalpage_complete_action : travelapp_actions_closemodalpage_complete_action,
	travelapp_actions_closepage_action : travelapp_actions_closepage_action,
	travelapp_actions_com_initium_hpcl_service_closeoffline_action : travelapp_actions_com_initium_hpcl_service_closeoffline_action,
	travelapp_actions_com_initium_hpcl_service_closeofflinefailuremessage_action : travelapp_actions_com_initium_hpcl_service_closeofflinefailuremessage_action,
	travelapp_actions_com_initium_hpcl_service_closeofflinesuccessmessage_action : travelapp_actions_com_initium_hpcl_service_closeofflinesuccessmessage_action,
	travelapp_actions_com_initium_hpcl_service_downloadoffline_action : travelapp_actions_com_initium_hpcl_service_downloadoffline_action,
	travelapp_actions_com_initium_hpcl_service_downloadstartedmessage_action : travelapp_actions_com_initium_hpcl_service_downloadstartedmessage_action,
	travelapp_actions_com_initium_hpcl_service_initializeoffline_action : travelapp_actions_com_initium_hpcl_service_initializeoffline_action,
	travelapp_actions_com_initium_hpcl_service_initializeofflinefailuremessage_action : travelapp_actions_com_initium_hpcl_service_initializeofflinefailuremessage_action,
	travelapp_actions_com_initium_hpcl_service_syncfailuremessage_action : travelapp_actions_com_initium_hpcl_service_syncfailuremessage_action,
	travelapp_actions_com_initium_hpcl_service_syncstartedmessage_action : travelapp_actions_com_initium_hpcl_service_syncstartedmessage_action,
	travelapp_actions_com_initium_hpcl_service_uploadoffline_action : travelapp_actions_com_initium_hpcl_service_uploadoffline_action,
	travelapp_actions_createflightdetailssrv_action : travelapp_actions_createflightdetailssrv_action,
	travelapp_actions_createhotelbookingdetailssrv_action : travelapp_actions_createhotelbookingdetailssrv_action,
	travelapp_actions_createhotelfailed_action : travelapp_actions_createhotelfailed_action,
	travelapp_actions_createtravelreqentityfailurem_action : travelapp_actions_createtravelreqentityfailurem_action,
	travelapp_actions_createtravelrequestsrv_action : travelapp_actions_createtravelrequestsrv_action,
	travelapp_actions_errorarchive_errorarchive_syncfailure_action : travelapp_actions_errorarchive_errorarchive_syncfailure_action,
	travelapp_actions_errorarchive_navtoerrorarchive_detail_action : travelapp_actions_errorarchive_navtoerrorarchive_detail_action,
	travelapp_actions_errorarchive_navtoerrorarchive_list_action : travelapp_actions_errorarchive_navtoerrorarchive_list_action,
	travelapp_actions_genericbannermessage_action : travelapp_actions_genericbannermessage_action,
	travelapp_actions_genericmessagebox_action : travelapp_actions_genericmessagebox_action,
	travelapp_actions_genericnavigation_action : travelapp_actions_genericnavigation_action,
	travelapp_actions_generictoastmessage_action : travelapp_actions_generictoastmessage_action,
	travelapp_actions_logging_loguploadfailure_action : travelapp_actions_logging_loguploadfailure_action,
	travelapp_actions_logging_loguploadsuccessful_action : travelapp_actions_logging_loguploadsuccessful_action,
	travelapp_actions_logging_uploadlog_action : travelapp_actions_logging_uploadlog_action,
	travelapp_actions_logging_uploadlogprogress_action : travelapp_actions_logging_uploadlogprogress_action,
	travelapp_actions_navtoaddexpensepage_action : travelapp_actions_navtoaddexpensepage_action,
	travelapp_actions_navtoapprovaldetailspage_action : travelapp_actions_navtoapprovaldetailspage_action,
	travelapp_actions_navtoattachmentdetails_action : travelapp_actions_navtoattachmentdetails_action,
	travelapp_actions_navtocreateflightdetails_action : travelapp_actions_navtocreateflightdetails_action,
	travelapp_actions_navtocreaterequestpage_action : travelapp_actions_navtocreaterequestpage_action,
	travelapp_actions_navtohotelbookingspage_action : travelapp_actions_navtohotelbookingspage_action,
	travelapp_actions_navtotravelrequestdetailspage_action : travelapp_actions_navtotravelrequestdetailspage_action,
	travelapp_actions_navtoupdatetravelrequestdetailspage_action : travelapp_actions_navtoupdatetravelrequestdetailspage_action,
	travelapp_actions_postattachmentdata_action : travelapp_actions_postattachmentdata_action,
	travelapp_actions_rejectrequestsrv_action : travelapp_actions_rejectrequestsrv_action,
	travelapp_actions_requestrejectedsuccessmsg_action : travelapp_actions_requestrejectedsuccessmsg_action,
	travelapp_actions_requestrejecterrormsg_action : travelapp_actions_requestrejecterrormsg_action,
	travelapp_actions_updatetraveldetailserrormsg_action : travelapp_actions_updatetraveldetailserrormsg_action,
	travelapp_actions_updatetravelrequestsrv_action : travelapp_actions_updatetravelrequestsrv_action,
	travelapp_globals_application_appdefinition_version_global : travelapp_globals_application_appdefinition_version_global,
	travelapp_globals_application_applicationname_global : travelapp_globals_application_applicationname_global,
	travelapp_globals_application_supportemail_global : travelapp_globals_application_supportemail_global,
	travelapp_globals_application_supportphone_global : travelapp_globals_application_supportphone_global,
	travelapp_i18n_i18n_properties : travelapp_i18n_i18n_properties,
	travelapp_jsconfig_json : travelapp_jsconfig_json,
	travelapp_pages_addexpenses_page : travelapp_pages_addexpenses_page,
	travelapp_pages_application_about_page : travelapp_pages_application_about_page,
	travelapp_pages_application_support_page : travelapp_pages_application_support_page,
	travelapp_pages_application_useractivitylog_page : travelapp_pages_application_useractivitylog_page,
	travelapp_pages_approvaldetails_page : travelapp_pages_approvaldetails_page,
	travelapp_pages_approvals_page : travelapp_pages_approvals_page,
	travelapp_pages_attachmentdetails_page : travelapp_pages_attachmentdetails_page,
	travelapp_pages_boardingdetailstab_page : travelapp_pages_boardingdetailstab_page,
	travelapp_pages_createflight_page : travelapp_pages_createflight_page,
	travelapp_pages_createhotel_page : travelapp_pages_createhotel_page,
	travelapp_pages_createrequest_page : travelapp_pages_createrequest_page,
	travelapp_pages_errorarchive_errorarchive_detail_page : travelapp_pages_errorarchive_errorarchive_detail_page,
	travelapp_pages_errorarchive_errorarchive_list_page : travelapp_pages_errorarchive_errorarchive_list_page,
	travelapp_pages_main_page : travelapp_pages_main_page,
	travelapp_pages_mainnav_page : travelapp_pages_mainnav_page,
	travelapp_pages_traveldetailstab_page : travelapp_pages_traveldetailstab_page,
	travelapp_pages_travelrequest_page : travelapp_pages_travelrequest_page,
	travelapp_pages_travelrequestdetails_page : travelapp_pages_travelrequestdetails_page,
	travelapp_pages_updatetravelrequest_page : travelapp_pages_updatetravelrequest_page,
	travelapp_rules_addexpensebuttonvisibility_js : travelapp_rules_addexpensebuttonvisibility_js,
	travelapp_rules_application_appupdatefailure_js : travelapp_rules_application_appupdatefailure_js,
	travelapp_rules_application_appupdatesuccess_js : travelapp_rules_application_appupdatesuccess_js,
	travelapp_rules_application_clientismultiusermode_js : travelapp_rules_application_clientismultiusermode_js,
	travelapp_rules_application_getclientsupportversions_js : travelapp_rules_application_getclientsupportversions_js,
	travelapp_rules_application_getclientversion_js : travelapp_rules_application_getclientversion_js,
	travelapp_rules_application_onwillupdate_js : travelapp_rules_application_onwillupdate_js,
	travelapp_rules_application_resetappsettingsandlogout_js : travelapp_rules_application_resetappsettingsandlogout_js,
	travelapp_rules_approverectedvisibility_js : travelapp_rules_approverectedvisibility_js,
	travelapp_rules_attachmentdynamicpath_js : travelapp_rules_attachmentdynamicpath_js,
	travelapp_rules_createflightdetails_js : travelapp_rules_createflightdetails_js,
	travelapp_rules_errorarchive_errorarchive_checkforsyncerror_js : travelapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	travelapp_rules_fetchattachmentdata_js : travelapp_rules_fetchattachmentdata_js,
	travelapp_rules_logging_loglevels_js : travelapp_rules_logging_loglevels_js,
	travelapp_rules_logging_settracecategories_js : travelapp_rules_logging_settracecategories_js,
	travelapp_rules_logging_setuserloglevel_js : travelapp_rules_logging_setuserloglevel_js,
	travelapp_rules_logging_togglelogging_js : travelapp_rules_logging_togglelogging_js,
	travelapp_rules_logging_tracecategories_js : travelapp_rules_logging_tracecategories_js,
	travelapp_rules_logging_userlogsetting_js : travelapp_rules_logging_userlogsetting_js,
	travelapp_rules_service_initialize_js : travelapp_rules_service_initialize_js,
	travelapp_services_com_initium_hpcl_service : travelapp_services_com_initium_hpcl_service,
	travelapp_services_document_information_extraction_service : travelapp_services_document_information_extraction_service,
	travelapp_services_travelapp_service : travelapp_services_travelapp_service,
	travelapp_styles_styles_css : travelapp_styles_styles_css,
	travelapp_styles_styles_json : travelapp_styles_styles_json,
	travelapp_styles_styles_less : travelapp_styles_styles_less,
	travelapp_styles_styles_nss : travelapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/TravelApp/Styles/Styles.css":
/*!*******************************************************!*\
  !*** ./build.definitions/TravelApp/Styles/Styles.css ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/TravelApp/Styles/Styles.less":
/*!********************************************************!*\
  !*** ./build.definitions/TravelApp/Styles/Styles.less ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/TravelApp/Styles/Styles.nss":
/*!*******************************************************!*\
  !*** ./build.definitions/TravelApp/Styles/Styles.nss ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/noSourceMaps.js":
/*!***********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/noSourceMaps.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/Application/About.page":
/*!******************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/Application/About.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/TravelApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/TravelApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/TravelApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/TravelApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/Application/Support.page":
/*!********************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/Application/Support.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/TravelApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/TravelApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/TravelApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/TravelApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/Application/UserActivityLog.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/Application/UserActivityLog.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/TravelApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/TravelApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/TravelApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/TravelApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/TravelApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/TravelApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/TravelApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/TravelApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/Approvals.page":
/*!**********************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/Approvals.page ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.GridTable","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"TravelRequest"},"_Name":"SectionGridTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"BindTo":"Headline","NumberOfLines":1,"Text":"{TripNumber}","TextAlignment":"Left"},{"BindTo":"Subheadline","NumberOfLines":1,"Text":"{TravelType}","TextAlignment":"Left"},{"BindTo":"Status","LineBreakMode":"WordWrapping","NumberOfLines":1,"Text":"{Status}","TextAlignment":"Left"}],"Layout":{"ColumnWidthPercentage":[0.1,0.1,0.1]},"AccessoryType":"None","OnPress":"/TravelApp/Actions/navToApprovalDetailsPage.action"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Search":{"MinimumCharacterThreshold":10}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Approvals","Caption":"Approvals","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/AttachmentDetails.page":
/*!******************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/AttachmentDetails.page ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"BindTo":"Headline","NumberOfLines":1,"Text":"{name}","TextAlignment":"Left"},{"BindTo":"Footnote","NumberOfLines":1,"Text":"{category}","TextAlignment":"Left"},{"BindTo":"Subheadline","NumberOfLines":1,"Text":"{value}","TextAlignment":"Left"}],"Layout":{"ColumnWidthPercentage":[0.1,0.1,0.1]},"AccessoryType":"None"},"_Type":"Section.Type.GridTable","Target":{"Service":"/TravelApp/Services/document_information_extraction.service","Path":"/TravelApp/Rules/AttachmentDynamicPath.js","OutputPath":"/extraction/headerFields","RequestProperties":{"Method":"GET","FetchCSRF":true}},"_Name":"SectionGridTable0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}]}],"_Type":"Page","_Name":"AttachmentDetails","Caption":"AttachmentDetails","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/CreateRequest.page":
/*!**************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/CreateRequest.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCTripNumber","IsVisible":true,"Separator":true,"Caption":"Trip Number","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCTravelType","IsVisible":true,"Separator":true,"Caption":"Travel Type","PlaceHolder":"Enter Vaue","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCStatus","IsVisible":true,"Separator":true,"Caption":"Status","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCDestination","IsVisible":true,"Separator":true,"Caption":"Destination","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCStartDate","IsVisible":true,"Separator":true,"Caption":"Start Date","IsEditable":true,"Mode":"Datetime"},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCEndDate","IsVisible":true,"Separator":true,"Caption":"End Date","IsEditable":true,"Mode":"Datetime"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCSubActivity","IsVisible":true,"Separator":true,"Caption":"Sub Activity","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"CreateRequest","Caption":"CreateRequest","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Cancel","Icon":"sap-icon://cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem0","Caption":"Save","SystemItem":"Save","Icon":"sap-icon://save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/CreateTravelRequestSrv.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/TravelApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/Main.page":
/*!*****************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/Main.page ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[]}],"_Name":"Main","_Type":"Page","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/addExpenses.page":
/*!************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/addExpenses.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"FormCellButton0","IsVisible":true,"Separator":false,"Title":"Flight Details","Alignment":"Left","ButtonType":"Secondary","Semantic":"Normal","ImagePosition":"Leading","Enabled":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"BindTo":"Headline","NumberOfLines":1,"Text":"{flightNo}","TextAlignment":"Left"},{"BindTo":"Subheadline","NumberOfLines":1,"Text":"{flightFrom}","TextAlignment":"Left"},{"BindTo":"Footnote","NumberOfLines":1,"Text":"{flightTo}","TextAlignment":"Left"},{"BindTo":"Status","NumberOfLines":1,"Text":"{boardingDate}","TextAlignment":"Left"}],"Layout":{"ColumnWidthPercentage":[0.1,0.1,0.1,0.1]},"AccessoryType":"None","OnPress":"/TravelApp/Actions/NavToAttachmentDetails.action"},"_Type":"Section.Type.GridTable","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"BoardingPass"},"_Name":"SectionGridTable0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Please Wait","PageSize":50}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"FormCellButton1","IsVisible":true,"Separator":false,"Title":"Hotel Details","Alignment":"Left","ButtonType":"Secondary","Semantic":"Normal","ImagePosition":"Leading","Enabled":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"BindTo":"Headline","NumberOfLines":1,"Text":"{name}","TextAlignment":"Left"},{"BindTo":"Subheadline","NumberOfLines":1,"Text":"{roomType}","TextAlignment":"Left"},{"BindTo":"Footnote","NumberOfLines":1,"Text":"{checkIn}","TextAlignment":"Left"},{"BindTo":"Status","NumberOfLines":1,"Text":"{checkOut}","TextAlignment":"Left"}],"Layout":{"ColumnWidthPercentage":[0.1,0.1,0.1,0.1]},"AccessoryType":"None"},"_Type":"Section.Type.GridTable","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"HotelBooking"},"_Name":"SectionGridTable1","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50}}]}],"_Type":"Page","_Name":"addExpenses","Caption":"Add Expenses","PrefersLargeCaption":true,"FioriToolbar":{"_Type":"Control.Type.FioriToolbar","_Name":"FioriToolbar0","Items":[{"_Type":"FioriToolbarItem.Type.Button","_Name":"ToolbarItem0","Visible":true,"Title":"Flight","OnPress":"/TravelApp/Actions/NavToCreateFlightDetails.action","Image":"sap-icon://flight","Enabled":true,"ButtonType":"Primary","Semantic":"Tint","ImagePosition":"Leading"},{"_Type":"FioriToolbarItem.Type.Button","_Name":"ToolbarItem1","Visible":true,"Title":"Hotel","OnPress":"/TravelApp/Actions/NavToHotelBookingsPage.action","Image":"sap-icon://home","Enabled":true,"ButtonType":"Primary","Semantic":"Tint","ImagePosition":"Leading"}]}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/approvalDetails.page":
/*!****************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/approvalDetails.page ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","ObjectHeader":{"Subhead":"{TravelType}","StatusText":"{Status}","DetailImage":"sap-icon://information","DetailImageIsCircular":false,"HeadlineText":"{TripNumber}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"Visible":true}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}},{"_Type":"Control.Type.Tabs","_Name":"Tabs0","Items":[{"_Type":"Control.Type.TabItem","Caption":"Travel Details","PageToOpen":"/TravelApp/Pages/travelDetailsTab.page","_Name":"TabItem0"},{"_Type":"Control.Type.TabItem","Caption":"Boarding Details","PageToOpen":"/TravelApp/Pages/boardingDetailsTab.page","_Name":"TabItem1"}],"Position":"Top","TabStripType":"Normal","SwipeEnabled":true}],"_Type":"Page","_Name":"approvalDetails","Caption":"Approval Details","FioriToolbar":{"_Type":"Control.Type.FioriToolbar","_Name":"FioriToolbar0","Visible":"/TravelApp/Rules/approveRectedVisibility.js","Items":[{"_Type":"FioriToolbarItem.Type.Button","_Name":"ToolbarItem1","Title":"Reject","OnPress":"/TravelApp/Actions/rejectRequestSrv.action","Image":"sap-icon://employee-rejections","Enabled":true,"ButtonType":"Primary","Semantic":"Negative","ImagePosition":"Leading"},{"_Type":"FioriToolbarItem.Type.Button","_Name":"ToolbarItem0","Title":"Approve","OnPress":"/TravelApp/Actions/approveRequestSrv.action","Image":"sap-icon://approvals","Enabled":true,"ButtonType":"Primary","Semantic":"Tint","ImagePosition":"Leading"}]}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/boardingDetailsTab.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/boardingDetailsTab.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Page","_Name":"boardingDetailsTab","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"Caption":"boardingDetailsTab","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/createFlight.page":
/*!*************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/createFlight.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFlightNo","IsVisible":true,"Separator":true,"Caption":"Flight No","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFlightFrom","IsVisible":true,"Separator":true,"Caption":"Flight From","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFlightTo","IsVisible":true,"Separator":true,"Caption":"Flight To","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCSeatNo","IsVisible":true,"Separator":true,"Caption":"Seat No","Enabled":true,"IsEditable":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCBoardingDate","IsVisible":true,"Separator":true,"Caption":"Boarding Date","IsEditable":true,"Mode":"Datetime"},{"_Type":"Control.Type.FormCell.Attachment","_Name":"FCAttachment","IsVisible":true,"Separator":true,"AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"]},{"_Type":"Control.Type.FormCell.Button","_Name":"FormCellButton0","IsVisible":true,"Separator":true,"Title":"Submit","Alignment":"Center","ButtonType":"Primary","Semantic":"Tint","Image":"sap-icon://save","ImagePosition":"Leading","Enabled":true,"OnPress":"/TravelApp/Actions/createFlightDetailsSrv.action"}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"createFlight","Caption":"Flight Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/createHotel.page":
/*!************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/createHotel.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCGstState","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Choose Multiple","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":["MH","AP","MP"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCHotelName","IsVisible":true,"Separator":true,"Caption":"Hotel Name","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCHotelEmail","IsVisible":true,"Separator":true,"Caption":"Hotel Email","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCRoomType","IsVisible":true,"Separator":true,"Caption":"Room Type","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCNoOfGuest","IsVisible":true,"Separator":true,"Caption":"No Of Guests","PlaceHolder":"PlaceHolder","KeyboardType":"Number","Enabled":true,"IsEditable":true},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCheckIn","IsVisible":true,"Separator":true,"Caption":"Check In","IsEditable":true,"Mode":"Datetime"},{"Value":"Enter Date","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCCheckOut","IsVisible":true,"Separator":true,"Caption":"Check Out","IsEditable":true,"Mode":"Datetime"},{"_Type":"Control.Type.FormCell.Button","_Name":"FormCellButton0","IsVisible":true,"Separator":true,"Title":"Submit","Alignment":"Center","ButtonType":"Primary","Semantic":"Tint","Image":"sap-icon://save","ImagePosition":"Leading","Enabled":true,"OnPress":"/TravelApp/Actions/createHotelBookingDetailsSrv.action"}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"createHotel","Caption":"createHotel","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/mainNav.page":
/*!********************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/mainNav.page ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.BottomNavigation","_Name":"BottomNavigation0","Items":[{"_Type":"Control.Type.TabItem","Caption":"Travel Requests","Image":"sap-icon://travel-request","PageToOpen":"/TravelApp/Pages/travelRequest.page","_Name":"TabItem0"},{"_Type":"Control.Type.TabItem","Caption":"Approvals","Image":"sap-icon://approvals","PageToOpen":"/TravelApp/Pages/Approvals.page","_Name":"TabItem1"}]}],"_Type":"Page","_Name":"mainNav","Caption":"Business Travel","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/travelDetailsTab.page":
/*!*****************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/travelDetailsTab.page ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Page","_Name":"travelDetailsTab","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"Caption":"travelDetailsTab","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/travelRequest.page":
/*!**************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/travelRequest.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"BindTo":"Headline","NumberOfLines":1,"Text":"{TripNumber}","TextAlignment":"Left"},{"BindTo":"Subheadline","NumberOfLines":1,"Text":"{TravelType}","TextAlignment":"Left"},{"BindTo":"Status","LineBreakMode":"WordWrapping","NumberOfLines":1,"Text":"{Status}","TextAlignment":"Left"}],"Layout":{"ColumnWidthPercentage":[0.1,0.1,0.1]},"AccessoryType":"None","OnPress":"/TravelApp/Actions/NavToTravelrequestDetailsPage.action"},"_Type":"Section.Type.GridTable","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"TravelRequest","ReadLink":"{@odata.readLink}","ServerSidePaging":true},"_Name":"SectionGridTable0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading","PageSize":50}}]}],"_Type":"Page","_Name":"travelRequest","Caption":"Travel Requests","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Add","SystemItem":"Add","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/NavtoCreateRequestPage.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/travelRequestDetails.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/travelRequestDetails.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{TripNumber}","_Name":"KeyValue0","KeyName":"Trip No.","Visible":true},{"Value":"{TravelType}","_Name":"KeyValue4","KeyName":"Travel Type","Visible":true},{"Value":"{Status}","_Name":"KeyValue1","KeyName":"Status","Visible":true},{"Value":"{Destination}","_Name":"KeyValue6","KeyName":"Destination","Visible":true},{"Value":"{StartDate}","_Name":"KeyValue7","KeyName":"Start Date","Visible":true},{"Value":"{EndDate}","_Name":"KeyValue3","KeyName":"End Date","Visible":true},{"Value":"{SubActivity}","_Name":"KeyValue5","KeyName":"Sub Activity","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"CreateRequest","Caption":"CreateRequest","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Save","SystemItem":"Edit","Icon":"sap-icon://save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/navToUpdateTravelRequestDetailsPage.action"}],"_Name":"ActionBar1"},"FioriToolbar":{"_Type":"Control.Type.FioriToolbar","_Name":"FioriToolbar0","Items":[{"_Type":"FioriToolbarItem.Type.Button","_Name":"ToolbarItem0","Visible":"/TravelApp/Rules/addExpenseButtonVisibility.js","Title":"Add Expense","OnPress":"/TravelApp/Actions/NavToAddExpensePage.action","Enabled":true,"ButtonType":"Primary","Semantic":"Tint","ImagePosition":"Leading"}]}}

/***/ }),

/***/ "./build.definitions/TravelApp/Pages/updateTravelRequest.page":
/*!********************************************************************!*\
  !*** ./build.definitions/TravelApp/Pages/updateTravelRequest.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{TravelType}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCTravelType","IsVisible":true,"Separator":true,"Caption":"Travel Type","PlaceHolder":"Enter Vaue","Enabled":true,"IsEditable":true},{"Value":"{Destination}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCDestination","IsVisible":true,"Separator":true,"Caption":"Destination","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true},{"Value":"{StartDate}","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCStartDate","IsVisible":true,"Separator":true,"Caption":"Start Date","IsEditable":true,"Mode":"Datetime"},{"Value":"{EndDate}","_Type":"Control.Type.FormCell.DatePicker","_Name":"FCEndDate","IsVisible":true,"Separator":true,"Caption":"End Date","IsEditable":true,"Mode":"Datetime"},{"Value":"{SubActivity}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCSubActivity","IsVisible":true,"Separator":true,"Caption":"Sub Activity","PlaceHolder":"Enter Value","Enabled":true,"IsEditable":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"updateTravelRequest","Caption":"Update Travel Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Cancel","Icon":"sap-icon://cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem0","Caption":"Save","SystemItem":"Save","Icon":"sap-icon://save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/TravelApp/Actions/updateTravelRequestSrv.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/TravelApp/Pages/mainNav.page","OnLaunch":["/TravelApp/Rules/Service/Initialize.js"],"OnWillUpdate":"/TravelApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/TravelApp/Rules/Service/Initialize.js","Styles":"/TravelApp/Styles/Styles.less","Version":"/TravelApp/Globals/Application/AppDefinition_Version.global","Localization":"/TravelApp/i18n/i18n.properties","_SchemaVersion":"24.7","_Name":"TravelApp","StyleSheets":{"Styles":{"css":"/TravelApp/Styles/Styles.css","ios":"/TravelApp/Styles/Styles.nss","android":"/TravelApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/AppUpdate.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/AppUpdate.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/TravelApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/TravelApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/AppUpdateFailureMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/AppUpdateProgressBanner.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/TravelApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/Logout.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/Logout.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/NavToAbout.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/NavToAbout.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/TravelApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/NavToActivityLog.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/NavToActivityLog.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/TravelApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/NavToSupport.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/NavToSupport.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/TravelApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/OnWillUpdate.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/OnWillUpdate.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/Reset.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/Reset.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/ResetMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/ResetMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/TravelApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Application/UserMenuPopover.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Application/UserMenuPopover.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/TravelApp/Actions/com_initium_hpcl/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/TravelApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/TravelApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/TravelApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/TravelApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/TravelApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/TravelApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/ApproveErrorMsg.action":
/*!********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/ApproveErrorMsg.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ApproveErrorMsg"},"Message":"Failed to approve with error - {#ActionResults:approveRequestSrv/error}","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/ApproveSuccessMsg.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/ApproveSuccessMsg.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ApproveSuccessMsg"},"Message":"Travel request Approved successfully","OKCaption":"OK","OnOK":"/TravelApp/Actions/CloseModalPage_Complete.action"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/CloseModalPage_Cancel.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/CloseModalPage_Cancel.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/CloseModalPage_Complete.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/CloseModalPage_Complete.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/ClosePage.action":
/*!**************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/ClosePage.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/CreateTravelReqEntityFailureM.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/CreateTravelReqEntityFailureM.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CreateTravelReqEntityFailureM"},"Message":"#ActionResults:CreateTravelRequestSrv/error","Title":"Create Travel Request","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/CreateTravelRequestSrv.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/CreateTravelRequestSrv.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"CreateTravelRequestSrv"},"OnFailure":"/TravelApp/Actions/CreateTravelReqEntityFailureM.action","OnSuccess":"/TravelApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"TravelRequest"},"Properties":{"TripNumber":"#Control:FCTripNumber/#Value","TravelType":"#Control:FCTravelType/#Value","Destination":"#Control:FCDestination/#Value","Status":"#Control:FCStatus/#Value","StartDate":"#Control:FCStartDate/#Value","EndDate":"#Control:FCEndDate/#Value","SubActivity":"#Control:FCSubActivity/#Value"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/TravelApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/TravelApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/TravelApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/GenericBannerMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/GenericBannerMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/GenericMessageBox.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/GenericMessageBox.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/GenericNavigation.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/GenericNavigation.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/TravelApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/GenericToastMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/GenericToastMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Logging/LogUploadFailure.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Logging/LogUploadFailure.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Logging/LogUploadSuccessful.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Logging/LogUploadSuccessful.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Logging/UploadLog.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Logging/UploadLog.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/TravelApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/TravelApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/Logging/UploadLogProgress.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/Logging/UploadLogProgress.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/TravelApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/NavToAddExpensePage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/NavToAddExpensePage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAddExpensePage"},"PageToOpen":"/TravelApp/Pages/addExpenses.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/NavToAttachmentDetails.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/NavToAttachmentDetails.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAttachmentDetails"},"PageToOpen":"/TravelApp/Pages/AttachmentDetails.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/NavToCreateFlightDetails.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/NavToCreateFlightDetails.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCreateFlightDetails"},"PageToOpen":"/TravelApp/Pages/createFlight.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/NavToHotelBookingsPage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/NavToHotelBookingsPage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToHotelBookingsPage"},"PageToOpen":"/TravelApp/Pages/createHotel.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/NavToTravelrequestDetailsPage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/NavToTravelrequestDetailsPage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTravelrequestDetailsPage"},"PageToOpen":"/TravelApp/Pages/travelRequestDetails.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/NavtoCreateRequestPage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/NavtoCreateRequestPage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavtoCreateRequestPage"},"PageToOpen":"/TravelApp/Pages/CreateRequest.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/RequestRejectErrorMsg.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/RequestRejectErrorMsg.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"RequestRejectErrorMsg"},"Message":"Request rejection failed - {#ActionResults:rejectRequestSrv/error}"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/RequestRejectedSuccessMsg.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/RequestRejectedSuccessMsg.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"RequestRejectedSuccessMsg"},"OnSuccess":"/TravelApp/Actions/CloseModalPage_Complete.action","Message":"Request rejected successfully","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/approveRequestSrv.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/approveRequestSrv.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"approveRequestSrv"},"OnFailure":"/TravelApp/Actions/ApproveErrorMsg.action","OnSuccess":"/TravelApp/Actions/ApproveSuccessMsg.action","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"TravelRequest","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"{ID}","Status":"Approved"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOffline.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOffline.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/TravelApp/Services/TravelApp.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineSuccessMessage.action","OnFailure":"/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineFailureMessage.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineFailureMessage.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineSuccessMessage.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/CloseOfflineSuccessMessage.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/DownloadOffline.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/DownloadOffline.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/TravelApp/Services/TravelApp.service","DefiningRequests":[{"Name":"TravelRequest","Query":"TravelRequest"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action","OnSuccess":"/TravelApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/DownloadStartedMessage.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/DownloadStartedMessage.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/TravelApp/Actions/com_initium_hpcl/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/InitializeOffline.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/InitializeOffline.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/TravelApp/Services/TravelApp.service","DefiningRequests":[{"Name":"TravelRequest","Query":"TravelRequest"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnFailure":"/TravelApp/Actions/com_initium_hpcl/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/InitializeOfflineFailureMessage.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/InitializeOfflineFailureMessage.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/SyncStartedMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/SyncStartedMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/TravelApp/Actions/com_initium_hpcl/Service/UploadOffline.action","OnFailure":"/TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/UploadOffline.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/com_initium_hpcl/Service/UploadOffline.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/TravelApp/Services/TravelApp.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/TravelApp/Actions/com_initium_hpcl/Service/DownloadStartedMessage.action","OnFailure":"/TravelApp/Actions/com_initium_hpcl/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/createFlightDetailsSrv.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/createFlightDetailsSrv.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"createFlightDetailsSrv"},"OnSuccess":"/TravelApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"BoardingPass"},"Properties":{"flightNo":"#Control:FCFlightNo/#Value","flightFrom":"#Control:FCFlightFrom/#Value","flightTo":"#Control:FCFlightTo/#Value","seatNo":"#Control:FCSeatNo/#Value","boardingDate":"#Control:FCBoardingDate/#Value","attachmentId":"/TravelApp/Rules/createFlightDetails.js","req_ID":"{ID}"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/createHotelBookingDetailsSrv.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/createHotelBookingDetailsSrv.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"createHotelBookingDetailsSrv"},"OnFailure":"/TravelApp/Actions/createHotelFailed.action","OnSuccess":"/TravelApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"HotelBooking"},"Properties":{"gstState":"#Control:FCGstState/#SelectedValue","name":"#Control:FCHotelName/#Value","email":"#Control:FCHotelEmail/#Value","roomType":"#Control:FCRoomType/#Value","noofGuest":"#Control:FCNoOfGuest/#Value","checkIn":"#Control:FCCheckIn/#Value","checkOut":"#Control:FCCheckOut/#Value","req_ID":"{ID}"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/createHotelFailed.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/createHotelFailed.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"createHotelFailed"},"Message":"Failed to book Hotel - {#ActionResults:createHotelBookingDetailsSrv/error}","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/navToApprovalDetailsPage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/navToApprovalDetailsPage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"navToApprovalDetailsPage"},"PageToOpen":"/TravelApp/Pages/approvalDetails.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/navToUpdateTravelRequestDetailsPage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/navToUpdateTravelRequestDetailsPage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"navToUpdateTravelRequestDetailsPage"},"PageToOpen":"/TravelApp/Pages/updateTravelRequest.page"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/postAttachmentData.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/postAttachmentData.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"postAttachmentData"},"Target":{"Service":"/TravelApp/Services/document_information_extraction.service","Path":"/document/jobs","OutputPath":"/id","RequestProperties":{"Method":"POST","Body":"/TravelApp/Rules/fetchAttachmentData.js","FetchCSRF":false}}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/rejectRequestSrv.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/rejectRequestSrv.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"rejectRequestSrv"},"OnFailure":"/TravelApp/Actions/RequestRejectErrorMsg.action","OnSuccess":"/TravelApp/Actions/RequestRejectedSuccessMsg.action","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"TravelRequest","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"{ID}","Status":"Rejected"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/updateTravelDetailsErrorMsg.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/updateTravelDetailsErrorMsg.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"updateTravelDetailsErrorMsg"},"Message":"Failed to update travel details - {#ActionResults:updateTravelRequestSrv/error}","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/TravelApp/Actions/updateTravelRequestSrv.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/TravelApp/Actions/updateTravelRequestSrv.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"updateTravelRequestSrv"},"OnFailure":"/TravelApp/Actions/updateTravelDetailsErrorMsg.action","OnSuccess":"/TravelApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/TravelApp/Services/TravelApp.service","EntitySet":"TravelRequest","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"{ID}","TravelType":"#Control:FCTravelType/#Value","Destination":"#Control:FCDestination/#Value","StartDate":"#Control:FCStartDate/#Value","EndDate":"#Control:FCEndDate/#Value","SubActivity":"#Control:FCSubActivity/#Value"}}

/***/ }),

/***/ "./build.definitions/TravelApp/Globals/Application/AppDefinition_Version.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Globals/Application/AppDefinition_Version.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/TravelApp/Globals/Application/ApplicationName.global":
/*!********************************************************************************!*\
  !*** ./build.definitions/TravelApp/Globals/Application/ApplicationName.global ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/TravelApp/Globals/Application/SupportEmail.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Globals/Application/SupportEmail.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/TravelApp/Globals/Application/SupportPhone.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/TravelApp/Globals/Application/SupportPhone.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/TravelApp/Services/TravelApp.service":
/*!****************************************************************!*\
  !*** ./build.definitions/TravelApp/Services/TravelApp.service ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"TravelApp","OfflineEnabled":false,"SourceType":"Mobile"}

/***/ }),

/***/ "./build.definitions/TravelApp/Services/com_initium_hpcl.service":
/*!***********************************************************************!*\
  !*** ./build.definitions/TravelApp/Services/com_initium_hpcl.service ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"com.initium.hpcl","OfflineEnabled":false,"SourceType":"Mobile"}

/***/ }),

/***/ "./build.definitions/TravelApp/Services/document_information_extraction.service":
/*!**************************************************************************************!*\
  !*** ./build.definitions/TravelApp/Services/document_information_extraction.service ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"document_information_extraction","OfflineEnabled":false,"SourceType":"Mobile","RestService":true}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/TravelApp/Styles/Styles.json":
/*!********************************************************!*\
  !*** ./build.definitions/TravelApp/Styles/Styles.json ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/TravelApp/jsconfig.json":
/*!***************************************************!*\
  !*** ./build.definitions/TravelApp/jsconfig.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});