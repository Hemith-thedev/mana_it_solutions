import { motion } from "framer-motion";
import PTA from "../../Data/PTA";

const ContactPage = () => {
  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="contact-page utility-page">
      <h1 className="">Contact page</h1>
    </motion.main>
  )
}

export default ContactPage;