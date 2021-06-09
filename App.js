import React, { useState, useEffect, useCallback } from "react";
import { Platform, Text, View, StyleSheet, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
} from "react-native-paper";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = useCallback(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView>
      <>
        <Card style={{ margin: 10 }}>
          <Card.Title
            title="Location App"
            subtitle="React native - expo example"
          />
          <Card.Content>
            <Title>Latitude</Title>
            <Paragraph>{location?.coords?.latitude}</Paragraph>
            <Title>Longitude</Title>
            <Paragraph>{location?.coords?.longitude}</Paragraph>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
        <FAB
          style={styles.fab}
          small
          icon="map"
          onPress={() => getLocation()}
        />
      </>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
