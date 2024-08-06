export default function Initialize(context) {

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