import MainContentHead from "@/components/main-content-head";

const MainContent = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`transition-all duration-300 flex-1 p-[30px] ${
        isSidebarOpen ? "lg:ml-[350px]" : "lg:ml-0"
      }`}
    >
      <MainContentHead toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {children}
    </div>
  );
};

export default MainContent;
