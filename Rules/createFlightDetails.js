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

export default function createFlightDetails(clientAPI) {

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

