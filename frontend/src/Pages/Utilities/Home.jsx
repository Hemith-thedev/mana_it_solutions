
import { NavLink, useNavigate } from "react-router-dom";
import PTA from "../../Data/PTA";
import Carousel from "../../Components/Common/Carousel";
import Wrapper from "../../Components/Layout/Wrapper";
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const HeroSection = () => {
    return (
      <Wrapper className={"hero-section"} id={"home-hero-section"} children={
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
      } />
    )
  }
  const AboutSection = () => {
    return (
      <Wrapper className={"info-section-wrapper"} id={"home-about-section-wrapper"} children={
        <>
          <div className="content">
            <h3>About Us</h3>
            <p>MANA is an IT consulting firm that focusses in the plan, execution, and support of all IT related systems with a clear attention on Industry Importance. We are Established in 2021 and support the organizations in various industries and sectors such as: IT/ITES, Financial Services, Construction, Retail, Government organizations, Pharma, Education, Manufacturing, Aviation Etc. Optimally leveraged Information Technology can support an organization by increasing revenue, lowering the Cost.</p>
            <button onClick={() => navigate("/about")}>Read More</button>
            <NavLink to={"/about"}>Read More</NavLink>
          </div>
          <div className="image">
            <img src="./images/home-about.jpg" alt="Home About" />
          </div>
        </>
      } />
    )
  }
  const ServicesSection = () => {
    const Services = [
      "Managed Print Services",
      "Annual Maintainance Contract",
      "Facility Management Services",
      "Document Management Solutions",
      "Display Solution",
      "Networking",
      "CCTV Solution",
      "Video Conferencing Solution",
      "IT Services"
    ];
    const ServiceCard = ({ title = "", image = "" }) => {
      return (
        <div className="service-card">
          <Wrapper children={
            <>
              <div className="image">
                <img src={image} alt={title} />
              </div>
              <div className="title">
                <p>{title}</p>
              </div>
            </>
          } />
        </div>
      )
    }
    return (
      <Wrapper className={"info-section-wrapper"} id={"home-services-section-wrapper"} children={
        <>
          <h1>Services</h1>
          <div className="service-cards">
            {
              Services.map((service, index) => {
                const ServiceIndex = index + 1;
                return <ServiceCard
                  key={ServiceIndex}
                  title={service}
                  image={`./images/service-${ServiceIndex}.jpg`}
                />
              })
            }
          </div>
        </>
      } />
    )
  }
  const TestimonialSection = () => {
    const Testimonials = [
      {
        person: "John",
        feedback: "Mana it Solutions has provided us with professional candidate.that our customer desires",
        size: "small"
      },
      {
        person: "Mohan",
        feedback: "They were there whenever we needed and with their known expertise ensured we were successful with all our initial",
        size: "small"
      },
      {
        person: "Santoshi",
        feedback: "Working with the team of Mana IT Solution has been a very experience. They responded quickly and  understand what we are looking for and addressed our requirement",
        size: "large"
      }
    ]
    return (
      <Wrapper
        className={"info-section-wrapper"}
        id={"home-testimonial-section-wrapper"}
        children={
          <>
            <h1>Testimonial</h1>
            <div className="testimonials">
              {
                Testimonials.map((testimonial, index) => (
                  <div key={index} className={`testimonial-card
                  ${(index === 0) ? "bg-blue-300 text-white" : ""}
                  ${(index === 1) ? "bg-blue-400 text-white" : ""}
                  ${(index === 2) ? "bg-blue-500 text-white" : ""}
                  `}>
                    <Wrapper children={
                      <>
                        <p>{testimonial.feedback}</p>
                        <h3>- {testimonial.person}</h3>
                      </>
                    } />
                  </div>
                ))
              }
            </div>
          </>
        }
      />
    )
  }
  const ContactSection = () => {
    return (
      <Wrapper className={"info-section"} id={"home-contact-section"} children={
        <>
          <h3>Do you have any question?</h3>
          <button onClick={() => navigate("/contact")}>Contact us</button>
        </>
      } />
    )
  }
  const Sections = [
    {
      className: "hero-section",
      id: "home-hero-section",
      wrapper: HeroSection
    },
    {
      className: "content-section",
      id: "home-about-section",
      wrapper: AboutSection
    },
    {
      className: "content-section",
      id: "home-services-section",
      wrapper: ServicesSection
    },
    {
      className: "info-section",
      id: "home-testimonial-section",
      wrapper: TestimonialSection
    },
    {
      className: "info-section",
      id: "home-contact-section",
      wrapper: ContactSection
    }
  ];
  const RenderSections = () => Sections.map((section, index) => {
    return <section key={index} className={section.className ? section.className : ""} id={section.id ? section.id : ""}>
      {section.wrapper()}
    </section>
  })

  return (
    <motion.main
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={PTA.transition}
      variants={PTA}
      className="home-page utility-page"
    >
      {RenderSections()}
    </motion.main>
  )
}

export default HomePage;