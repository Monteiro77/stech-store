import { Outlet } from "react-router-dom"
import Header from "./Components/Header.jsx"
import styled from "styled-components";

function App() {


  const MainContent = styled.main`
  margin-top: 80px; 
  flex-grow: 1; 
`;


  return (
    <>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  )
}

export default App
