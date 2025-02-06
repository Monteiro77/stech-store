import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeProvider.jsx";

const Container = styled.div`
  padding: 20px;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ darkMode }) => (darkMode ? "#13276e" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
`;

const Title = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#081747")};
  font-size: 2rem;
  font-weight: bold;
  text-align: start;
  text-transform: uppercase;
`;

const ProductWrapper = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  height: 550px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s ease;
  background-color: ${({ darkMode }) => (darkMode ? "#1c2a4d" : "#fff")};
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  width: 500px;
  background-color: ${({ darkMode }) => (darkMode ? "#1c2a4d" : "#fff")};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ darkMode }) => (darkMode ? "#ffd700" : "#3f58ad")};
  margin: 10px 0;
`;

const AddToCartButton = styled.button`
  background: ${({ darkMode }) => (darkMode ? "#ffd700" : "#3f58ad")};
  color: ${({ darkMode }) => (darkMode ? "#081747" : "#fff")};
  border: none;
  padding: 12px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 20px;
  &:hover {
    background: ${({ darkMode }) => (darkMode ? "#fff" : "#081747")};
  }
`;

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("cartao");
    const product = location.state?.product;
    const { darkMode } = useTheme();

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        for (let i = 0; i < quantity; i++) {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        
        toast.success("Produto adicionado ao carrinho!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const calculatePrice = () => {
        const originalPrice = product?.preco || 0;
        return paymentMethod === "pix" ? originalPrice * 0.95 : originalPrice;
    };

    return (
        <Container darkMode={darkMode}>
            <ToastContainer />
            <ProductWrapper>
                <ProductImageWrapper darkMode={darkMode}>
                    <ProductImage
                        src={product?.fotoProduto || "https://via.placeholder.com/400"}
                        alt={product?.nomeProduto || "Produto"}
                    />
                </ProductImageWrapper>

                <ProductInfo darkMode={darkMode}>
                    <Title darkMode={darkMode}>{product?.nomeProduto || "Produto"}</Title>
                    <Price darkMode={darkMode}>R$ {calculatePrice().toFixed(2)}</Price>
                    <p>{product?.descricao || "Descrição não disponível."}</p>
                    <AddToCartButton darkMode={darkMode} onClick={handleAddToCart}>
                        Adicionar ao Carrinho
                    </AddToCartButton>
                </ProductInfo>
            </ProductWrapper>
        </Container>
    );
};

export default ProductDetails;
