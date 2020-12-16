import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#4bacb8" }}
    >
      <ActivityIndicator size="large" color="white" animating={true} />
    </View>
  );
};

export default Loading;
