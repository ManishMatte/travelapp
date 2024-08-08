/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function AttachmentDynamicPath(clientAPI) {

    let ID = clientAPI.getBindingObject().attachmentId;
    return "/document/jobs/"+ID;
}
