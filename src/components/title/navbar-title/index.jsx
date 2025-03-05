import { motion } from "framer-motion";

const NavbarTitle = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2 }}
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#3965c6] font-semibold"
    >
      {children}
    </motion.div>
  );
};
export default NavbarTitle;
