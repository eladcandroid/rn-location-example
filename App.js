import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { ExpoLeaflet } from "expo-leaflet";

export default function App() {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 36.850769,
    lng: -76.285873,
  });

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
      setMapCenterPosition({
        lat: location?.coords?.latitude,
        lng: location?.coords?.longitude,
      });
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
        <View style={{ height: "100%", paddingTop: 30 }}>
          <Card style={{ margin: 10, flex: 1 }}>
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
          <View style={{ flex: 1 }}>
            <ExpoLeaflet
              backgroundColor={"green"}
              onMessage={() => console.log("")}
              mapLayers={[
                {
                  attribution:
                    '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                  baseLayerIsChecked: true,
                  baseLayerName: "OpenStreetMap.Mapnik",
                  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                },
              ]}
              mapMarkers={[
                {
                  id: "1",
                  position: {
                    lat: mapCenterPosition.lat,
                    lng: mapCenterPosition.lng,
                  },
                  icon: "https://www.pinclipart.com/picdir/middle/537-5374089_react-js-logo-clipart.png",
                  size: [32, 32],
                },
              ]}
              mapCenterPosition={mapCenterPosition}
              zoom={15}
            />
          </View>
        </View>
        <FAB
          style={styles.fab}
          small
          icon="map"
          onPress={() => getLocation()}
        />
      </>
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
