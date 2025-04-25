
import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    
    const data = await response.json();
    
    // Transform the API data to match our Doctor interface
    return data.map((item: any) => ({
      id: item.id || '',
      name: item.name || '',
      specialities: item.specialities || [],
      experience: parseInt(item.experience) || 0,
      consultationType: 
        (item.video_consult && item.in_clinic) ? 'both' :
        item.video_consult ? 'video' :
        item.in_clinic ? 'in-clinic' : 'both',
      fees: parseInt(item.fees?.replace('₹', '').trim()) || 0,
      clinicName: item.clinic?.name || '',
      location: item.clinic?.address?.locality || '',
      profilePhoto: item.photo || '',
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}
