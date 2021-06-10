import React, { useState, useContext } from 'react'

/* =====================
  Image attatchment context
 =======================*/ 
const AttatchedImageContext = React.createContext()
const UpdateImageContext = React.createContext()

export function useImageAttatchments(){
  return useContext(AttatchedImageContext)
}

export function useUpdateImageAttatchments(){
  return useContext(UpdateImageContext) 
}

export const ImageAttatchmentsContext = ({ children }) => {
  const [attatchedImages, setAttatchedImages] = useState({
    images: []
  })

  return (
    <AttatchedImageContext.Provider value={ attatchedImages }>
      <UpdateImageContext.Provider value={ setAttatchedImages }>
        { children }
      </UpdateImageContext.Provider>
    </AttatchedImageContext.Provider>
  )
}

/* =====================
  File attatchment context
 =======================*/ 