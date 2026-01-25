import { motion } from "framer-motion";
import PTA from "../../Data/PTA";

const AboutPage = () => {
  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="about-page utility-page">
      <h1 className="">About page</h1>
    </motion.main>
  )
}

export default AboutPage;