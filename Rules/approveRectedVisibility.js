/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function approveRectedVisibility(clientAPI) {

    let StatusText = clientAPI.getBindingObject().Status;

    return StatusText === 'Open';
}
