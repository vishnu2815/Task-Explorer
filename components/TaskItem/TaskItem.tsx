import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={{ color: task.completed ? 'green' : 'red' }}>
        {task.completed ? '✓ Completed' : '✗ Incomplete'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
