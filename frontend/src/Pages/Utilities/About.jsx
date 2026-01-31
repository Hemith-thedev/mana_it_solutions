import { motion } from "framer-motion";
import PTA from "../../Data/PTA";
import Wrapper from "../../Components/Layout/Wrapper";

const AboutPage = () => {
  const HeroSection = () => {
    return (
      <Wrapper className={"hero-section-wrapper image-hero-section"} id={"about-hero-section-wrapper"} children={
        <>
            <img src="./images/about-hero.png" alt="About Hero" />
            <h1>About Us</h1>
        </>
      } />
    )
  }
  const InfoSection = () => {
    return (
      <Wrapper className={"info-section-wrapper"} id={"about-info-section-wrapper"} children={
        <>
          <div className="content">
            <p>Here at Mana IT Solutions, we provide a wide range of services, including Annual Maintenance Contract (AMC), Managed Print Services (MPS), Facility Management Services (FMS), Document Management Solutions (DMS), Display Solution, CCTV Solution, VC Solution, IT Services. We are committed to providing our customers with the highest quality of services and support. We have a team of experienced and qualified professionals who are dedicated to meeting the needs of our customers. We are also constantly investing in new technologies and solutions to ensure that we can provide our customers with the best possible service.</p>
          </div>
          <div className="image">
            <img src="./images/about-info.png" alt="About Info" />
          </div>
        </>
      } />
    )
  }
  const Sections = [
    {
      className: "info-section-wrapper",
      id: "about-info-section-wrapper",
      wrapper: HeroSection
    },
    {
      className: "info-section-wrapper",
      id: "about-info-section-wrapper",
      wrapper: InfoSection
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

export default AboutPage;