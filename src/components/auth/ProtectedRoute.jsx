import React from 'react'

// Vaqtincha authentication tekshiruvini o'chirib qo'yamiz
// Barcha sahifalar to'g'ridan-to'g'ri ochiladi
const ProtectedRoute = ({ children }) => {
  // Faqat children'ni qaytaramiz, authentication tekshiruvsiz
  return children
}

export default ProtectedRoute

