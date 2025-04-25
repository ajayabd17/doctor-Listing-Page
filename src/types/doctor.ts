
export interface Specialty {
  name: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialities: (Specialty | string)[];
  experience: number;
  consultationType: 'video' | 'in-clinic' | 'both';
  fees: number;
  clinicName: string;
  location: string;
  profilePhoto: string;
}
