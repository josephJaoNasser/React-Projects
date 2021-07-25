const TextLinePlaceholder = ({
  width = "100%", 
  height = 20, 
  lines = 1, 
  color = "rgba(0,0,0,0.15)"
}) => {
  
  let placeholderLines = [];

  for(let i = 0; i < lines; i++){
    placeholderLines.push(
      <div style={{
        height: height,
        width: width,
        backgroundColor: color,
        borderRadius: 5,
        marginBottom: 7
      }}></div>
    )
  }

  return (
    <>
      {
        placeholderLines.map((line,index) => (
          <div key={index}>
            {line}
          </div>
        ))
      }
    </>    
  )

}

export default TextLinePlaceholder