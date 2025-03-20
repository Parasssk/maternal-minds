
import { v4 as uuidv4 } from 'uuid';
import { HealthScheme } from '../models/HealthScheme';

// Mock database with health schemes
const healthSchemes: HealthScheme[] = [
  {
    id: uuidv4(),
    name: 'Janani Suraksha Yojana (JSY)',
    nameHi: 'जननी सुरक्षा योजना (JSY)',
    description: 'A safe motherhood intervention under the National Health Mission to reduce maternal and neonatal mortality by promoting institutional delivery among poor pregnant women.',
    descriptionHi: 'राष्ट्रीय स्वास्थ्य मिशन के तहत एक सुरक्षित मातृत्व हस्तक्षेप, जो गरीब गर्भवती महिलाओं के बीच संस्थागत प्रसव को बढ़ावा देकर मातृ और नवजात मृत्यु दर को कम करता है।',
    eligibility: 'All pregnant women in Low Performing States with special focus on women from BPL families, SC, and ST.',
    eligibilityHi: 'कम प्रदर्शन करने वाले राज्यों में सभी गर्भवती महिलाएँ, विशेष रूप से BPL परिवारों, SC, और ST की महिलाओं पर ध्यान केंद्रित है।',
    benefits: 'Cash assistance for institutional delivery and incentives for ASHA workers.',
    benefitsHi: 'संस्थागत प्रसव के लिए नकद सहायता और आशा कार्यकर्ताओं के लिए प्रोत्साहन।',
    category: 'maternal',
    website: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309'
  },
  {
    id: uuidv4(),
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nameHi: 'प्रधान मंत्री मातृ वंदना योजना (PMMVY)',
    description: 'A maternity benefit program that provides partial wage compensation to women to enable them to take rest after delivery.',
    descriptionHi: 'एक मातृत्व लाभ कार्यक्रम जो महिलाओं को प्रसव के बाद आराम करने के लिए आंशिक वेतन मुआवजा प्रदान करता है।',
    eligibility: 'All pregnant and lactating women, excluding those who are in regular employment with the Central Government or State Government or Public Sector Undertaking.',
    eligibilityHi: 'सभी गर्भवती और स्तनपान कराने वाली महिलाएँ, उन्हें छोड़कर जो केंद्र सरकार या राज्य सरकार या सार्वजनिक क्षेत्र के उपक्रम के साथ नियमित रोजगार में हैं।',
    benefits: 'Cash benefit of Rs. 5,000 in three installments.',
    benefitsHi: 'तीन किस्तों में 5,000 रुपये का नकद लाभ।',
    category: 'maternal',
    website: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana'
  },
  {
    id: uuidv4(),
    name: 'Mission Indradhanush',
    nameHi: 'मिशन इंद्रधनुष',
    description: 'A health mission to increase immunization coverage for children and pregnant women who missed routine vaccination.',
    descriptionHi: 'बच्चों और गर्भवती महिलाओं के लिए टीकाकरण कवरेज बढ़ाने के लिए एक स्वास्थ्य मिशन जिन्होंने नियमित टीकाकरण याद किया।',
    eligibility: 'Children under 2 years of age and pregnant women who have missed regular vaccines.',
    eligibilityHi: '2 वर्ष से कम उम्र के बच्चे और गर्भवती महिलाएँ जिन्होंने नियमित टीके याद किए हैं।',
    benefits: 'Free vaccination against 12 preventable diseases.',
    benefitsHi: '12 रोकथाम योग्य बीमारियों के खिलाफ मुफ्त टीकाकरण।',
    category: 'child',
    website: 'https://www.nhp.gov.in/mission-indradhanush1_pg'
  },
  {
    id: uuidv4(),
    name: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
    nameHi: 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK)',
    description: 'Child Health Screening and Early Intervention Services program to identify defects at birth, diseases, deficiencies, and developmental delays.',
    descriptionHi: 'जन्म के समय दोष, बीमारी, कमियों, और विकासात्मक देरी की पहचान करने के लिए बाल स्वास्थ्य स्क्रीनिंग और प्रारंभिक हस्तक्षेप सेवा कार्यक्रम।',
    eligibility: 'All children from birth to 18 years.',
    eligibilityHi: 'जन्म से 18 वर्ष तक के सभी बच्चे।',
    benefits: 'Free health screening, early detection, and free management of conditions.',
    benefitsHi: 'मुफ्त स्वास्थ्य स्क्रीनिंग, प्रारंभिक पहचान, और स्थितियों का मुफ्त प्रबंधन।',
    category: 'child',
    website: 'https://nhm.gov.in/index1.php?lang=1&level=4&sublinkid=1190&lid=583'
  },
  {
    id: uuidv4(),
    name: 'Rashtriya Kishor Swasthya Karyakram (RKSK)',
    nameHi: 'राष्ट्रीय किशोर स्वास्थ्य कार्यक्रम (RKSK)',
    description: 'A health program for adolescents focusing on nutrition, reproductive health, substance abuse, mental health, and non-communicable diseases.',
    descriptionHi: 'किशोरों के लिए एक स्वास्थ्य कार्यक्रम जो पोषण, प्रजनन स्वास्थ्य, पदार्थ दुरुपयोग, मानसिक स्वास्थ्य, और गैर-संचारी रोगों पर केंद्रित है।',
    eligibility: 'Adolescents aged 10-19 years.',
    eligibilityHi: '10-19 वर्ष की आयु के किशोर।',
    benefits: 'Counseling, health services, and information on adolescent health issues.',
    benefitsHi: 'परामर्श, स्वास्थ्य सेवाएँ, और किशोर स्वास्थ्य मुद्दों पर जानकारी।',
    category: 'adolescent',
    website: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1023&lid=388'
  }
];

// Get all health schemes
export const getAllHealthSchemes = async (): Promise<HealthScheme[]> => {
  return healthSchemes;
};

// Get health schemes by category
export const getHealthSchemesByCategory = async (category: string): Promise<HealthScheme[]> => {
  return healthSchemes.filter(scheme => scheme.category === category);
};

// Get health scheme by ID
export const getHealthSchemeById = async (id: string): Promise<HealthScheme | null> => {
  const healthScheme = healthSchemes.find(scheme => scheme.id === id);
  return healthScheme || null;
};
