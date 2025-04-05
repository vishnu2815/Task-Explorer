import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from 'react';

export default function DetailScreen() {
  const { task } = useLocalSearchParams();
  const parsed = JSON.parse(task as string);
  const [localTask, setLocalTask] = useState(parsed);

  const toggleStatus = () => {
    setLocalTask({ ...localTask, completed: !localTask.completed });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{localTask.title}</Text>
      <Text>User ID: {localTask.userId}</Text>
      <Text>Status: {localTask.completed ? '✓ Completed' : '✗ Incomplete'}</Text>
      <Button title="Toggle Completion" onPress={toggleStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
