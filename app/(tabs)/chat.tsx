import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import OpenAI from 'openai';
import * as Animatable from 'react-native-animatable';
import Markdown from 'react-native-markdown-display';
import { travelSuggestions } from '@/constants/Suggestion';

// Utility function to shuffle and select random suggestions
const getRandomSuggestions = (array: string[], num = 5) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Chat = () => {
  const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPEN_AI_KEY });
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(
    getRandomSuggestions(travelSuggestions)
  ); // Initialize random suggestions

  const handleSend = async (newMessages: IMessage[] = []) => {
    try {
      const userMessage: IMessage = newMessages[0];
      setMessages((prev) => GiftedChat.append(prev, [userMessage]));

      setIsTyping(true); // Show typing animation
      const messageText = userMessage.text.toLowerCase();

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
You are a cheerful and knowledgeable virtual travel guide that assists users in planning their trips, exploring destinations, and discovering hidden gems, all while speaking in an engaging and enthusiastic tone.
            `,
          },
          { role: 'user', content: `${messageText}` },
        ],
      });

      const answer =
        response.choices[0]?.message?.content || 'Please ask again';
      const botMessage = {
        _id: new Date().getTime(),
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Travel AI Assistant',
          avatar: 'https://i.imgur.com/7k12EPD.png', // Bot avatar
        },
      };

      setTimeout(() => {
        setMessages((prev) => GiftedChat.append(prev, [botMessage]));
        setSuggestions(getRandomSuggestions(travelSuggestions)); // Get new random suggestions after response
        setIsTyping(false); // Hide typing animation
      }, 3000); // Simulate response delay
    } catch (error) {
      console.error(error);
      setIsTyping(false); // Hide typing animation
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    const suggestionMessage: IMessage = {
      _id: new Date().getTime(),
      text: suggestion,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'User',
        avatar: 'https://i.imgur.com/4kT2y7A.png', // User avatar
      },
    };

    handleSend([suggestionMessage]);
  };

  const renderMessageText = (props: any) => {
    const { currentMessage } = props;

    if (currentMessage?.user._id === 2) {
      // Render bot messages with Markdown
      return (
        <View style={styles.messageContainer}>
          <Markdown style={markdownStyles}>{currentMessage.text}</Markdown>
        </View>
      );
    }

    // Default message rendering for user messages
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.userMessage}>{currentMessage.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 52, height: 52 }}
        />
        <Text style={styles.headerText}>Travel Assistant</Text>
        <TouchableOpacity>{/* Add any desired button here */}</TouchableOpacity>
      </View>

      {/* Chat */}
      <GiftedChat
        messages={messages}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{
          _id: 1,
          name: 'User',
          avatar: 'https://i.imgur.com/4kT2y7A.png',
        }}
        renderFooter={() =>
          isTyping ? (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>
                Travel AI Assistant is answering
              </Text>
              <View style={styles.dotsContainer}>
                {/* Animated dots in order */}
                <Animatable.Text
                  animation={{
                    0: { transform: [{ translateY: 0 }] },
                    0.5: { transform: [{ translateY: -5 }] },
                    1: { transform: [{ translateY: 0 }] },
                  }}
                  iterationCount="infinite"
                  duration={1000}
                  delay={0}
                  style={styles.dot}
                >
                  •
                </Animatable.Text>
                <Animatable.Text
                  animation={{
                    0: { transform: [{ translateY: 0 }] },
                    0.5: { transform: [{ translateY: -5 }] },
                    1: { transform: [{ translateY: 0 }] },
                  }}
                  iterationCount="infinite"
                  duration={1000}
                  delay={300}
                  style={styles.dot}
                >
                  •
                </Animatable.Text>
                <Animatable.Text
                  animation={{
                    0: { transform: [{ translateY: 0 }] },
                    0.5: { transform: [{ translateY: -5 }] },
                    1: { transform: [{ translateY: 0 }] },
                  }}
                  iterationCount="infinite"
                  duration={1000}
                  delay={600}
                  style={styles.dot}
                >
                  •
                </Animatable.Text>
              </View>
            </View>
          ) : (
            <View>
              {/* Suggestions */}
              <View style={styles.suggestionsContainer}>
                <FlatList
                  horizontal
                  data={suggestions} // Use dynamic suggestions
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionChip}
                      onPress={() => handleSuggestionPress(item)}
                    >
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          )
        }
        renderMessageText={renderMessageText}
        messagesContainerStyle={styles.messagesContainer}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontFamily: 'roboto-bold',
    fontSize: 26,
  },
  suggestionsContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  suggestionChip: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  suggestionText: {
    fontSize: 14,
    color: '#7fbbf0',
  },
  messagesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
  },
  typingText: {
    fontSize: 14,
    color: '#7fbbf0',
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  dot: {
    fontSize: 24,
    color: '#7fbbf0',
    marginHorizontal: 2,
  },
  messageContainer: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  userMessage: {
    fontSize: 16,
    color: '#ffffff',
  },
});

const markdownStyles = {
  body: {
    color: '#333333',
    fontSize: 16,
  },
  link: {
    color: '#7fbbf0',
  },
  heading1: {
    fontSize: 22,
    color: '#333333',
  },
  heading2: {
    fontSize: 18,
    color: '#333333',
  },
  code: {
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    fontSize: 14,
    padding: 8,
    color: '#d6336c',
    fontFamily: 'monospace',
  },
};
