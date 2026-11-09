import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const visibleEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  function toggleSave(id: number) {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id]
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={visibleEvents}
        keyExtractor={(e) => String(e.id)}
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
  input: {
    minHeight: 44,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  hint: { marginHorizontal: 16, marginBottom: 8, color: '#555' },
  empty: { textAlign: 'center', marginTop: 24, fontSize: 16, color: '#777' },
});
