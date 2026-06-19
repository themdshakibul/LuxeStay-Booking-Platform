import Footer from "@/Components/Shared/Footer";
import Navbar from "@/Components/Shared/Navbar";
import { Providers } from "@/Components/Shared/ThemeProvider/providers";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Providers>
        <Navbar />
        <main className="grow flex flex-col">{children}</main>
        <Footer />
      </Providers>
    </div>
  );
};

export default MainLayout;
