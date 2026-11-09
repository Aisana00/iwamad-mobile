import { Pressable, StyleSheet, Text } from 'react-native';
import type { Event } from '../data/events';

type Props = {
  event: Event;
  saved: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({ event, saved, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{event.date} · {event.place}</Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cardPressed: { backgroundColor: '#e0ecff', borderColor: '#2563eb' },
  title: { fontSize: 17, fontWeight: '600' },
  meta: { fontSize: 14, color: '#555', marginTop: 4 },
  saved: { marginTop: 6, color: '#b45309', fontWeight: '600' },
});
