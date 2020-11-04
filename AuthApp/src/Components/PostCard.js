import React, {useState} from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { mergeData } from "../Functions/AsyncStorageFunction";
import AddNotification from "../Functions/NotificationFunction";

const PostCard = (props) => {
  const [like, setlike] = useState(props.content.likes);
  //console.log(props.content);

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />

        <Text h4Style={{ padding: 10 }} h4>
          {props.content.user_name}
        </Text>
      </View>
      <Text >{props.content.date}</Text>
      <Text
        style={{
          paddingVertical: 10,
          fontSize : 20
        }}
      >
        {props.content.post}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type=  "outline"
          title = { " LIKES  (" + like + ") " } 
          raised
          icon={< MaterialCommunityIcons name="heart-outline" size={27} color="lightsalmon" />}
          onPress = { async () => {
            await mergeData(props.content.id, JSON.stringify({likes : like + 1}));
            let likedObject = {
              postid : props.content.id,
              comment : "",
	            receiver : props.content.user_email,
              sender : props.currentuser.name,
            };
            await AddNotification(likedObject);
            setlike(like + 1)

          }}
        />
        <Button
          type="outline"
          titleStyle = {{fontSize : 18}}
          title="Comment"
          raised
          onPress = { function () {
            props.navigation.navigate("Post", { post : props.content.id })
          }}
        />
      </View>
    </Card>
  );
};

export default PostCard;
