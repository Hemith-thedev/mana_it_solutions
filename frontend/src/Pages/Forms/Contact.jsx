import { motion } from "framer-motion";
import PTA from "../../Data/PTA";
import Wrapper from "../../Components/Layout/Wrapper";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "../../Components/Common/ContactForm";

const ContactPage = () => {
  const HeroSection = () => {
    return (
      <Wrapper className={"hero-section-wrapper image-hero-section"} id={"about-hero-section-wrapper"} children={
        <>
          <img src="./images/contact-hero.jpg" alt="Contact Hero" />
          <h1>Contact Us</h1>
        </>
      } />
    )
  }
  const CardsSection = () => {
    const Card = ({ descriptions = [], title, icon }) => {
      return (
        <div className="card">
          <Wrapper children={
            <>
              <div className="icon">
                {icon}
              </div>
              <h3>{title}</h3>
              <div className="descriptions">
                {
                  descriptions.map((description, index) => {
                    return (
                      <p
                        key={index}
                        className="description"
                      >{description}</p>
                    )
                  })
                }
              </div>
            </>
          } />
        </div>
      )
    }
    const CardsInfo = [
      {
        icon: <MapPin />,
        title: "Visit us",
        descriptions: [
          "No.168/63, Near Andrahalli Circle, Herohalli Main Road Vidyamanyanagar, Bengaluru – 560 091"
        ]
      },
      {
        icon: <Phone />,
        title: "Call us",
        descriptions: [
          "+91 9986333390",
          "+91 9986333394"
        ]
      },
      {
        icon: <Mail />,
        title: "Email us",
        descriptions: [
          "hello@manaitsolutions.com"
        ]
      }
    ]
    return (
      <Wrapper className={"info-section-wrapper"} id={"about-info-section-wrapper"} children={
        <>
          {
            CardsInfo.map((card, index) => {
              return (
                <Card key={index} {...card} />
              )
            })
          }
        </>
      } />
    )
  }
  const FormSection = () => {
    return (
      <Wrapper className={"form-section-wrapper"} id={"about-form-section-wrapper"} children={
        <>
          <div className="map">
            <iframe title="Our location" src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d2439113.0815255595!2d77.68316530401607!3d12.720021522737945!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bae3de5c1a612cd%3A0x93f0c300365c4cc6!2sMana%20IT%20Solutions%2C%20No.%20168%2F63%2C%20Herohalli%20Main%20Rd%2C%20near%20Andrahalli%20Main%20Road%2C%20Vidyamanya%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560091!3m2!1d13.0068568!2d77.4859926!5e0!3m2!1sen!2sin!4v1769880511639!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="form-wrapper">
            <ContactForm />
          </div>
        </>
      } />
    )
  }
  const Sections = [
    {
      className: "info-section",
      id: "contact-hero-section",
      wrapper: HeroSection
    },
    {
      className: "info-section",
      id: "contact-cards-section",
      wrapper: CardsSection
    },
    {
      className: "form-section",
      id: "contact-form-section",
      wrapper: FormSection
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

export default ContactPage;