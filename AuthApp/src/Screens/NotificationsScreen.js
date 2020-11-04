import React,{ useState, useEffect } from 'react';
import {  FlatList, View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { AuthContext } from "../Providers/AuthProvider";
import { getDataJSON } from "../Functions/AsyncStorageFunction";
import NotificationCard from "../Components/NotificationCard";

const NotificationScreen = (props) => {
  let [notifications, setNotifications] = useState([]);
  const [reload,setReload]=useState(false);

  const getNotification = async() => {
    setReload(true);
    let notify = await getDataJSON('notification');
    if(notify!=null ){
      setNotifications(notify);
    }
    else{
      console.log("No new notifications");
    }
    setReload(false);
  }

  useEffect(()=>{
    getNotification();
  },[]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <View>
            <FlatList
              data = {notifications}
              onRefresh = {getNotification}
              refreshing = {reload}
              renderItem = {function ({ item}) {
                if(item.receiver == auth.CurrentUser.email){
                  return (
                    <NotificationCard
                      content = { item }
                      navigation = {props.navigation}
                    />
                  );
                }
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;