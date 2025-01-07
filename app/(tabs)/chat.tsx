import { View, Text, TextStyle } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import axios from 'axios';
import OpenAI from 'openai';

const Chat = () => {
  const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPEN_AI_KEY });

  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSend = async (newMessages: IMessage[] = []) => {
    try {
      // Get user message
      const userMessage: IMessage = newMessages[0];
      setMessages((prev) => GiftedChat.append(prev, [userMessage]));
      const messageText = userMessage.text.toLowerCase();

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'developer',
            content: [
              {
                type: 'text',
                text: `
You are a cheerful and knowledgeable virtual travel guide that assists users in planning their trips, exploring destinations, and discovering hidden gems, all while speaking in an engaging and enthusiastic tone, as if you're an experienced and passionate tour guide ready to share the wonders of the world.
                `,
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `${messageText}`,
              },
            ],
          },
        ],
      });

      const answer = response.choices[0].message.content ?? 'Please ask again';
      const botMessage = {
        _id: new Date().getTime(),
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Travel AI assistant',
        },
      };

      setMessages((prev) => GiftedChat.append(prev, [botMessage]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 16,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.WHITE,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Travel AI assistant ⛰️🤖
        </Text>

        <View
          style={{
            alignSelf: 'center',
            backgroundColor: Colors.LIGHT_GRAY,
            width: '100%',
            height: '95%',
            borderRadius: 10,
          }}
        >
          <GiftedChat
            messages={messages}
            onSend={(newMessage) => handleSend(newMessage)}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat; // Ensure the component is exported correctly
