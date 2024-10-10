import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Alert, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import ImagePreviewComponent from "@/components/camera/ImagePreviewComponent";
import PermissionComponent from "@/components/camera/PermissionComponent";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

export default function App() {
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [text, setText] = useState("");

  // Request media library permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need media library access to proceed."
        );
      }
      setMediaLibraryPermission(status === "granted");
    })();
  }, []);

  // Function to open image picker
  const openImagePicker = async () => {
    if (mediaLibraryPermission) {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });

      if (!response.canceled && response.assets) {
        setPhotoUri(response.assets[0].uri);
      }
    }
  };

  // Use focus effect to open image picker when component is focused
  useFocusEffect(
    React.useCallback(() => {
      if (mediaLibraryPermission !== null) {
        openImagePicker();
      }
    }, [mediaLibraryPermission])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {photoUri ? (
          <ImagePreviewComponent
            photoUri={photoUri}
            text={text}
            setText={setText}
            setPhotoUri={setPhotoUri}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
