
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '../models/ChatMessage';
import { getAIResponse } from '../../../utils/chatUtils';

// Mock database for chat messages
const chatMessages: ChatMessage[] = [];

// Generate chat response using the utility function
export const generateChatResponse = async (message: string, language: string = 'en'): Promise<string> => {
  // Using the existing utility function from the frontend
  return await getAIResponse(message, language);
};

// Save chat message to the database
export const saveChatMessage = async (data: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> => {
  const newMessage: ChatMessage = {
    id: uuidv4(),
    ...data,
    timestamp: new Date()
  };
  
  chatMessages.push(newMessage);
  return newMessage;
};

// Get chat history for a user (in a real app, you'd have user identification)
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  return chatMessages;
};
