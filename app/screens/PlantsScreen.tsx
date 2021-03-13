import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, Text } from "@ui-kitten/components";
import { Background, Button, EditPlantForm } from "../components";
import { ModalBackground } from "../constants/Colors";
import { PlantContext } from "../services/context";

export default function PlantScreen() {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { error, loading },
    actions: { searchPlant },
  } = useContext(PlantContext);
  console.log("error, loading", error, loading);

  return (
    <Background style={styles.container}>
      <Button onPress={() => setShowModal(true)}>Create</Button>
      <Modal
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowModal(false)}
      >
        <EditPlantForm />
      </Modal>
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
