import {
  Card,
  Datepicker,
  Divider,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SearchResult } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
import { PlantActions, PlantState } from "../reducers/plant";
import { ErrorToast } from "./ErrorToast";
import { Icon } from "./Icon";

type EditPlantFormProps = {
  context: {
    state: PlantState;
    actions: PlantActions;
  };
};

export const EditPlantForm = ({ context }: EditPlantFormProps) => {
  const {
    state: { error, loading },
    actions: { searchPlant },
  } = context;
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [bioResourceKey, setBioResourceKey] = useState<number>();
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  const [lastWatered, setLastWatered] = useState<Date>();
  const [frequency, setFrequency] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchForScientificName = async (term: string) => {
    if (term.length < 4) {
      return setSearchResults([]);
    }
    const results = await searchPlant(term);
    setSearchResults(results || []);
  };

  const selectScientificName = (index: number) => {
    const { scientificName, key } = searchResults[index];
    setScientificName(scientificName);
    setBioResourceKey(key);
    setSearchResults([]);
  };

  return (
    <Card style={styles.root}>
      <Input
        label="Name"
        placeholder="San pedro cactus"
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
      />
      <Input
        label="Search Scientific Name"
        placeholder="Echinopsis pachanoi"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.nativeEvent.text)}
        accessoryRight={() =>
          loading ? (
            <Spinner size="small" status="primary" />
          ) : (
            <>
              {searchResults.length ? (
                <Icon
                  size="sm"
                  name="close-outline"
                  onPress={() => setSearchResults([])}
                />
              ) : null}
              <Icon
                size="sm"
                name="search-outline"
                onPress={() => searchForScientificName(searchTerm)}
              />
            </>
          )
        }
        style={styles.input}
      />
      <ScrollView style={styles.searchScroll}>
        <List
          data={searchResults}
          ItemSeparatorComponent={Divider}
          renderItem={({ item, index }) => (
            <ListItem
              title={`${item.scientificName}`}
              onPress={() => selectScientificName(index)}
            />
          )}
        />
      </ScrollView>
      {scientificName ? (
        <Input
          disabled
          label="Scientific Name"
          value={scientificName}
          style={styles.input}
        />
      ) : null}
      {bioResourceKey ? (
        <Input
          disabled
          label="GBIF Key"
          value={bioResourceKey.toString()}
          style={styles.input}
        />
      ) : null}
      <Datepicker
        label="Last Watered"
        date={lastWatered}
        onSelect={(nextDate) => setLastWatered(nextDate)}
        style={styles.input}
      />
      <View style={styles.scheduleWrapper}>
        <Input
          label="Schedule"
          keyboardType="number-pad"
          value={frequency.toString()}
          style={styles.scheduleInput}
          onChange={(e) => setFrequency(e.nativeEvent.text)}
        />
        <RadioGroup
          selectedIndex={selectedIndex}
          style={styles.scheduleRadio}
          onChange={(index) => setSelectedIndex(index)}
        >
          <Radio>Days</Radio>
          <Radio>Weeks</Radio>
          <Radio>Months</Radio>
        </RadioGroup>
      </View>

      {/* <Button loading={loading} onPress={loginUser}>
        Create!
      </Button> */}
      <ErrorToast error={error} />
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft: Margin.md,
    marginRight: Margin.md,
    minHeight: "80%",
  },
  searchScroll: { maxHeight: 200 },
  input: {
    marginBottom: Margin.sm,
    minWidth: "100%",
  },
  scheduleInput: {
    flexGrow: 1,
    marginRight: Margin.md,
  },
  scheduleRadio: {
    marginTop: Margin.sm,
  },
  scheduleWrapper: {
    display: "flex",
    flexDirection: "row",
  },
});
