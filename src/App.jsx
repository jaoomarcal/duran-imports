import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import DeliveryStrip from "./components/DeliveryStrip";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FloatingCart from "./components/cart/FloatingCart";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Products />
      <DeliveryStrip />
      <Footer />
      <FloatingWhatsApp />
      <FloatingCart />
    </div>
  );
}
