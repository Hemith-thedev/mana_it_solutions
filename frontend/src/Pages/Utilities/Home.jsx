import { motion } from "framer-motion";
import PTA from "../../Data/PTA";
import Carousel from "../../Components/Common/Carousel";

const HomePage = () => {
  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="home-page utility-page">
      <Carousel slides={[
        {
          img: "images/home/carousel/1.jpg",
          alt: "",
          title: ""
        },
        {
          img: "images/home/carousel/2.jpg",
          alt: "",
          title: "Title 2"
        },
        {
          img: "",
          alt: "",
          title: "Title 3"
        }
      ]} />
    </motion.main>
  )
}

export default HomePage;