import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import logo from "../assets/logo-stech.png";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  background: ${({ isScrolled }) => (isScrolled ? "rgba(8, 23, 71, 0.8)" : "#081747")};
  padding: 15px 30px;
  color: white;
  border-bottom: 2px solid #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out;
`;

const Logo = styled.img`
    width: 140px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
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
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 2px 10px;
  width: 250px;
  border-radius: 20px;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;

  &:focus-within {
    border-color: #3f58ad;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: 8px;
  color: #081747;
  background: transparent;
  border-radius: 20px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #3f58ad;
  font-size: 18px;
  margin-right: 10px;
  transition: color 0.3s ease;

  ${SearchContainer}:hover & {
    color: #081747;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
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

    // Atualiza a contagem do carrinho no carregamento inicial
    updateCartCount();

    // Monitora mudanças no localStorage
    window.addEventListener("storage", updateCartCount);

    // Monitora o evento de scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
  };

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo src={logo} alt="Logo da loja" />

      <Nav>
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
      </Nav>

      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>

      <CartContainer>
        <DarkModeButton onClick={toggleDarkMode}>
          {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
        </DarkModeButton>
        <Link to="/carrinho">
          <CartIcon />
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;
