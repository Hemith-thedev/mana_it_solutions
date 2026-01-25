import { motion } from "framer-motion";
import PTA from "../../Data/PTA";

const ServicesPage = () => {
  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="home-page utility-page">
      <h1 className="">Services page</h1>
    </motion.main>
  )
}

export default ServicesPage;