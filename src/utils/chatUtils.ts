
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const getCurrentTimestamp = (): Date => {
  return new Date();
};

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const initialMessages: Message[] = [
  {
    id: generateId(),
    content: "Hello! I'm your RMNCHA health assistant. How can I help you today with maternal, newborn, child, or adolescent health?",
    role: 'assistant',
    timestamp: getCurrentTimestamp(),
  },
];

// This is a mock function that simulates an AI response
// In a real app, this would make an API call to your backend
export const getAIResponse = async (message: string): Promise<string> => {
  console.log('Sending message to AI:', message);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple response logic based on keywords
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('pregnancy') || messageLower.includes('pregnant')) {
    return "Regular prenatal care is essential during pregnancy. The Janani Suraksha Yojana (JSY) provides financial assistance for hospital deliveries. Would you like to know more about pregnancy care or government schemes?";
  } else if (messageLower.includes('baby') || messageLower.includes('infant') || messageLower.includes('newborn')) {
    return "Newborns should receive their first vaccinations within 24 hours of birth. Breastfeeding is recommended for the first 6 months. The Mission Indradhanush scheme ensures full immunization coverage. Would you like specific advice about newborn care?";
  } else if (messageLower.includes('child') || messageLower.includes('toddler')) {
    return "Children should receive regular health check-ups and complete all recommended vaccinations. The Integrated Child Development Services (ICDS) provides nutritional support and health services. Does your child need specific health guidance?";
  } else if (messageLower.includes('adolescent') || messageLower.includes('teen')) {
    return "Adolescent health includes physical, mental, and social well-being. The Rashtriya Kishor Swasthya Karyakram (RKSK) focuses on adolescent health. Would you like information about nutrition, mental health, or reproductive health for adolescents?";
  } else if (messageLower.includes('scheme') || messageLower.includes('government') || messageLower.includes('assistance')) {
    return "Several government schemes support maternal and child health in India, including Janani Suraksha Yojana (JSY), Pradhan Mantri Matru Vandana Yojana (PMMVY), and Ayushman Bharat. Would you like details about a specific scheme?";
  } else if (messageLower.includes('hospital') || messageLower.includes('doctor') || messageLower.includes('medical')) {
    return "It's important to find the right healthcare provider. Would you like me to help you locate nearby hospitals or ASHA workers in your area?";
  } else if (messageLower.includes('diet') || messageLower.includes('nutrition') || messageLower.includes('food')) {
    return "Proper nutrition is essential for maternal and child health. A balanced diet should include proteins, carbohydrates, healthy fats, vitamins, and minerals. Would you like specific dietary recommendations?";
  } else if (messageLower.includes('vaccination') || messageLower.includes('vaccine') || messageLower.includes('immunization')) {
    return "Vaccinations are crucial for preventing serious diseases. The Universal Immunization Programme (UIP) provides free vaccines for children. Would you like to know about the vaccination schedule or specific vaccines?";
  } else {
    return "I'm here to help with reproductive, maternal, newborn, child, and adolescent health questions. I can also provide information about government health schemes. Could you please be more specific about what you'd like to know?";
  }
};
