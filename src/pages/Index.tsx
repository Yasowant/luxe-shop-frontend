import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductGrid from "@/components/ProductGrid";
import DashboardPreview from "@/components/DashboardPreview";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <CategoriesSection />
    <ProductGrid />
    <DashboardPreview />
    <Footer />
  </div>
);

export default Index;
