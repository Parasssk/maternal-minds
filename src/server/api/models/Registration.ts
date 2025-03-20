
export interface Registration {
  id: string;
  name: string;
  age: string;
  phone: string;
  email?: string;
  address: string;
  district: string;
  state: string;
  conceiveDate: Date;
  additionalInfo?: string;
  preferredLanguage: string;
  createdAt: Date;
}
