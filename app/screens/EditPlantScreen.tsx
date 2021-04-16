import {
  Datepicker,
  Divider,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Spinner,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Background, Button, ErrorToast, Icon } from "../components";
import {
  PlantForCreate,
  SearchResult,
  WateringPeriodOption,
  WateringPeriodValue,
} from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
import { createPlant, searchPlant } from "../reducers/plant.reducer";
import {
  getSearchResults,
  hasPlantError,
  isPlantsLoading,
} from "../selectors/plant.selectors";
import { getUser } from "../selectors/user.selectors";

export const EditPlantScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isPlantsLoading);
  const error = useSelector(hasPlantError);
  const results = useSelector(getSearchResults);
  const user = useSelector(getUser);

  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [bioResourceKey, setBioResourceKey] = useState<number>();
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  const [lastWatered, setLastWatered] = useState<Date>();
  const [frequency, setFrequency] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const wateringPeriods: WateringPeriodOption[] = ["days", "weeks", "months"];

  const searchForScientificName = async (term: string) => {
    if (term.length < 4) {
      return setSearchResults([]);
    }
    await dispatch(searchPlant.started({ term }));
    setSearchResults(results || []);
  };

  const selectScientificName = (index: number) => {
    const { scientificName, key } = searchResults[index];
    setScientificName(scientificName);
    setBioResourceKey(key);
    setSearchResults([]);
  };

  const submitPlant = () => {
    if (!lastWatered || !bioResourceKey || !frequency) {
      // TODO: proper form validation
      return;
    }
    const plantForCreate: PlantForCreate = {
      name,
      lastWatered: lastWatered.toISOString(),
      userId: user.id,
      biodiversityResourceKey: bioResourceKey,
      wateringFrequency: parseInt(frequency),
      wateringPeriod: selectedIndex as WateringPeriodValue,
    };
    dispatch(createPlant.started({ plant: plantForCreate }));
  };

  return (
    <Background>
      <ScrollView>
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
        ) : (
          <View />
        )}
        {bioResourceKey ? (
          <Input
            disabled
            label="GBIF Key"
            value={bioResourceKey.toString()}
            style={styles.input}
          />
        ) : (
          <View />
        )}
        <Datepicker
          label="Last Watered"
          date={lastWatered}
          placeholder="DD/MM/YYYY"
          onSelect={(nextDate) => setLastWatered(nextDate)}
          style={styles.input}
        />
        <View style={styles.scheduleWrapper}>
          <Input
            label="Schedule"
            keyboardType="number-pad"
            placeholder="1"
            value={frequency.toString()}
            style={styles.scheduleInput}
            onChange={(e) => setFrequency(e.nativeEvent.text)}
          />
          <RadioGroup
            selectedIndex={selectedIndex}
            style={styles.scheduleRadio}
            onChange={(index) => setSelectedIndex(index)}
          >
            {wateringPeriods.map((p) => (
              <Radio key={p}>{p}</Radio>
            ))}
          </RadioGroup>
        </View>

        <Button loading={loading} onPress={submitPlant}>
          Create!
        </Button>
        <ErrorToast error={error} />
      </ScrollView>
    </Background>
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
    marginBottom: Margin.sm,
  },
});
