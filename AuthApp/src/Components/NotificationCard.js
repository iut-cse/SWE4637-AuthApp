import React from 'react';
import { Card } from 'react-native-paper';
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

const NotificationCard = (props) => {
    console.log(props);
    let comment = props.content.comment;

    if(comment == ""){
        return (
            <Card
            style = {{borderRadius : 10}} 
            onPress = {() => {
                props.navigation.push("Post", {post : props.content.postid})
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "thumbs-o-up",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                {props.content.sender} Liked your post.
              </Text>
            </View>
          </Card>

        )
    }
    else {
        return (
            <Card 
            style = {{borderRadius : 10, margin : 5, shadowOffset : 10}}
            onPress = {() => {
                props.navigation.push("Post", {post : props.content.postid})
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "comment-alert-outline",
                  type: "material-community",
                  color: "black",
                  size : 15
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10, fontSize : 15 }}>
                {props.content.sender} Commented on your post.
              </Text>
            </View>
          </Card>
        )
    }
}

export default NotificationCard;

