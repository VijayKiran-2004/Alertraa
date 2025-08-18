'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { notifyEmergencyContacts } from '@/ai/flows/emergency-contact-notification';
import { mockData } from '@/lib/mock-data';
import type {
  Emergency,
  EmergencyDetails,
  HealthHistoryDetails,
  UserDetails,
  Vital,
  DailyActivity,
  EmergencyContact,
  AllContact,
  Appointment,
  Medicine,
  Prescription,
  SettingsContent,
  CartItem,
} from '@/types';

import Header from '@/components/header';
import Navbar from '@/components/navbar';
import HomePage from '@/components/home-page';
import AppointmentsPage from '@/components/appointments-page';
import ProfilePage from '@/components/profile-page';
import MedicinePage from '@/components/medicine-page';

import SosModal from '@/components/sos-modal';
import MetricDetailsModal from '@/components/metric-details-modal';
import EmergencyDetailsModal from '@/components/emergency-details-modal';
import EnlargedMapModal from '@/components/enlarged-map-modal';
import HealthHistoryModal from '@/components/health-history-modal';
import AddInfoModal from '@/components/add-info-modal';
import SettingsModal from '@/components/settings-modal';
import BurgerMenu from '@/components/burger-menu';
import ChatbotModal from '@/components/chatbot-modal';
import BookingModal from '@/components/booking-modal';
import CartModal from '@/components/cart-modal';
import CheckoutPage from '@/components/checkout-page';
import PaymentConfirmationModal from '@/components/payment-confirmation-modal';
import NotificationPopover from '@/components/notification-popover';

