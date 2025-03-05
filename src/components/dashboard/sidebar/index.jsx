const Sidebar = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Backdrop (fon qoraytirish, faqat sidebar ochilganda ko‘rinadi) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-[#202936] border-r border-[#EAEFF4] dark:border-[#2A3447FF] 
        transition-transform duration-300 z-50 w-[350px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
