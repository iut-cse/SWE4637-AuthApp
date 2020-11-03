import { getDataJSON, storeDataJSON } from "./AsyncStorageFunction";

const AddNotification = async(value) => {
    let notifications = [];
    try{
        let storedNotification = await getDataJSON('notification');
        if(storedNotification != null){
            storedNotification.push(value);
            await storeDataJSON('notification', storedNotification);
        }
        else{
            notifications.push(value);
            await storeDataJSON('notification', notifications);
        }
    } catch(error){
        console.log(error);
    }
};

export default AddNotification;