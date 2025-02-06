import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider.jsx";

const Container = styled.div`
  display: flex;
  margin: auto;
  padding: 5%;
  flex-wrap: wrap;
  background-color: ${({ darkMode }) => (darkMode ? "#13276e" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
  background: ${({ darkMode }) => (darkMode ? "#1c2a4d" : "#f5f5f5")};
  border-radius: 10px;
  margin-right: 20px;
  height: fit-content;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#081747")};
  margin-bottom: 10px;
`;

const FilterGroup = styled.div`
  margin-bottom: 15px;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")};
  margin-bottom: 5px;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  background-color: ${({ darkMode }) => (darkMode ? "#2b3a67" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#fff" : "#ccc")};
`;

const ProductsContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#081747")};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-family: "Tinos", serif;
  font-weight: 400;
  text-align: start;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const ProductCard = styled.div`
  background: ${({ darkMode }) => (darkMode ? "#1c2a4d" : "#fff")};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#081747")};
`;

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ darkMode }) => (darkMode ? "#ffd700" : "#3f58ad")};
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background: ${({ darkMode }) => (darkMode ? "#fff" : "#081747")};
  color: ${({ darkMode }) => (darkMode ? "#081747" : "#fff")};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${({ darkMode }) => (darkMode ? "#fff" : "#3f58ad")};
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [searchName, setSearchName] = useState("");
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://679e9cf4946b0e23c063c401.mockapi.io/stech-store/v1/produtos")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (maxPrice) {
      filtered = filtered.filter((product) => product.preco <= parseFloat(maxPrice));
    }

    if (searchName) {
      filtered = filtered.filter((product) =>
        product.nomeProduto.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [maxPrice, searchName, products]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Carregando produtos...</p>;
  }

  return (
    <Container darkMode={darkMode}>
      <Sidebar darkMode={darkMode}>
        <FilterTitle darkMode={darkMode}>Filtrar</FilterTitle>
        <FilterGroup>
          <FilterLabel darkMode={darkMode}>Preço Máximo:</FilterLabel>
          <FilterInput darkMode={darkMode} type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Ex: 100" />
        </FilterGroup>
        <FilterGroup>
          <FilterLabel darkMode={darkMode}>Nome do Produto:</FilterLabel>
          <FilterInput darkMode={darkMode} type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Ex: Camiseta" />
        </FilterGroup>
      </Sidebar>
      <ProductsContainer>
        <Title darkMode={darkMode}>Produtos</Title>
        <Grid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} darkMode={darkMode}>
              <ProductImage src={product.fotoProduto || "https://via.placeholder.com/200"} alt={product.nomeProduto || "Produto"} />
              <ProductName darkMode={darkMode}>{product.nomeProduto || "Nome não disponível"}</ProductName>
              <Price darkMode={darkMode}>R$ {product.preco ? product.preco.toFixed(2) : "0.00"}</Price>
              <Button darkMode={darkMode} onClick={() => navigate(`/produto/${product.id}`, { state: { product } })}>Ver Detalhes</Button>
            </ProductCard>
          ))}
        </Grid>
      </ProductsContainer>
    </Container>
  );
};

export default Products;
