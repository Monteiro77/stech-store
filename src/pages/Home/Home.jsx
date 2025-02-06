import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider.jsx"; // Importando o contexto do tema
import imgCarrossel from "../../assets/imagecarrossel.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  height: auto;
  font-family: 'Arial', sans-serif;
  background-color: ${({ darkMode }) => (darkMode ? "#13276e" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
  min-height: 100vh;
`;

const Title = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#081747")};
  font-size: 2rem;
  font-family: "Tinos", serif;
  font-weight: 400;
  text-align: center;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Button = styled.button`
  background-color: ${({ darkMode }) => (darkMode ? "#fff" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#081747" : "black")};
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const CarrosselContainer = styled.div`
  width: 100%;
  margin: 0 auto 30px auto;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CategoryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 80%;
  margin-bottom: 20px;
`;

const CategoryCard = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  border-radius: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const CategoryName = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const carrosselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false
};

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { darkMode } = useTheme(); // Obtendo o tema global

  useEffect(() => {
    axios.get("https://679e9cf4946b0e23c063c401.mockapi.io/stech-store/v1/categorias")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar as categorias:", error);
      });
  }, []);

  return (
    <HomeContainer darkMode={darkMode}>
      <CarrosselContainer>
        <Slider {...carrosselSettings}>
          <div>
            <img src={imgCarrossel} 
                alt="Promoção 1" 
                style={{ width: "100%", height: "500px", objectFit: "cover" }} />
          </div>
          <div>
            <img src="https://img.freepik.com/vetores-gratis/fundo-de-negocios-de-desconto-de-oferta-de-banner-de-venda-abstrata-vetor-gratis_1340-22420.jpg?t=st=1738452965~exp=1738456565~hmac=daffe159f4bfd91028a1db5b854c8af2ae23055978953015c1cec34fafc40834&w=1800" 
                alt="Promoção 2" 
                style={{ width: "100%", height: "500px", objectFit: "cover" }} />
          </div>
          <div>
            <img src="https://img.freepik.com/vetores-gratis/banner-moderno-de-oferta-de-desconto-de-sexta-feira-negra-com-vetor-de-sinal-de-porcentagem-brilhante_1017-47720.jpg?t=st=1738452942~exp=1738456542~hmac=3cff54a71cf45c2a07072c924ffb8b6b586964e46964df8d38c1a679acf6f6a4&w=1380" 
                alt="Promoção 3" 
                style={{ width: "100%", height: "500px", objectFit: "cover" }} />
          </div>
        </Slider>
      </CarrosselContainer>

      <Title darkMode={darkMode}>Desfile sua essência com as novidades:</Title>

      <Button darkMode={darkMode} onClick={() => navigate("/produtos")}>
        Ver Produtos
      </Button>

      <CategoryContainer>
        {categories.map((category) => (
          <CategoryCard key={category.id} darkMode={darkMode} onClick={() => navigate(`/categoria/${category.id}`)}>
            <CategoryImage src={category.fotoCategoria} alt={category.nomeCategoria} />
            <CategoryName>{category.nomeCategoria}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryContainer>
    </HomeContainer>
  );
};

export default Home;
