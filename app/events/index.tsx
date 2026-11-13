import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();

  function toggleSave(id: number) {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id]
    );
  }

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.status}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.status}>{error.message}</Text>
        <Pressable
          onPress={() => refetch()}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const visibleEvents = data.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={visibleEvents}
        keyExtractor={(e) => String(e.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListHeaderComponent={
          <View>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="Search events"
            />
            <Text style={styles.hint}>
              Long-press an event to save it. Saved: {savedIds.length}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, backgroundColor: '#f5f5f5' },
  status: { fontSize: 16, color: '#555', textAlign: 'center' },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: '#b91c1c' },
  button: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#2563eb' },
  buttonPressed: { backgroundColor: '#1d4ed8' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  input: {
    minHeight: 44, margin: 16, marginBottom: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff', fontSize: 16,
  },
  hint: { marginHorizontal: 16, marginBottom: 8, color: '#555' },
  empty: { textAlign: 'center', marginTop: 24, fontSize: 16, color: '#777' },
});