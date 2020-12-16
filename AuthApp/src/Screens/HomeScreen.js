import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Input, Header } from "react-native-elements";
import PostCard from "./../Components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../Providers/AuthProvider";
import { StatusBar } from "expo-status-bar";

import { getAllPosts } from "../Functions/PostFunction";
import * as firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDwqn_FueJNQh-vTKr6JCmtlGdac3xKi0c",
  authDomain: "blogapp-3b142.firebaseapp.com",
  projectId: "blogapp-3b142",
  storageBucket: "blogapp-3b142.appspot.com",
  messagingSenderId: "430947705429",
  appId: "1:430947705429:web:406cb243077d49bdac6adc",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HomeScreen = (props) => {
  //AsyncStorage.clear();
  const [Posts, setPosts] = useState([]);
  const [PostInput, setPostInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const input = React.createRef();

  const getPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
        //console.log(Posts);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <StatusBar style="light" />
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
                console.log(Math.floor(Math.random() * 100000 + 1));
                //console.log(auth.CurrentUser);
              },
            }}
            centerComponent={{
              text: "The Office",
              style: { color: "#fff" },
            }}
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
          <Card>
            <Input
              ref={input}
              placeholder="What's On Your Mind?"
              multiline={true}
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={function (currentInput) {
                setPostInput(currentInput);
              }}
            />
            <Button
              title="Post"
              type="solid"
              disabled={PostInput.length == 0 ? true : false}
              onPress={() => {
                setLoading(true);
                firebase
                  .firestore()
                  .collection("posts")
                  .add({
                    userID: auth.CurrentUser.uid,
                    body: PostInput,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: [],
                    comments: [],
                  })
                  .then((doc) => {
                    setLoading(false);
                    alert("Post created with ID: " + doc.id);
                  })
                  .catch((error) => {
                    setLoading(false);
                    alert(error);
                  });
                input.current.clear();
              }}
            />
          </Card>

          <FlatList
            data={Posts}
            onRefresh={getPosts}
            refreshing={Loading}
            renderItem={function ({ item }) {
              return (
                <PostCard
                  postid={item.id}
                  content={item.data}
                  currentUser={auth.CurrentUser}
                  navigation={props.navigation}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
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

export default HomeScreen;
