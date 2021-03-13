import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Input,
} from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { SearchResult } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
import { AuthContext, PlantContext } from "../services/context";
import { Button } from "./Button";
import { ErrorToast } from "./ErrorToast";

export const EditPlantForm = () => {
  const {
    state: { error, loading },
    actions: { searchPlant },
  } = useContext(PlantContext);

  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [bioResourceKey, setBioResourceKey] = useState<number>();
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);

  const searchForScientificName = async (term: string) => {
    // TODO: might need to debounce this to prevent excess queries
    const results = await searchPlant(term);
    setSearchResults(results || []);
  };

  const selectScientificName = (index: number) => {
    const { scientificName, key } = searchResults[index];
    setScientificName(scientificName);
    setBioResourceKey(key);
  };

  return (
    <Card>
      <Input
        label="Name"
        placeholder="San pedro cactus"
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
      />
      <Autocomplete
        placeholder="Scientific name"
        value={scientificName}
        onSelect={selectScientificName}
        onChangeText={searchForScientificName}
      >
        {searchResults.map((item, index) => (
          <AutocompleteItem key={index} title={item.scientificName} />
        ))}
      </Autocomplete>
      {/* <Button loading={loading} onPress={loginUser}>
        Create!
      </Button> */}
      <ErrorToast error={error} />
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: Margin.sm,
  },
});
