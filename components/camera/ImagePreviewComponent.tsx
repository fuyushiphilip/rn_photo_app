import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ImagePreviewComponent({
  photoUri,
  text,
  setText,
  setPhotoUri,
}) {

  function dismissKeyboard() {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setPhotoUri(null)}
          style={styles.closeButton}
        >
          <View style={styles.glassCircle} />
          <Ionicons name="close-outline" size={28} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />
        <TextInput
          style={styles.captionInput}
          placeholder="Add a caption..."
          value={text}
          onChangeText={setText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
  captionInput: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    width: "80%",
    height: 50,
    paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 25,
    backgroundColor: "black",
    color: "white",
    zIndex: 10,
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
});