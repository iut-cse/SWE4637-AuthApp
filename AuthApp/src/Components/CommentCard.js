import React from "react";
import {Card, Text,  } from "react-native-elements";
import { View } from "react-native";



const CommentCard = (props) => {
    return (
        <View>
            <Card>
                <Text h4Style={{ color : "dodgerblue", marginBottom : 20 }} h4>{props.content.sender}</Text>
                <Text style = {{fontSize : 16, color : "midnightblue"}}>{props.content.comment}</Text>    
            </Card>
                    
        </View>
    )
}

export default CommentCard;