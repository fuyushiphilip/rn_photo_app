import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PermissionComponent({
  cameraPermission,
  requestCameraPermission,
}) {
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

  return null; // If permission is granted, nothing to show here
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});