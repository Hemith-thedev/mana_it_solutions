const PTA = {
  initial: {
    opacity: 0,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)"
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)"
  },
  transition: {
    duration: 0.5
  }
};

export default PTA;