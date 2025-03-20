
import { v4 as uuidv4 } from 'uuid';
import { AshaWorker } from '../models/AshaWorker';

// Mock database with sample ASHA workers
const ashaWorkers: AshaWorker[] = [
  {
    id: uuidv4(),
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    phone: '9876543210',
    district: 'Pune',
    state: 'Maharashtra',
    address: '123 Health Center, Pune',
    addressHi: '123 स्वास्थ्य केंद्र, पुणे',
    specialization: 'Maternal Care',
    specializationHi: 'मातृ देखभाल',
    experience: 5,
    languages: ['English', 'Hindi', 'Marathi']
  },
  {
    id: uuidv4(),
    name: 'Sunita Devi',
    nameHi: 'सुनीता देवी',
    phone: '8765432109',
    district: 'Jaipur',
    state: 'Rajasthan',
    address: '456 Community Center, Jaipur',
    addressHi: '456 सामुदायिक केंद्र, जयपुर',
    specialization: 'Child Health',
    specializationHi: 'बाल स्वास्थ्य',
    experience: 8,
    languages: ['Hindi', 'English', 'Rajasthani']
  },
  {
    id: uuidv4(),
    name: 'Lakshmi Rao',
    nameHi: 'लक्ष्मी राव',
    phone: '7654321098',
    district: 'Hyderabad',
    state: 'Telangana',
    address: '789 Health Post, Hyderabad',
    addressHi: '789 स्वास्थ्य पोस्ट, हैदराबाद',
    specialization: 'Reproductive Health',
    specializationHi: 'प्रजनन स्वास्थ्य',
    experience: 6,
    languages: ['Telugu', 'English', 'Hindi']
  },
  {
    id: uuidv4(),
    name: 'Meena Kumari',
    nameHi: 'मीना कुमारी',
    phone: '6543210987',
    district: 'Patna',
    state: 'Bihar',
    address: '234 Primary Health Center, Patna',
    addressHi: '234 प्राथमिक स्वास्थ्य केंद्र, पटना',
    specialization: 'Newborn Care',
    specializationHi: 'नवजात शिशु देखभाल',
    experience: 4,
    languages: ['Hindi', 'Bhojpuri', 'English']
  },
  {
    id: uuidv4(),
    name: 'Anita Gupta',
    nameHi: 'अनीता गुप्ता',
    phone: '5432109876',
    district: 'Delhi',
    state: 'Delhi',
    address: '567 Urban Health Center, Delhi',
    addressHi: '567 शहरी स्वास्थ्य केंद्र, दिल्ली',
    specialization: 'Adolescent Health',
    specializationHi: 'किशोर स्वास्थ्य',
    experience: 7,
    languages: ['Hindi', 'English', 'Punjabi']
  }
];

// Get ASHA workers by location (district and state)
export const getAshaWorkersByLocation = async (district?: string, state?: string): Promise<AshaWorker[]> => {
  let filteredWorkers = [...ashaWorkers];
  
  if (district) {
    filteredWorkers = filteredWorkers.filter(worker => 
      worker.district.toLowerCase().includes(district.toLowerCase())
    );
  }
  
  if (state) {
    filteredWorkers = filteredWorkers.filter(worker => 
      worker.state.toLowerCase().includes(state.toLowerCase())
    );
  }
  
  return filteredWorkers;
};

// Get ASHA worker by ID
export const getAshaWorkerById = async (id: string): Promise<AshaWorker | null> => {
  const ashaWorker = ashaWorkers.find(worker => worker.id === id);
  return ashaWorker || null;
};

// Get all ASHA workers
export const getAllAshaWorkers = async (): Promise<AshaWorker[]> => {
  return ashaWorkers;
};
