import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const ProductsContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #081747;
  font-size: 2rem;
  font-family: "Tinos", serif;
  font-weight: 400;
  text-align: start;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
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
  color: #081747;
`;

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #3f58ad;
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background: #081747;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #3f58ad;
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    axios
      .get("https://679e9cf4946b0e23c063c401.mockapi.io/stech-store/v1/produtos")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Carregando produtos...</p>;
  }

  return (
    <ProductsContainer>
      <Title>Produtos</Title>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage
              src={product.fotoProduto || "https://via.placeholder.com/200"}
              alt={product.nomeProduto || "Produto"}
            />
            <ProductName>{product.nomeProduto || "Nome não disponível"}</ProductName>
            <Price>R$ {product.preco ? product.preco.toFixed(2) : "0.00"}</Price>
            <Button onClick={() => navigate(`/produto/${product.id}`, { state: { product } })}>
              Ver Detalhes
            </Button>
          </ProductCard>
        ))}
      </Grid>
    </ProductsContainer>
  );
};

export default Products;
