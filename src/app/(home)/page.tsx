import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import HomePage from "@/features/home";

const Page = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      {/* Main Content */}
      <HomePage />
      
      {/* Footer with Top Border */}
      <div className="mt-20 border-t border-black/10 bg-white dark:border-white/10 dark:bg-black">
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton threshold={500} />

      {/* Gradient Background Effect - Optional */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10" />
    </div>
  );
};

export default Page;
