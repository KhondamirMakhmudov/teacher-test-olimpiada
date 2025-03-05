import { motion } from "framer-motion";

const TitleLittleContent = ({ children }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, translateY: "30px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.2 }}
      className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#3965c6] font-semibold"
    >
      {children}
    </motion.h1>
  );
};
export default TitleLittleContent;
