
export interface Doctor {
  id: string;
  name: string;
  specialities: string[];
  experience: number;
  consultationType: 'video' | 'in-clinic' | 'both';
  fees: number;
  clinicName: string;
  location: string;
  profilePhoto: string;
}
