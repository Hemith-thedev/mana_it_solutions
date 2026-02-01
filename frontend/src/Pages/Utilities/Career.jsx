import { motion } from "framer-motion";
import PTA from "../../Data/PTA";
import Wrapper from "../../Components/Layout/Wrapper";

const CareerPage = () => {
  const HeroSection = () => {
    return (
      <Wrapper className={"hero-section-wrapper image-hero-section"} id={"about-hero-section-wrapper"} children={
        <>
          <img src="./images/career-hero.jpg" alt="Career Hero" />
          <h1>Career</h1>
        </>
      } />
    )
  }
  const Sections = [
    {
      className: "hero-section",
      id: "career-info-section",
      wrapper: HeroSection
    }
  ];
  const RenderSections = () => Sections.map((Section, index) => {
    return <section
      key={index}
      className={Section.className ? Section.className : ""}
      id={Section.id ? Section.id : ""}>
      {Section.wrapper()}
    </section>
  })

  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="about-page utility-page"
    >
      {RenderSections()}
    </motion.main>
  )
}

export default CareerPage;