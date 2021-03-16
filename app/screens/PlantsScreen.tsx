import React from "react";
import { StyleSheet } from "react-native";
import { Background, Button } from "../components";
import { ModalBackground } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function PlantScreen() {
  const nav = useNavigation();
  const goToEditScreen = () => nav.navigate("EditPlantScreen");
  return (
    <Background style={styles.container}>
      <Button onPress={goToEditScreen}>Create</Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: ModalBackground,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
