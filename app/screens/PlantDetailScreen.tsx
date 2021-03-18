import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Background } from "../components";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { PlantContext } from "../services/context";

export const PlantDetailScreen = () => {
    const {
        state: {plants, loading, error},
        actions: { getPlantById }
    } = useContext(PlantContext);
    // useScreenFocus(() => {});
    return (
        <Background>
        <ScrollView>
            
        </ScrollView>
    </Background>
    );
};