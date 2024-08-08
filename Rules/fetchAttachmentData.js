/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function fetchAttachmentData(clientAPI) {

    const value = clientAPI.getPageProxy().getControl("SectionedTable01").getControl('FCAttach').getValue();
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
