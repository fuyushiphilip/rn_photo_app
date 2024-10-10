import { useState, useEffect } from "react";
import { View, SafeAreaView, Alert, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import ImagePreviewComponent from "@/components/camera/ImagePreviewComponent";
import PermissionComponent from "@/components/camera/PermissionComponent";

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

  // Open image picker immediately after permissions are granted
  useEffect(() => {
    const openImagePicker = async () => {
      if (mediaLibraryPermission) {
        const response = await ImagePicker.launchImageLibraryAsync({
          mediaType: "photo",
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        });

        if (!response.canceled && response.uri) {
          setPhotoUri(response.uri);
          Alert.alert(response.uri);
        }
      }
    };

    if (mediaLibraryPermission !== null) {
      openImagePicker();
    }
  }, [mediaLibraryPermission]);

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
    alignItems: "center",
  },
});
