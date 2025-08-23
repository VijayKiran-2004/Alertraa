
export interface Reading {
  date: string;
  value: number;
  type: string;
  yesterdayValue?: number;
  pastDaysValue?: number;
}

export interface Vital {
  heartRate: string;
  bloodPressure: string;
  bloodOxygen: string;
  pastReadings: Reading[];
  recommendations: Record<string, string>;
}

export interface DailyActivity {
  steps: string;
  sleepHours: string;
  caloriesBurnt: string;
  distanceWalked: string;
  pastReadings: Reading[];
  recommendations: Record<string, string>;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface HealthHistory {
  date: string;
  summary: string;
}

export interface Emergency {
  date: string;
  summary: string;
  severity: 'critical' | 'major' | 'minor';
}

export interface HealthCondition {
  name: string;
  since: string;
  status: string;
  medication: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  condition: string;
}

export interface Prescription {
    name: string;
    date: string;
    doctor: string;
    file: string;
}

export interface Allergy {
  name: string;
  reaction: string;
  precaution: string;
}

export interface UserDetails {
  username: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  healthConditions: HealthCondition[];
  medications: Medication[];
  prescriptions: Prescription[];
  allergies: Allergy[];
  insurance: string[];
  recentHospitals: string[];
  hospitalContacts: string[];
  guardianContacts: string[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  instructions: string;
  prioritized: boolean;
}

export interface AllContact {
    name: string;
    relationship: string;
    phone: string;
}

export interface Medicine {
    id: number;
    name: string;
    price: string;
    description: string;
    frequentlyBought: boolean;
}

export interface CartItem extends Medicine {
    quantity: number;
}

export interface ECommerce {
    medicines: Medicine[];
}

export interface Notification {
  title: string;
  description: string;
  severity: 'critical' | 'important' | 'normal';
}

export interface NotificationSetting {
    name: string;
    description: string;
    severity: 'critical' | 'important' | 'normal';
    enabled: boolean;
}

export interface DeviceSetting {
    name: string;
    status: 'Connected' | 'Disconnected';
    lastSync: string;
}

export interface GestureSetting {
    gesture: string;
    action: string;
}

export interface SettingsContent {
    'Notifications': { title: string; content: NotificationSetting[] };
    'Connected Devices': { title: string; content: DeviceSetting[] };
    'Gesture Configuration': { title: string; content: GestureSetting[] };
    'Default Partners/Guardians': { title: string; assigned: string[]; others: string[] };
    'Accessibility': { title: string; content: { darkMode: boolean } };
    'Help Center': string;
    'About Us': string;
}

export interface EmergencyDetails {
    vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
    activity: { steps: string; sleepHours: string; caloriesBurnt: string; distanceWalked: string };
}

export interface HealthHistoryDetails {
    date: string;
    description: string;
    type: string;
    condition: string;
    medication: string;
    duration?: string;
}

export interface Appointment {
    date: string;
    time: string;
    summary: string;
}

export interface AppointmentsData {
    tokens: number;
    pastVisits: Appointment[];
    upcomingBookings: Appointment[];
}

export interface MockData {
  vitals: Vital;
  dailyActivity: DailyActivity;
  location: Location;
  healthHistory: HealthHistory[];
  emergencies: Emergency[];
  userDetails: UserDetails;
  emergencyContacts: EmergencyContact[];
  allContacts: AllContact[];
  eCommerce: ECommerce;
  notifications: Notification[];
  settingsContent: SettingsContent;
  emergencyDetails: Record<string, EmergencyDetails>;
  healthHistoryDetails: HealthHistoryDetails[];
  appointments: AppointmentsData;
}
