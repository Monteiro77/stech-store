import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import logo from "../assets/logo-stech.png";
import { useTheme } from "../context/ThemeProvider.jsx"; // Importando o ThemeContext

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  height: 10vh;
  justify-content: space-between;
  align-items: center;
  background: ${({ isScrolled }) => (isScrolled ? "rgba(8, 23, 71, 0.8)" : "#081747")};
  padding: 15px 30px;
  color: white;
  border-bottom: 2px solid #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: row;
    height: auto;
    padding: 10px 20px;
  }
`;

const Logo = styled.img`
  width: 140px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: 300ms;

    &:hover {
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CartWrapper = styled.div`
  position: relative;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartIcon = styled(MdOutlineShoppingCart)`
  font-size: 22px;
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: #ffcc00;
  }
`;

const DarkModeButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: #ffcc00;
  }
`;

const Header = ({ onSearch }) => {
  const { darkMode, toggleDarkMode } = useTheme(); // Usando o contexto global do tema
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo src={logo} alt="Logo da loja" />

      <Nav>
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
      </Nav>

      <CartContainer>
        <DarkModeButton onClick={toggleDarkMode}>
          {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
        </DarkModeButton>
        <Link to="/carrinho">
          <CartWrapper>
            <CartIcon />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </CartWrapper>
        </Link>
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;
