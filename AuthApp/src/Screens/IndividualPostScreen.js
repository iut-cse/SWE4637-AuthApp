import  React, { useEffect, useState } from "react";
import { View,FlatList } from "react-native";
import { Card, Button, Text, Avatar, Header, Input } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommentCard from "../Components/CommentCard"

import AddNotification from "../Functions/NotificationFunction";
import { AuthContext } from "../Providers/AuthProvider";
import { getDataJSON } from "../Functions/AsyncStorageFunction";

const IndividualPostScreen = (props) => {

    //console.log(props);
    let postID = props.route.params.post;
    let [postDetails, setPostDetails] = useState({});
    const [postComment, setPostComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [reload,setReload]=useState(false);
    const input = React.createRef();

    const getPostDetails =async()=>{
        let postDetails=await getDataJSON(postID);
        if(postDetails!=null){
            setPostDetails(postDetails);
        }
        else console.log("no post")
    }

    const getComments=async ()=>{
       
        let allComments=await getDataJSON('notification');
        if(allComments!=null){
            let Comment = allComments.filter(x=>x.postid == postDetails.id && x.comment != '')
            setPostComment(Comment)
        }
        else console.log("no comment")
        setReload(false)
    }

    useEffect(()=>{
        getPostDetails();
    },[]);

    useEffect(()=>{
        getComments();
    });

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
                    <StatusBar style = "light"/>
                    <Header
                        leftComponent = {{
                            icon: "menu",
                            color: "#fff",
                            onPress : function () {
                            props.navigation.toggleDrawer();
                            }
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

                    <Card>
                        <View
                            style = {{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>

                            <Avatar
                                containerStyle={{ backgroundColor: "#ffab91" }}
                                rounded
                                icon={{ name: "user", type: "font-awesome", color: "black" }}
                                activeOpacity={1}
                            />

                            <Text h4Style={{ padding: 10 }} h4> { postDetails.user_name } </Text>
                        </View>
                        <Text >{ postDetails.date }</Text>
                        <Text
                            style={{
                            paddingVertical: 10,
                            fontSize : 20
                            }}
                        >
                            {postDetails.post}
                        </Text>
                        <Card.Divider/>
                        <View style = {{flexDirection : "row", justifyContent : "space-between", marginTop : 5, marginLeft : 2}}> 
                            <Text style = {{fontSize : 14, color : "dodgerblue", fontWeight : "bold"}}>{postDetails.likes} LIKES</Text>
                            <Text style = {{fontSize : 14, color : "dodgerblue", fontWeight : "bold"}}>COMMENTS</Text>
                        </View>
                    </Card>

                    <Card>
                        <View>
                            <Input
                                ref = {input}
                                leftIcon = {<MaterialCommunityIcons name="comment-outline" size={24} color="black" />}
                                placeholder = "Write your comment!"
                                multiline = {true}
                                onChangeText = {(currentInput) => {
                                    setNewComment(currentInput);
                                }}
                            />
                            <Button
                                title = "Comment"
                                type = "solid"
                                disabled = {newComment.length == 0 ? true : false }
                                onPress = {() => {
                                    let commented = {
                                        postid:postDetails.id,
                                        comment:newComment,
                                        receiver:postDetails.user_email,
                                        sender:auth.CurrentUser.name
                                    }
                                    AddNotification(commented);
                                    setNewComment("");
                                    input.current.clear();
                                }}
                            />
                        </View>
                    </Card>
                    <FlatList
                        data = {postComment}
                        onRefresh = {getComments}
                        refreshing = {reload}
                        renderItem = {function ({ item }) {
                            return (
                                <CommentCard
                                    content = { item }
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View>


            )}
        </AuthContext.Consumer>
    )

}



export default IndividualPostScreen;




