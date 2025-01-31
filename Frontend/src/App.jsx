import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Error from "./components/shared/Error";
import Loading from "./components/shared/Loading";
import HomePage from "./components/shared/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Contact from "./components/shared/Contact";
import Eventpage from "../pages/Events";
import EventDetail from "./components/events/EventDetail";
import { EventProvider } from "./context/EventContext";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import VenuePage from "./components/events/VenuePage";
import SelectTickets from "./components/events/SelectTickets";
import PaymentPage from "./components/events/PaymentPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import RazorpayPayment from "./components/events/RazorpayPayment";
import PaymentSuccess from "./components/events/PaymentSuccess";
import PaymentFailure from "./components/events/PaymentFailure";
import { TicketProvider } from "./context/TicketContext";
import MyTickets from "./components/shared/MyTickets";
import Settings from "./components/shared/Settings";

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>
      {children}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <EventProvider>
            <Navbar />
            <PageWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/event" element={<Eventpage />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Error />} />

              {/* Protected Routes */}
              <Route
                path="/event/:id/book"
                element={
                  <ProtectedRoute>
                    <VenuePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/:id/select-tickets"
                element={
                  <ProtectedRoute>
                    <SelectTickets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/:id/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/:id/razorpay"
                element={
                  <ProtectedRoute>
                    <RazorpayPayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-failure"
                element={
                  <ProtectedRoute>
                    <PaymentFailure />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-tickets"
                element={
                  <ProtectedRoute>
                    <MyTickets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
            </PageWrapper>
            <Footer />
          </EventProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
