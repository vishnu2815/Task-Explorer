import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import TaskItem from '../components/TaskItem/TaskItem';
import { getData, storeData } from '../utils/storage';

const FILTERS = ['All', 'Completed', 'Incomplete'];

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);

  const fetchTasks = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTasks(data);
      await storeData(data);
    } catch (err) {
      const cached = await getData();
      if (cached) setTasks(cached);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  const toggleFilter = () => {
    const next = (filterIndex + 1) % FILTERS.length;
    setFilter(FILTERS[next]);
    setFilterIndex(next);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return (
    <View style={styles.center}>
      <Text style={styles.error}>Error fetching tasks.</Text>
      <Button title="Retry" onPress={fetchTasks} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title={`Filter: ${filter}`} onPress={toggleFilter} />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={() => router.push({ pathname: 'explore', params: { task: JSON.stringify(item) } })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', marginBottom: 10 },
});
