import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

  // Debugging the photoUri
  console.log("Photo URI: ", photoUri);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        <TouchableOpacity
          onPress={() => setPhotoUri(null)}
          style={styles.closeButton}
        >
          <View style={styles.glassCircle} />
          <Ionicons name="close-outline" size={28} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Add a caption..."
            value={text}
            onChangeText={setText}
          />
          <View style={styles.container1}>
            <TouchableOpacity>
              <View style={styles.sendCircle}>
                <Ionicons
                  name="send"
                  size={18}
                  color="black" // Change to white for better contrast
                  style={styles.sendIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end", // 確保 TextInput 在底部
    paddingBottom: 0, // 給 TextInput 一些底部間距
  },
  inputContainer: {
    width: "80%", // Set width of the input container
    alignSelf: "center", // Center the container horizontally
    flexDirection: "column", // Stack children vertically
    alignItems: "flex-end", // Align items to the right (for the button)
  },
  captionInput: {
    width: "80%",
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "black",
    // color: "white",
    alignSelf: "center", // 將 TextInput 居中
    zIndex: 10,
  },
  touchable: {
    position: "absolute", // Positioning the button absolutely
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
  sendCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#25D366", // WhatsApp green color
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 10,
    marginRight: 30
  },
  sendIcon: {
    paddingLeft: 3,
  },
  container1: {
    backgroundColor: "rgba(24, 23, 23, 0.85)", // Background color with transparency
    overflow: "hidden", // Ensure child elements respect border radius
    height: 50,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
