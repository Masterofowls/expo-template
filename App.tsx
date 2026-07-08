import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, Text, Button, View, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('idle');

  useEffect(() => {
    if (Platform.OS === 'android') {
      getDeviceUser();
    }
  }, []);

  async function getDeviceUser() {
    setStatus('requesting-permission');
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      setStatus('permission-denied');
      return;
    }
    setStatus('reading-contacts');
    try {
      const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName], pageSize: 20 });
      if (data && data.length > 0) {
        const first = data[0];
        const name = [first.firstName, first.lastName].filter(Boolean).join(' ') || first.name;
        setUsername(name || 'User');
        setStatus('found');
        return;
      }
      setUsername('User');
      setStatus('not-found');
    } catch (e) {
      console.warn(e);
      setStatus('error');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello{username ? `, ${username}` : ', User'}!</Text>
      <Text style={styles.subtitle}>Platform: {Platform.OS}</Text>
      <View style={styles.row}>
        <Button title="Get device username" onPress={getDeviceUser} />
        <Text style={styles.status}>{status}</Text>
      </View>
      <Text style={styles.note}>This template requests Android contacts permission and shows a best-effort owner name.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  status: { marginLeft: 12 },
  note: { marginTop: 24, color: '#444', textAlign: 'center' }
});
