
import express from 'express';
import { body } from 'express-validator';
import { generateChatResponse, saveChatMessage } from '../services/chatService';

const router = express.Router();

// Generate chat response
router.post('/response', [
  body('message').isString().notEmpty(),
  body('language').isString().default('en')
], async (req, res) => {
  try {
    const { message, language } = req.body;
    const response = await generateChatResponse(message, language);
    
    // Save the message and response in chat history
    await saveChatMessage({
      role: 'user',
      content: message,
      language
    });
    
    await saveChatMessage({
      role: 'assistant',
      content: response,
      language
    });
    
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ 
      success: false, 
      message: req.body.language === 'hi' ? 
        'चैट प्रतिक्रिया उत्पन्न करने में त्रुटि हुई' : 
        'Error generating chat response' 
    });
  }
});

export { router as chatRouter };
