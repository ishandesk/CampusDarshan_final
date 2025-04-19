import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as Speech from 'expo-speech';
import { askGemini } from '../../services/geminiapi';

export default function Narration() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const botReply = await askGemini(input);

    Speech.speak(botReply, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.95,
    });

    setMessages((prev) => [...prev, { type: 'bot', text: botReply }]);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.messageRow, msg.type === 'bot' && styles.botRow]}>
            {msg.type === 'bot' && (
              <Image
                source={require('../../assets/images/campusdarshan.png')}
                style={styles.avatar}
              />
            )}
            <View
              style={[
                styles.messageBubble,
                msg.type === 'user' ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
        {loading && (
          <ActivityIndicator
            size="small"
            color="#2C3E50"
            style={{ marginTop: 10 }}
          />
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Ask about NIT Delhi..."
          value={input}
          onChangeText={setInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  chatContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#E2E8F0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#1A202C',
  },
  inputArea: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    borderRadius: 30,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A202C',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
