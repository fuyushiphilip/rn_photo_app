import { useState, useEffect } from "react";
import { View, SafeAreaView, Alert, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import CameraComponent from "@/components/camera/CameraComponent";
import ImagePreviewComponent from "@/components/camera/ImagePreviewComponent";
import PermissionComponent from "@/components/camera/PermissionComponent";

export default function App() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === "granted");
    })();
  }, []);

  async function savePhoto(uri) {
    if (mediaLibraryPermission) {
      await MediaLibrary.saveToLibraryAsync(uri);
    } else {
      Alert.alert("Permission Required", "Please grant media library access.");
    }
  }

  async function openImagePicker() {
    if (!mediaLibraryPermission) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === "granted");
    }

    if (mediaLibraryPermission) {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });

      if (!response.canceled && response.assets) {
        // setImageUri(response.assets[0].uri);
        setPhotoUri(response.assets[0].uri);
        // console.log(response.assets[0].uri);
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PermissionComponent
        cameraPermission={cameraPermission}
        requestCameraPermission={requestCameraPermission}
      />
      <View style={styles.container}>
        {photoUri ? (
          <ImagePreviewComponent
            photoUri={photoUri}
            text={text}
            setText={setText}
            setPhotoUri={setPhotoUri}
          />
        ) : (
          <CameraComponent
            onPictureTaken={(uri: any) => {
              setPhotoUri(uri);
              savePhoto(uri);
            }}
            imageUri={imageUri}
            openImagePicker={openImagePicker}
            // toggleCameraFacing={toggleCameraFacing}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
