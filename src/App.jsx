import { useState } from 'react'
import './App.css'
import CategoryForm from './components/CategoryForm'
import Header from './components/Header'
import StoreProvider from './stateManagement/StoreProvider'

function App() {
  return (
    <StoreProvider>
      <Header />
      <CategoryForm />
    </StoreProvider>
  )
}

export default App
