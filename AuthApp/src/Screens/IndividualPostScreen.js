import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Header,
  Input,
} from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommentCard from "../Components/CommentCard";
import { AuthContext } from "../Providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";

const IndividualPostScreen = (props) => {
  //console.log(props);
  let postID = props.route.params.postid;
  let content = props.route.params.content;
  let currentUser = props.route.params.currentUser;
  let time = content.created_at.toDate();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const input = React.createRef();

  //console.log(content.comments);
  //console.log(currentUser);

  const getComments = async () => {
    setAllComments(content.comments);
    console.log(getComments);
  };

  useEffect(() => {
    getComments();
  });

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View>
          <StatusBar style="light" />
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

          <Card>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                containerStyle={{ backgroundColor: "#ffab91" }}
                rounded
                icon={{ name: "user", type: "font-awesome", color: "black" }}
                activeOpacity={1}
              />

              <Text h4Style={{ padding: 10 }} h4>
                {" "}
                {content.author}{" "}
              </Text>
            </View>
            <Text>{time.toString()}</Text>
            <Text
              style={{
                paddingVertical: 10,
                fontSize: 20,
              }}
            >
              {content.body}
            </Text>
            <Card.Divider />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                marginLeft: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "dodgerblue",
                  fontWeight: "bold",
                }}
              >
                {content.likes.length} LIKES
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "dodgerblue",
                  fontWeight: "bold",
                }}
              >
                {content.comments.length} COMMENTS
              </Text>
            </View>
          </Card>

          <Card>
            <View>
              <Input
                ref={input}
                leftIcon={
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={24}
                    color="black"
                  />
                }
                placeholder="Write your comment!"
                multiline={true}
                onChangeText={(currentInput) => {
                  setNewComment(currentInput);
                }}
              />
              <Button
                title="Comment"
                type="solid"
                disabled={newComment.length == 0 ? true : false}
                onPress={() => {
                  setLoading(true);
                  firebase
                    .firestore()
                    .collection("posts")
                    .doc(postID)
                    .update({
                      comments: firebase.firestore.FieldValue.arrayUnion({
                        commentor_id: currentUser.displayName,
                        body: newComment,
                      }),
                    })
                    .then(() => {
                      setLoading(false);
                      alert("Comment added successfully!");
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert("Error updating comment: " + error);
                    });
                }}
              />
            </View>
          </Card>
          <FlatList
            data={content.comments}
            renderItem={function ({ item }) {
              return <CommentCard content={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

export default IndividualPostScreen;
