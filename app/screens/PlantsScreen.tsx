import React, { useEffect } from "react";
import { RefreshControl, StyleSheet, ScrollView } from "react-native";
import { Text } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { ModalBackground } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import { PlantState, requestPlants } from "../reducers/plant.reducer";
import { RootState } from "../reducers";
import { selectPlants } from "../selectors/plant.selectors";

interface Props {
  plants: PlantState;
}

function PlantScreen(props: Props) {
  const { loading, error, plants } = props.plants;

  const nav = useNavigation();
  const goToEditScreen = () => nav.navigate("EditPlantScreen");

  const dispatch = useDispatch();
  const getPlants = () => dispatch(requestPlants());

  // Refresh plant feed on init load and subsequent focuses
  useEffect(() => {
    getPlants();
    const unsubscribe = nav.addListener("focus", () => {
      getPlants();
    });
    return unsubscribe;
  }, [nav]);

  return (
    <Background style={styles.container}>
      <Button onPress={goToEditScreen}>Create Plant</Button>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPlants} />
        }
      >
        {plants.map(({ name }, i) => (
          <Text key={i}>{name}</Text>
        ))}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
}

const mapStateToProps = (state: RootState) => ({
  plants: selectPlants(state),
});

export default connect(mapStateToProps)(PlantScreen);

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
