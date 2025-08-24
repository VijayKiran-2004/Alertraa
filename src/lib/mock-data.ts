import type { MockData } from '@/types';

export const mockData: MockData = {
  vitals: {
    heartRate: '72 bpm',
    bloodPressure: '120/80 mmHg',
    bloodOxygen: '98%',
    pastReadings: [
      { date: '7AM', value: 72, yesterdayValue: 78, pastDaysValue: 65, type: 'Heart Rate' },
      { date: '8AM', value: 70, yesterdayValue: 75, pastDaysValue: 68, type: 'Heart Rate' },
      { date: '9AM', value: 75, yesterdayValue: 80, pastDaysValue: 70, type: 'Heart Rate' },
      { date: '10AM', value: 78, yesterdayValue: 82, pastDaysValue: 72, type: 'Heart Rate' },
      { date: '11AM', value: 73, yesterdayValue: 77, pastDaysValue: 75, type: 'Heart Rate' },
      { date: '12PM', value: 80, yesterdayValue: 85, pastDaysValue: 78, type: 'Heart Rate' },
      { date: '1PM', value: 74, yesterdayValue: 79, pastDaysValue: 80, type: 'Heart Rate' },
      { date: '2PM', value: 88, yesterdayValue: 92, pastDaysValue: 85, type: 'Heart Rate' },
      { date: '3PM', value: 82, yesterdayValue: 87, pastDaysValue: 88, type: 'Heart Rate' },
      { date: '4PM', value: 78, yesterdayValue: 83, pastDaysValue: 82, type: 'Heart Rate' },
      { date: '5PM', value: 76, yesterdayValue: 80, pastDaysValue: 79, type: 'Heart Rate' },
      { date: '6PM', value: 74, yesterdayValue: 78, pastDaysValue: 77, type: 'Heart Rate' },
      { date: '7AM', value: 120, yesterdayValue: 122, pastDaysValue: 118, type: 'Blood Pressure' },
      { date: '8AM', value: 118, yesterdayValue: 121, pastDaysValue: 119, type: 'Blood Pressure' },
      { date: '9AM', value: 122, yesterdayValue: 124, pastDaysValue: 120, type: 'Blood Pressure' },
      { date: '10AM', value: 125, yesterdayValue: 123, pastDaysValue: 121, type: 'Blood Pressure' },
      { date: '11AM', value: 121, yesterdayValue: 125, pastDaysValue: 122, type: 'Blood Pressure' },
      { date: '12PM', value: 128, yesterdayValue: 126, pastDaysValue: 124, type: 'Blood Pressure' },
      { date: '1PM', value: 123, yesterdayValue: 127, pastDaysValue: 125, type: 'Blood Pressure' },
      { date: '2PM', value: 130, yesterdayValue: 128, pastDaysValue: 126, type: 'Blood Pressure' },
      { date: '3PM', value: 126, yesterdayValue: 129, pastDaysValue: 127, type: 'Blood Pressure' },
      { date: '4PM', value: 124, yesterdayValue: 125, pastDaysValue: 123, type: 'Blood Pressure' },
      { date: '5PM', value: 122, yesterdayValue: 124, pastDaysValue: 121, type: 'Blood Pressure' },
      { date: '6PM', value: 120, yesterdayValue: 122, pastDaysValue: 120, type: 'Blood Pressure' },
      { date: '7AM', value: 98, yesterdayValue: 97, pastDaysValue: 99, type: 'Blood Oxygen' },
      { date: '8AM', value: 99, yesterdayValue: 98, pastDaysValue: 97, type: 'Blood Oxygen' },
      { date: '9AM', value: 97, yesterdayValue: 96, pastDaysValue: 98, type: 'Blood Oxygen' },
      { date: '10AM', value: 98, yesterdayValue: 97, pastDaysValue: 99, type: 'Blood Oxygen' },
      { date: '11AM', value: 99, yesterdayValue: 98, pastDaysValue: 97, type: 'Blood Oxygen' },
      { date: '12PM', value: 97, yesterdayValue: 99, pastDaysValue: 96, type: 'Blood Oxygen' },
      { date: '1PM', value: 98, yesterdayValue: 97, pastDaysValue: 98, type: 'Blood Oxygen' },
      { date: '2PM', value: 96, yesterdayValue: 98, pastDaysValue: 97, type: 'Blood Oxygen' },
      { date: '3PM', value: 97, yesterdayValue: 96, pastDaysValue: 98, type: 'Blood Oxygen' },
      { date: '4PM', value: 98, yesterdayValue: 97, pastDaysValue: 99, type: 'Blood Oxygen' },
      { date: '5PM', value: 99, yesterdayValue: 98, pastDaysValue: 97, type: 'Blood Oxygen' },
      { date: '6PM', value: 98, yesterdayValue: 97, pastDaysValue: 98, type: 'Blood Oxygen' },
    ],
    recommendations: {
      'Heart Rate': 'Maintain a balanced diet rich in fruits, vegetables, and whole grains to support cardiovascular health.',
      'Blood Pressure': 'Reduce sodium intake by avoiding processed foods and incorporate potassium-rich foods like bananas, spinach, and sweet potatoes.',
      'Blood Oxygen': 'Ensure adequate ventilation in your living spaces and practice deep breathing exercises to improve lung capacity and oxygen intake.',
    },
  },
  dailyActivity: {
    steps: '8,500 steps',
    sleepHours: '7.5 hrs',
    caloriesBurnt: '500 kcal',
    distanceWalked: '4.2 km',
    pastReadings: [
      { date: 'Mon', value: 8500, yesterdayValue: 9200, pastDaysValue: 6500, type: 'Steps' },
      { date: 'Tue', value: 9200, yesterdayValue: 6500, pastDaysValue: 10100, type: 'Steps' },
      { date: 'Wed', value: 6500, yesterdayValue: 10100, pastDaysValue: 7800, type: 'Steps' },
      { date: 'Thu', value: 10100, yesterdayValue: 7800, pastDaysValue: 8900, type: 'Steps' },
      { date: 'Fri', value: 7800, yesterdayValue: 8900, pastDaysValue: 11000, type: 'Steps' },
      { date: 'Sat', value: 8900, yesterdayValue: 11000, pastDaysValue: 8500, type: 'Steps' },
      { date: 'Sun', value: 11000, yesterdayValue: 8500, pastDaysValue: 9200, type: 'Steps' },
      { date: 'Mon', value: 7.5, yesterdayValue: 8.1, pastDaysValue: 6.9, type: 'Sleep Hours' },
      { date: 'Tue', value: 8.1, yesterdayValue: 6.9, pastDaysValue: 7.8, type: 'Sleep Hours' },
      { date: 'Wed', value: 6.9, yesterdayValue: 7.8, pastDaysValue: 6.5, type: 'Sleep Hours' },
      { date: 'Thu', value: 7.8, yesterdayValue: 6.5, pastDaysValue: 8.2, type: 'Sleep Hours' },
      { date: 'Fri', value: 6.5, yesterdayValue: 8.2, pastDaysValue: 7.1, type: 'Sleep Hours' },
      { date: 'Sat', value: 8.2, yesterdayValue: 7.1, pastDaysValue: 7.5, type: 'Sleep Hours' },
      { date: 'Sun', value: 7.1, yesterdayValue: 7.5, pastDaysValue: 8.1, type: 'Sleep Hours' },
      { date: 'Mon', value: 500, yesterdayValue: 550, pastDaysValue: 400, type: 'Calories Burnt' },
      { date: 'Tue', value: 550, yesterdayValue: 400, pastDaysValue: 600, type: 'Calories Burnt' },
      { date: 'Wed', value: 400, yesterdayValue: 600, pastDaysValue: 450, type: 'Calories Burnt' },
      { date: 'Thu', value: 600, yesterdayValue: 450, pastDaysValue: 520, type: 'Calories Burnt' },
      { date: 'Fri', value: 450, yesterdayValue: 520, pastDaysValue: 650, type: 'Calories Burnt' },
      { date: 'Sat', value: 520, yesterdayValue: 650, pastDaysValue: 500, type: 'Calories Burnt' },
      { date: 'Sun', value: 650, yesterdayValue: 500, pastDaysValue: 550, type: 'Calories Burnt' },
      { date: 'Mon', value: 4.2, yesterdayValue: 4.8, pastDaysValue: 3.5, type: 'Distance Walked' },
      { date: 'Tue', value: 4.8, yesterdayValue: 3.5, pastDaysValue: 5.1, type: 'Distance Walked' },
      { date: 'Wed', value: 3.5, yesterdayValue: 5.1, pastDaysValue: 4.0, type: 'Distance Walked' },
      { date: 'Thu', value: 5.1, yesterdayValue: 4.0, pastDaysValue: 4.5, type: 'Distance Walked' },
      { date: 'Fri', value: 4.0, yesterdayValue: 4.5, pastDaysValue: 5.5, type: 'Distance Walked' },
      { date: 'Sat', value: 4.5, yesterdayValue: 5.5, pastDaysValue: 4.2, type: 'Distance Walked' },
      { date: 'Sun', value: 5.5, yesterdayValue: 4.2, pastDaysValue: 4.8, type: 'Distance Walked' },
    ],
    recommendations: {
      'Steps': 'Aim for at least 10,000 steps daily. Consider adding a short walk after dinner to aid digestion and reach your goal.',
      'Sleep Hours': 'Establish a consistent sleep schedule and create a relaxing bedtime routine for better sleep quality. Avoid screens before bed.',
      'Calories Burnt': 'To increase calorie burn, incorporate high-intensity interval training (HIIT) into your routine 2-3 times a week.',
      'Distance Walked': 'Try a new scenic walking route or include some inclines to stay motivated and challenge your muscles.',
    },
    sleepDetails: {
      performance: 80,
      hoursVsNeeded: { actual: 6, needed: 8 },
      consistency: 45,
      efficiency: 95,
      highStress: 0,
      weeklyPerformance: [
        { day: 'Monday', 'Normal Sleep': 98, 'Average Sleep': 78, 'Deep Sleep': 58 },
        { day: 'Tuesday', 'Normal Sleep': 98, 'Average Sleep': 58, 'Deep Sleep': 38 },
        { day: 'Wednesday', 'Normal Sleep': 98, 'Average Sleep': 58, 'Deep Sleep': 78 },
        { day: 'Thursday', 'Normal Sleep': 98, 'Average Sleep': 98, 'Deep Sleep': 68 },
        { day: 'Friday', 'Normal Sleep': 98, 'Average Sleep': 38, 'Deep Sleep': 18 },
        { day: 'Saturday', 'Normal Sleep': 98, 'Average Sleep': 78, 'Deep Sleep': 38 },
      ],
    },
  },
  location: {
    latitude: 34.052235,
    longitude: -118.243683,
    address: '123 Main Street, Los Angeles, CA',
  },
  healthHistory: [
    { date: '2023-10-25', summary: 'Check-up at County Hospital.' },
    { date: '2023-08-15', summary: 'Annual physical exam.' },
  ],
  emergencies: [
    { date: '2023-11-01', summary: 'Fall detected at 10:30 AM.', severity: 'critical' },
    { date: '2023-09-15', summary: 'Abnormal heart rate alert.', severity: 'major' },
    { date: '2023-07-20', summary: 'Dehydration warning.', severity: 'minor' },
    { date: '2023-05-10', summary: 'High blood sugar alert.', severity: 'major' },
    { date: '2023-03-01', summary: 'Unusual sleep pattern detected.', severity: 'minor' },
  ],
  userDetails: {
    username: 'Jane Doe',
    age: 45,
    gender: 'Female',
    height: "5'6''",
    weight: '145 lbs',
    healthConditions: [
      { name: 'Hypertension', since: '2018', status: 'Managed with medication', medication: 'Lisinopril' },
      { name: 'Type 2 Diabetes', since: '2020', status: 'Controlled with diet and exercise', medication: 'Metformin' },
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', duration: 'Ongoing', condition: 'Hypertension' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: 'Ongoing', condition: 'Type 2 Diabetes' },
    ],
    prescriptions: [
      { 
        id: 1, 
        name: 'Lisinopril 10mg', 
        date: '2023-10-25', 
        doctor: 'Dr. Smith', 
        doctorDetails: {
          name: 'Dr. Evelyn Smith',
          clinic: 'City Central Health Clinic',
          address: '456 Health Ave, Meditown',
          phone: '(555) 123-4567',
          license: 'MD-12345'
        },
        file: 'lisinopril_rx.pdf', 
        price: '12.50', 
        description: 'For hypertension management.', 
        frequentlyBought: true 
      },
      { 
        id: 2, 
        name: 'Metformin 500mg', 
        date: '2022-03-20', 
        doctor: 'Dr. Jones',
        doctorDetails: {
          name: 'Dr. Robert Jones',
          clinic: 'Community Medical Group',
          address: '789 Wellness Blvd, Healthville',
          phone: '(555) 987-6543',
          license: 'MD-54321'
        },
        file: 'metformin_rx.pdf', 
        price: '15.75', 
        description: 'For Type 2 Diabetes.', 
        frequentlyBought: true 
      },
    ],
    allergies: [
      { name: 'Penicillin', reaction: 'Hives, swelling', precaution: 'Avoid all penicillin-based antibiotics.' },
      { name: 'Dust mites', reaction: 'Sneezing, runny nose', precaution: 'Use allergen-proof bed covers and frequent cleaning.' },
    ],
    insurance: ['SBI Health Insurance', 'LIC Life Insurance'],
    recentHospitals: ['St. Jude Medical Center'],
    hospitalContacts: ['Dr. Smith - (555) 123-4567'],
    guardianContacts: ['John Doe - (555) 987-6543', 'Mary Jane - (555) 111-2222', 'Peter Parker - (555) 333-4444'],
  },
  emergencyContacts: [
    { name: 'John Doe', relationship: 'Husband', phone: '(555) 987-6543', instructions: 'Call first.', prioritized: true },
    { name: 'Jane Smith', relationship: 'Daughter', phone: '(555) 555-1212', instructions: 'Call if no answer from John.', prioritized: false },
  ],
  allContacts: [
    { name: 'John Doe', relationship: 'Husband', phone: '(555) 987-6543' },
    { name: 'Jane Smith', relationship: 'Daughter', phone: '(555) 555-1212' },
    { name: 'Peter Parker', relationship: 'Friend', phone: '(555) 333-4444' },
    { name: 'Bruce Wayne', relationship: 'Legal Counsel', phone: '(555) 888-9999' },
    { name: 'Clark Kent', relationship: 'Family Doctor', phone: '(555) 777-6666' },
  ],
  eCommerce: {
    medicines: [
      { id: 1, name: 'Lisinopril 10mg', price: '12.50', description: 'For hypertension management.', frequentlyBought: true },
      { id: 2, name: 'Metformin 500mg', price: '15.75', description: 'For Type 2 Diabetes.', frequentlyBought: true },
      { id: 3, name: 'Ibuprofen 200mg', price: '5.99', description: 'Pain relief and anti-inflammatory.', frequentlyBought: false },
      { id: 4, name: 'Vitamin D3 1000IU', price: '8.99', description: 'Supports bone health & immunity.', frequentlyBought: true },
      { id: 5, name: 'Melatonin 5mg', price: '9.50', description: 'Aids in sleep regulation.', frequentlyBought: false },
      { id: 6, name: 'Omeprazole 20mg', price: '11.20', description: 'For acid reflux and heartburn.', frequentlyBought: false },
      { id: 7, name: 'Aspirin 81mg', price: '4.75', description: 'Low-dose for heart health.', frequentlyBought: true },
      { id: 8, name: 'Cetirizine 10mg', price: '7.99', description: '24-hour allergy relief.', frequentlyBought: false },
      { id: 9, name: 'Multivitamin Gummies', price: '14.99', description: 'Complete daily vitamins for adults.', frequentlyBought: false },
      { id: 10, name: 'Fish Oil 1200mg', price: '18.50', description: 'Omega-3 for heart and brain health.', frequentlyBought: true },
      { id: 11, name: 'Calcium + Magnesium', price: '13.25', description: 'For strong bones and muscle function.', frequentlyBought: false },
      { id: 12, name: 'Probiotic Blend', price: '22.00', description: 'Supports digestive health.', frequentlyBought: false },
    ],
  },
  notifications: [
    { title: 'Critical Alert: Heart Rate', description: 'Your heart rate is unusually high. Please rest.', severity: 'critical' },
    { title: 'Medication Reminder', description: 'Time to take your Lisinopril.', severity: 'important' },
    { title: 'Appointment Reminder', description: 'You have a check-up tomorrow at 10 AM.', severity: 'important' },
    { title: 'Weekly Summary', description: 'Your health summary for the week is ready.', severity: 'normal' },
  ],
  settingsContent: {
    'Notifications': {
      title: 'Notifications',
      content: [
        { name: 'Alert Notifications', description: 'Urgent alerts for critical vital signs or emergencies.', severity: 'critical', enabled: true },
        { name: 'Medicine Notifications', description: 'Reminders for taking your medications.', severity: 'important', enabled: true },
        { name: 'Diet Notifications', description: 'Reminders for diet and meal plans.', severity: 'normal', enabled: false },
        { name: 'Normal Notifications', description: 'General app updates and news.', severity: 'normal', enabled: true },
      ],
    },
    'Connected Devices': {
      title: 'Connected Devices',
      content: [
        { name: 'Smartwatch', status: 'Connected', lastSync: '10 mins ago' },
        { name: 'Smart Scale', status: 'Disconnected', lastSync: '2 days ago' },
        { name: 'Blood Pressure Monitor', status: 'Connected', lastSync: '2 hours ago' },
        { name: 'Bluetooth Headphones', status: 'Connected', lastSync: '5 mins ago' },
      ]
    },
    'Gesture Configuration': {
      title: 'Gesture Configuration',
      content: [
        { gesture: 'Single Swipe Down', action: 'Snooze Notifications' },
        { gesture: 'Single Swipe Up', action: 'Dismiss Notifications' },
        { gesture: 'Swipe Down & Up', action: 'Launch Quick Access Menu' },
        { gesture: 'Swipe Up & Down', action: 'Silence All Alarms' },
      ],
    },
    'Default Partners/Guardians': {
      title: 'Default Partners/Guardians',
      assigned: ['John Doe - (555) 987-6543', 'Mary Jane - (555) 111-2222'],
      others: ['Peter Parker - (555) 333-4444', 'Bruce Wayne - (555) 888-9999', 'Clark Kent - (555) 777-6666'],
    },
    'Accessibility': {
      title: 'Accessibility',
      content: {
        darkMode: true,
      },
    },
    'Help Center': 'Browse frequently asked questions or contact our support team for assistance.',
    'About Us': 'Learn more about the app, our mission, and the team behind its development.',
  },
  emergencyDetails: {
    '2023-11-01': {
      vitals: { heartRate: '110 bpm', bloodPressure: '140/95 mmHg', bloodOxygen: '91%' },
      activity: { steps: '200 steps', sleepHours: '6.0 hrs', caloriesBurnt: '150 kcal', distanceWalked: '0.1 km' },
    },
    '2023-09-15': {
      vitals: { heartRate: '130 bpm', bloodPressure: '125/85 mmHg', bloodOxygen: '96%' },
      activity: { steps: '8,100 steps', sleepHours: '7.8 hrs', caloriesBurnt: '520 kcal', distanceWalked: '4.0 km' },
    },
    '2023-07-20': {
      vitals: { heartRate: '90 bpm', bloodPressure: '110/70 mmHg', bloodOxygen: '93%' },
      activity: { steps: '5,000 steps', sleepHours: '6.5 hrs', caloriesBurnt: '300 kcal', distanceWalked: '2.5 km' },
    },
    '2023-05-10': {
      vitals: { heartRate: '85 bpm', bloodPressure: '120/80 mmHg', bloodOxygen: '98%' },
      activity: { steps: '7,000 steps', sleepHours: '7.0 hrs', caloriesBurnt: '450 kcal', distanceWalked: '3.5 km' },
    },
    '2023-03-01': {
      vitals: { heartRate: '75 bpm', bloodPressure: '115/75 mmHg', bloodOxygen: '97%' },
      activity: { steps: '6,000 steps', sleepHours: '5.5 hrs', caloriesBurnt: '350 kcal', distanceWalked: '3.0 km' },
    },
  },
  healthHistoryDetails: [
    { date: '2023-10-25', description: 'Annual check-up with Dr. Smith at St. Jude Medical Center. Vitals were stable. Discussed a new diet plan.', type: 'Hospital Visit', condition: 'General Health', medication: 'N/A' },
    { date: '2023-08-15', description: 'Routine follow-up for hypertension. Medication dosage confirmed. No new health concerns.', type: 'Doctor Appointment', condition: 'Hypertension', medication: 'Lisinopril', duration: 'Ongoing' },
    { date: '2023-05-10', description: 'Physical therapy session. Completed all exercises as prescribed. Showed significant improvement in mobility.', type: 'Physical Therapy', condition: 'Injury Recovery', medication: 'Ibuprofen (as needed)', duration: '2 months' },
    { date: '2022-03-20', description: 'Initial diagnosis of Type 2 Diabetes. Started on Metformin.', type: 'Doctor Appointment', condition: 'Type 2 Diabetes', medication: 'Metformin', duration: 'Ongoing' },
  ],
  appointments: {
    tokens: 3,
    pastVisits: [
      { 
        date: '2023-10-25', 
        time: '11:00 AM', 
        summary: 'Annual check-up by nurse Lisa.',
        details: {
          notes: 'Patient is in good overall health. Discussed importance of maintaining a balanced diet and regular exercise. No new prescriptions. Advised to continue with current medication plan.',
          prescriptions: [],
          vitals: { heartRate: '70 bpm', bloodPressure: '118/78 mmHg' }
        }
      },
      { 
        date: '2023-07-12', 
        time: '02:30 PM', 
        summary: 'Blood pressure check-up by nurse Mike.',
        details: {
          notes: 'Blood pressure is slightly elevated. Patient reports stress at work. Recommended stress management techniques and a follow-up in 3 months. Prescribed a low-dose of Amlodipine.',
          prescriptions: [
             {
              id: 13, 
              name: 'Amlodipine 5mg', 
              date: '2023-07-12', 
              doctor: 'Dr. Mike', 
              doctorDetails: {
                name: 'Dr. Mike Ross',
                clinic: 'Community Medical Group',
                address: '789 Wellness Blvd, Healthville',
                phone: '(555) 987-6543',
                license: 'MD-54322'
              },
              file: 'amlodipine_rx.pdf', 
              price: '10.00', 
              description: 'For high blood pressure.', 
              frequentlyBought: false
            }
          ],
          vitals: { heartRate: '78 bpm', bloodPressure: '135/85 mmHg' }
        }
      },
    ],
    upcomingBookings: [
      { date: '2023-11-20', time: '10:00 AM', summary: 'General health check with nurse Jane.' },
    ],
  },
  quotes: [
    { text: 'The greatest wealth is health.', author: 'Virgil' },
    { text: 'A healthy outside starts from the inside.', author: 'Robert Urich' },
    { text: 'To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.', author: 'Buddha' },
    { text: 'Let food be thy medicine and medicine be thy food.', author: 'Hippocrates' },
    { text: 'Take care of your body. It’s the only place you have to live.', author: 'Jim Rohn' },
  ],
};
