import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as firebase from "firebase";
import "firebase/firestore";

const PostCard = (props) => {
  let time = props.content.created_at.toDate();
  //console.log(props.content);
  //console.log(props.postid);
  //console.log(props.currentUser);

  return (
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
          {props.content.author}
        </Text>
      </View>
      <Text>{time.toString()}</Text>
      <Text
        style={{
          paddingVertical: 10,
          fontSize: 20,
        }}
      >
        {props.content.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={" LIKES  (" + props.content.likes.length + ") "}
          raised
          icon={
            <MaterialCommunityIcons
              name="heart-outline"
              size={27}
              color="lightsalmon"
            />
          }
          onPress={async () => {
            firebase
              .firestore()
              .collection("posts")
              .doc(props.postid)
              .update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                  props.currentUser.uid
                ),
              })
              .catch((error) => {
                alert(error);
              });
          }}
        />
        <Button
          type="outline"
          titleStyle={{ fontSize: 18 }}
          title="Comment"
          raised
          onPress={function () {
            props.navigation.navigate("Post", {
              postid: props.postid,
              currentUser: props.currentUser,
              content: props.content,
            });
          }}
        />
      </View>
    </Card>
  );
};

export default PostCard;
