/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function addExpenseButtonVisibility(clientAPI) {

    let StatusText = clientAPI.getBindingObject().Status;

    return StatusText === 'Approved';
}
