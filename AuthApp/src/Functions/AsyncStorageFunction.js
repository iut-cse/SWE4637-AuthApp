import { AsyncStorage } from "react-native";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    alert("Data STored Successfully!");
  } catch (error) {
    alert(error);
  }
};

const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    alert("Data Stored Successfully!");
  } catch (error) {
    alert(error);
  }
};

const getData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      alert("Not Found!");
    }
  } catch (error) {
    alert(error);
  }
};
const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      console.log("Email cannot be blank!");
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data Removed Successfully");
  } catch (error) {
    alert(error);
  }
};

const getAllKeys = async() => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch(error) {
     console.log(error)
  }
}

const getAllData = () => {
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
      }).catch((error) =>{
        console.log(error);
      });
  });
}

const mergeData=async(key,value) => {
  try{
    await AsyncStorage.mergeItem(key,value);
    return true;
  }catch(e){console.log(e)}
};

export { storeData, storeDataJSON, getData, getDataJSON, removeData, getAllKeys, getAllData, mergeData };