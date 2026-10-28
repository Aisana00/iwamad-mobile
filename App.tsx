import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Aisana Zhumagali</Text>

      <Text style={styles.likes}>Likes: {likes}</Text>

      <Pressable
        onPress={() => setLikes(likes + 1)}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Pressable
        onPress={() => setLikes(0)}
        disabled={likes === 0}
        style={[styles.button, styles.resetButton, likes === 0 && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    color: '#555',
    marginBottom: 24,
  },
  likes: {
    fontSize: 22,
    marginBottom: 16,
  },
  button: {
    minHeight: 44,
    minWidth: 120,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  resetButton: {
    backgroundColor: '#6b7280',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});