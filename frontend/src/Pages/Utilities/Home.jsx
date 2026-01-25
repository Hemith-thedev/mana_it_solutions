import { motion } from "framer-motion";
import PTA from "../../Data/PTA";

const HomePage = () => {
  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="home-page utility-page">
      <h1 className="">Home page</h1>
    </motion.main>
  )
}

export default HomePage;