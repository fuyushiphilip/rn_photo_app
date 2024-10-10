import { CameraView, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function CameraComponent({
  onPictureTaken,
  imageUri,
  openImagePicker,
}) {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef(null);

  async function takePicture() {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      onPictureTaken(picture.uri);
    }
  }

 function toggleCameraFacing() {
      setFacing((current: any) => (current === "back" ? "front" : "back"));
    }

  return (
    <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef}>
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={openImagePicker}
          style={styles.touchableCircle}
        >
          <View style={styles.glassCircle} />
          <Ionicons name="image-outline" size={24} color="white" />
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
          <Ionicons name="refresh-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
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
  touchableCircle: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  glassCircle: {
    position: "absolute",
    width: 40,
    height: 40,
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