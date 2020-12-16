import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage, Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../Providers/AuthProvider";
const ProfileScreen = (props) => {
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
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    auth.setIsLoggedIn(false);
                    auth.setCurrentUser({});
                  })
                  .catch((error) => {
                    alert(error);
                  });
              },
            }}
          />

          <Image
            source={require("../../assets/avatar.png")}
            style={{
              alignSelf: "center",
              width: 200,
              height: 200,
              margin: 20,
              marginTop: 60,
            }}
          />
          <Text style={styles.textStyle}>Name : Nafis Saami Azad</Text>
          <Text style={styles.textStyle}>Student ID : 170042007</Text>
          <Text style={styles.textStyle}>Room no : Non-resident</Text>
          <Text style={styles.textStyle}>Email : nafissazad@gmail.com</Text>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    top: 40,
  },
});

export default ProfileScreen;
