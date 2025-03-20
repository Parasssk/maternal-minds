
import express from 'express';
import { body, validationResult } from 'express-validator';
import { saveRegistration, getRegistrationById, getAllRegistrations } from '../services/registerService';

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body('name').isString().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('age').isInt({ min: 18, max: 60 }).withMessage('Age must be between 18 and 60'),
  body('phone').isString().isLength({ min: 10 }).withMessage('Phone must be at least 10 digits'),
  body('email').optional({ nullable: true, checkFalsy: true }).isEmail().withMessage('Please enter a valid email'),
  body('address').isString().isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),
  body('district').isString().isLength({ min: 2 }).withMessage('District must be at least 2 characters'),
  body('state').isString().isLength({ min: 2 }).withMessage('State must be at least 2 characters'),
  body('conceiveDate').isISO8601().withMessage('Conception date must be a valid date'),
  body('additionalInfo').optional(),
  body('preferredLanguage').isString()
];

// Create a new registration
router.post('/', validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const registration = await saveRegistration(req.body);
    res.status(201).json({ 
      success: true, 
      message: req.body.preferredLanguage === 'Hindi' ? 
        'पंजीकरण सफलतापूर्वक पूरा हुआ' : 
        'Registration successfully completed',
      data: registration 
    });
  } catch (error) {
    console.error('Error registering pregnancy:', error);
    res.status(500).json({ 
      success: false, 
      message: req.body.preferredLanguage === 'Hindi' ? 
        'पंजीकरण के दौरान एक त्रुटि हुई' : 
        'An error occurred during registration' 
    });
  }
});

// Get all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await getAllRegistrations();
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registrations' });
  }
});

// Get registration by ID
router.get('/:id', async (req, res) => {
  try {
    const registration = await getRegistrationById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registration' });
  }
});

export { router as registerRouter };
