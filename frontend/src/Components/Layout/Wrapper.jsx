const Wrapper = ({className, id, children}) => {
  return (
    <div className={`wrapper ${className ? className : ""}`} id={id ? id : ""}>
      {children}
    </div>
  )
}

export default Wrapper;