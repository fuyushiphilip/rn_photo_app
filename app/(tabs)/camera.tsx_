import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [text, setText] = useState("");
    const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === "granted");


    })();
  }, []);

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      setPhotoUri(picture.uri);
      console.log("Photo taken:", picture.uri);
      savePhoto(picture.uri);
    }
  }

  async function savePhoto(uri) {
    if (mediaLibraryPermission) {
      await MediaLibrary.saveToLibraryAsync(uri);
      //   Alert.alert("Success", "Photo saved to gallery!");
    } else {
      Alert.alert("Permission Required", "Please grant media library access.");
    }
  }
  async function openImagePicker() {
    // Request media library permission if not granted
    if (!mediaLibraryPermission) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === "granted");
    }

    if (mediaLibraryPermission) {
      const options = {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      const response = await ImagePicker.launchImageLibraryAsync(options); // Use async/await

      if (response.cancelled) {
        console.log("User cancelled image picker");
      } else if (response.uri) {
        setImageUri(response.uri);
      }
    } else {
      Alert.alert("Permission Required", "Please grant media library access.");
    }
  }


  function dismissKeyboard() {
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {photoUri ? (
          // Show the taken photo
          <Image source={{ uri: photoUri }} style={styles.imagePreview} />
        ) : (
          // Show the camera view
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.navContainer}>
              <TouchableOpacity
                onPress={openImagePicker}
                style={styles.touchableCircle}
              >
                <View style={styles.glassCircle} />
                <Ionicons name="image-outline" size={28} color="white" />
                {imageUri && (
                  <Image source={{ uri: imageUri }} style={styles.image} />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={takePicture}>
                <View style={styles.circle}>
                  <View style={styles.fill} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleCameraFacing}
                style={styles.touchableCircle}
              >
                <View style={styles.glassCircle} />
                <View>
                  <Ionicons name="refresh-outline" size={32} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </CameraView>
        )}

        {photoUri && (
          // Replace the icon with text when a photo is taken
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => setPhotoUri(null)}
                style={styles.closeButton}
              >
                <View style={styles.glassCircle} />
                <Ionicons name="close-outline" size={28} color="white" />
              </TouchableOpacity>
              <TextInput
                style={styles.captionInput}
                placeholder="Add a caption..."
                value={text}
                onChangeText={setText}
              />
            </View>
          </TouchableWithoutFeedback>
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
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  navContainer: {
    backgroundColor: "transparent",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    fontSize: 18,
    color: "#000",
  },
  circle: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 65 / 2,
    padding: 3,
  },
  fill: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 65 / 2,
  },
  circleContainer: {},
  imagePreview: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
  textContainer: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  captionInput: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    width: "80%",
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    backgroundColor: "black",
    color: "white",
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableCircle: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  glassCircle: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 40,
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    borderColor: "rgba(255, 255, 255, 0)",
    borderWidth: 1,
    backdropFilter: "blur(5px)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
