import React from "react";
import { Card, Text } from "react-native-elements";
import { View } from "react-native";

const CommentCard = (props) => {
  console.log(props);
  return (
    <View>
      <Card>
        <Text h4Style={{ color: "dodgerblue", marginBottom: 20 }} h4>
          {props.content.commentor_id}
        </Text>
        <Text style={{ fontSize: 16, color: "midnightblue" }}>
          {props.content.body}
        </Text>
      </Card>
    </View>
  );
};

export default CommentCard;
