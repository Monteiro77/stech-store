import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"
import styled from "styled-components";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

function App() {


  const MainContent = styled.main`
  margin-top: 10vh; 
  flex-grow: 1; 
`;


  return (
    <>
     <ThemeProvider>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      </ThemeProvider>
    </>
  )
}

export default App