type Page = 'Home' | 'Appointments' | 'User' | 'Medicine';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [showSosModal, setShowSosModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isMapEnlarged, setIsMapEnlarged] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [showHealthHistory, setShowHealthHistory] = useState(false);
  const [vitals, setVitals] = useState(mockData.vitals);
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [healthStatus, setHealthStatus] = useState('normal');
  const [isClient, setIsClient] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);

  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([1, 2]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const checkVitalsStatus = (vitalsData: { heartRate: string, bloodPressure: string, bloodOxygen: string }) => {
    const hr = parseInt(vitalsData.heartRate.split(' ')[0], 10);
    const [systolic, diastolic] = vitalsData.bloodPressure.split('/').map(Number);
    const oxygen = parseInt(vitalsData.bloodOxygen.split('%')[0], 10);

    if (hr < 50 || hr > 110 || systolic > 140 || diastolic > 90 || oxygen < 90) {
      return 'critical';
    }
    if (hr < 60 || hr > 100 || systolic > 120 || diastolic > 80 || oxygen < 95) {
      return 'warning';
    }
    return 'normal';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newVitals = {
        ...mockData.vitals,
        heartRate: `${Math.floor(Math.random() * 80) + 50} bpm`, // 50-130
        bloodPressure: `${Math.floor(Math.random() * 60) + 90}/${Math.floor(Math.random() * 40) + 60} mmHg`, // 90-150 / 60-100
        bloodOxygen: `${Math.floor(Math.random() * 10) + 90}%`, // 90-99%
      };
      setVitals(newVitals);
      setHealthStatus(checkVitalsStatus(newVitals));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSosClick = () => setShowSosModal(true);
  
  const handleConfirmSos = async () => {
    try {
      const notificationInput = {
        emergencyContacts: mockData.emergencyContacts,
        userDetails: {
            username: mockData.userDetails.username,
            age: mockData.userDetails.age,
            gender: mockData.userDetails.gender,
            height: mockData.userDetails.height,
            weight: mockData.userDetails.weight,
        },
        currentVitals: {
            heartRate: vitals.heartRate,
            bloodPressure: vitals.bloodPressure,
            bloodOxygen: vitals.bloodOxygen,
        },
        location: mockData.location,
      };
      const notifications = await notifyEmergencyContacts(notificationInput);
      console.log('SOS Confirmed! Generated notifications:', notifications);
    } catch (error) {
      console.error('Failed to generate emergency notifications:', error);
    } finally {
      setShowSosModal(false);
    }
  };

  const handleCancelSos = () => setShowSosModal(false);

  // E-commerce handlers
  const handleAddToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (medicineId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== medicineId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === medicineId ? { ...item, quantity } : item))
      );
    }
  };

  const toggleWishlist = (medicineId: number) => {
    setWishlist((prev) =>
      prev.includes(medicineId) ? prev.filter((id) => id !== medicineId) : [...prev, medicineId]
    );
  };
  
  const handleProceedToCheckout = () => {
    setShowCartModal(false);
    setShowCheckoutPage(true);
  };

  const handleConfirmPayment = () => {
    setShowCheckoutPage(false);
    setShowPaymentConfirmation(true);
    setCart([]);
  };

  const handleClosePaymentConfirmation = () => {
    setShowPaymentConfirmation(false);
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderPage = () => {
    if (showCheckoutPage) {
      return <CheckoutPage cart={cart} onConfirmPayment={handleConfirmPayment} onBack={() => { setShowCheckoutPage(false); setShowCartModal(true); }} isDarkMode={isDarkMode} />;
    }
    switch (currentPage) {
      case 'Home':
        return (
          <HomePage
            onMetricClick={setSelectedMetric}
            onMapClick={() => setIsMapEnlarged(true)}
            vitals={vitals}
            onEmergencyClick={setSelectedEmergency}
            isDarkMode={isDarkMode}
          />
        );
      case 'Appointments':
        return <AppointmentsPage onBookVisit={() => setShowBookingModal(true)} isDarkMode={isDarkMode} />;
      case 'User':
        return <ProfilePage onShowHealthHistory={() => setShowHealthHistory(true)} onShowAddModal={setShowAddModal} onEmergencyClick={setSelectedEmergency} isDarkMode={isDarkMode} />;
      case 'Medicine':
        return <MedicinePage 
                  isDarkMode={isDarkMode} 
                  cartCount={cartItemCount}
                  onShowCart={() => setShowCartModal(true)}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  onAddToCart={handleAddToCart}
                />;
      default:
        return (
          <HomePage
            onMetricClick={setSelectedMetric}
            onMapClick={() => setIsMapEnlarged(true)}
            vitals={vitals}
            onEmergencyClick={setSelectedEmergency}
            isDarkMode={isDarkMode}
          />
        );
    }
  };

  const themeClasses = isDarkMode ? 'bg-[#2A343D] text-white' : 'bg-[#F1F5F9] text-slate-900';

  return (
    <div className={`flex flex-col h-screen ${themeClasses} transition-colors duration-300`}>
      <Header 
        onMenuClick={() => setShowBurgerMenu(true)} 
        isDarkMode={isDarkMode} 
        healthStatus={healthStatus}
        cartCount={cartItemCount}
        onCartClick={() => setShowCartModal(true)}
        onNotificationClick={() => setShowNotificationPopover(!showNotificationPopover)}
      />
      <div className="flex-1 relative">
        <main className="h-full overflow-y-auto p-4 pb-24">
          {renderPage()}
        </main>
        <button
          onClick={() => setShowChatbotModal(true)}
          className="fixed bottom-24 right-4 bg-gradient-to-r from-[#4866FA] to-[#99BCF2] text-white rounded-full p-4 shadow-xl transition-transform transform hover:scale-110 active:scale-95 z-40"
          aria-label="Open Chatbot"
        >
          <MessageCircle size={24} />
        </button>
      </div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onSosClick={handleSosClick} isDarkMode={isDarkMode} />
      
      {isClient && <>
        {showSosModal && createPortal(
          <SosModal onConfirm={handleConfirmSos} onCancel={handleCancelSos} isDarkMode={isDarkMode} />,
          document.body
        )}
        {selectedMetric && createPortal(
          <MetricDetailsModal metric={selectedMetric} onClose={() => setSelectedMetric(null)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {selectedEmergency && createPortal(
          <EmergencyDetailsModal emergency={selectedEmergency} onClose={() => setSelectedEmergency(null)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {isMapEnlarged && createPortal(
          <EnlargedMapModal onClose={() => setIsMapEnlarged(false)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showHealthHistory && createPortal(
          <HealthHistoryModal onClose={() => setShowHealthHistory(false)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showAddModal && createPortal(
          <AddInfoModal type={showAddModal} onClose={() => setShowAddModal(null)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showSettingsModal && createPortal(
          <SettingsModal setting={showSettingsModal} onClose={() => setShowSettingsModal(null)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />,
          document.body
        )}
        {showBurgerMenu && createPortal(
          <BurgerMenu onClose={() => setShowBurgerMenu(false)} onShowSettingsModal={setShowSettingsModal} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showChatbotModal && createPortal(
          <ChatbotModal onClose={() => setShowChatbotModal(false)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showBookingModal && createPortal(
          <BookingModal onClose={() => setShowBookingModal(false)} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showCartModal && createPortal(
          <CartModal 
            cart={cart}
            onClose={() => setShowCartModal(false)} 
            onUpdateQuantity={handleUpdateCartQuantity}
            onCheckout={handleProceedToCheckout}
            isDarkMode={isDarkMode} 
          />,
          document.body
        )}
        {showPaymentConfirmation && createPortal(
          <PaymentConfirmationModal onClose={handleClosePaymentConfirmation} isDarkMode={isDarkMode} />,
          document.body
        )}
        {showNotificationPopover && createPortal(
          <NotificationPopover
            onClose={() => setShowNotificationPopover(false)}
            isDarkMode={isDarkMode}
            onShowSettings={() => {
              setShowNotificationPopover(false);
              setShowSettingsModal('Notifications');
            }}
          />,
          document.body
        )}
      </>}
    </div>
  );
}

const MessageCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
)
