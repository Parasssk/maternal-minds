
import { v4 as uuidv4 } from 'uuid';
import { Registration } from '../models/Registration';

// Mock database - in a real app, this would be a database connection
let registrations: Registration[] = [];

// Save a new registration
export const saveRegistration = async (data: Omit<Registration, 'id' | 'createdAt'>): Promise<Registration> => {
  const newRegistration: Registration = {
    id: uuidv4(),
    ...data,
    createdAt: new Date()
  };
  
  registrations.push(newRegistration);
  return newRegistration;
};

// Get registration by ID
export const getRegistrationById = async (id: string): Promise<Registration | null> => {
  const registration = registrations.find(reg => reg.id === id);
  return registration || null;
};

// Get all registrations
export const getAllRegistrations = async (): Promise<Registration[]> => {
  return registrations;
};
