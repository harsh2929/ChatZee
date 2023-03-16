import React from "react";
import { View, Text, StyleSheet, ImageBackground, Button } from "react-native";
import { useSelector } from "react-redux";
import { out} from "../../store/actions/Auth";

const Profile = ({ navigation }) => {
  const idus = useSelector((state) => state.auth.idus);
  const CurrentUser = useSelector((state) =>
    state.users.users.find((user) => user.idus == idus)
  );
  return (
    <View>
      <ImageBackground
        style={styles.image}
        imageStyle={{ opacity: 0.5 }}
        source={{ uri: CurrentUser.images }}
      >
        <Text style={styles.text}>{CurrentUser.name}</Text>
      </ImageBackground>
      <Text
        style={{
          textAlign: "center",
          margin: 15,
          fontSize: 15,
          fontFamily: "open-sans",
        }}
      >
        {CurrentUser.desc}
      </Text>
      <View style={styles.btnStyle}>
        <Button
          title="Logout"
          color="red"
          onPress={() => {
            Logout();
            navigation.navigate("Auth");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "Amtic-Bold",
    color: "white",
  },
  btnStyle: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
});

export default Profile;
