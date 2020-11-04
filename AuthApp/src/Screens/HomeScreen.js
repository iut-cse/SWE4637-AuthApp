import React, { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
} from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
import PostCard from "./../Components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { AuthContext } from "../Providers/AuthProvider";
import { StatusBar } from 'expo-status-bar';
import { getDataJSON, storeDataJSON } from "../Functions/AsyncStorageFunction";
import { getAllPosts } from "../Functions/PostFunction";
import moment from 'moment';

function CurrentDate() {
  date = new moment().format('MMMM Do YYYY, h:mm a');
  return date;
}

const HomeScreen = (props) => {
    //AsyncStorage.clear();
    const [Posts, setPosts] = useState([]);
    const [SinglePost, setSinglePost] = useState('');
    const [reload,setReload]=useState(false);
    const input = React.createRef();

    const getPosts = async ()=>{
      setReload(true);
      let Allposts= await getAllPosts();
      if(Posts != null)
      {
          setPosts(Allposts);
      }
      else alert("No new posts");
      setReload(false);
  }

  useEffect(()=>{
    getPosts();
  },[]);

    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
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
              <Input
                ref = { input }
                placeholder="What's On Your Mind?"
                multiline = { true }
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={function (currentInput) {
                  setSinglePost(currentInput);
                }}
                
              />
              <Button title="Post" type="outline"
                disabled={SinglePost.length==0 ? true : false}
                onPress={
                  ()=>{
                      id = Math.floor((Math.random() * 100000) + 1);
                      if(SinglePost.length > 0){
                          let NewPost={
                          id : "post"+id,
                          post : SinglePost,
                          user_name : auth.CurrentUser.name,
                          user_email : auth.CurrentUser.email,
                          likes : 0,
                          date: CurrentDate(),
                          }
                          //console.log(NewPost);
                          storeDataJSON("post"+id,NewPost);
                          setSinglePost("");
                          input.current.clear();
                      }
                      else {
                          alert("Write something to post!");
                      }
                  }
              }/>
              
            </Card>
            
            
            <FlatList
              data={Posts}
              onRefresh = { getPosts }
              refreshing = { reload }
              renderItem={function ({ item }) {
                return (
                  <PostCard
                    content = { item }
                    currentUser = {auth.CurrentUser}
                    navigation = { props.navigation }
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  }

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