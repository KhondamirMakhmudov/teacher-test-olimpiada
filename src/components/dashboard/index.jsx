import Brand from "../brand";
import DashboardNav from "../dashboard-nav";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Sidebar from "./sidebar";
import MainContent from "./main";
import { useRouter } from "next/router";

const Dashboard = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(null); // Boshlang‘ich holat yo‘q

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth > 1024); // Sahifa yuklanganda aniqlash
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false); // Faqat mobil ekranlarda yopilsin
    }
  }, [router.pathname]);

  if (isSidebarOpen === null) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <div className="p-[30px] border-b border-b-[#EAEFF4] dark:border-b-[#2A3447FF] flex items-center justify-center">
            <Brand />
          </div>
          <DashboardNav />
        </Sidebar>

        <MainContent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          {children}
        </MainContent>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
