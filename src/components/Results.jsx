import { Link } from "react-router-dom";
import styled from "styled-components";
import BackgroundResults from "../assets/BackgroundResults.jpg";
import { useQuiz } from "../QuizContext";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Results = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { answers, resetQuiz } = useQuiz();

  //Helper: sort wishlist items first
  const sortProductsByWishlist = (arr, wishlistArr) => {
    return [...arr].sort((a, b) => {
      const aIn = wishlistArr.includes(a.id) ? 0 : 1;
      const bIn = wishlistArr.includes(b.id) ? 0 : 1;
      return aIn - bIn;
    });
  };

  // Wishlist toggle
  const toggleWishlist = (id) => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((w) => w !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setProducts((prev) => sortProductsByWishlist(prev, updated));
  };

  // Fetch products + filter 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        const data = await res.json();

        // Get saved wishlist
        const storedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);

        // Build keywords from quiz answers
        const keywords = Object.values(answers)
          .map((a) => String(a).toLowerCase())
          .filter(Boolean);

        // Filter products by answers
        let filtered = data.products;
        if (keywords.length > 0) {
          filtered = data.products.filter((p) =>
            keywords.some(
              (kw) =>
                p.title.toLowerCase().includes(kw) ||
                p.body_html.toLowerCase().includes(kw) ||
                p.tags.some((tag) => tag.toLowerCase().includes(kw))
            )
          );
        }

        const sorted = sortProductsByWishlist(filtered, storedWishlist);
        setProducts(sorted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [answers]);

  // Retake handler
  const handleRetake = () => {
    setWishlist([]);
    resetQuiz();
  };

  const PrevArrow = ({ onClick }) => (
    <ArrowButton style={{ left: "-60px" }} onClick={onClick}>
      <FiChevronLeft />
    </ArrowButton>
  );

  const NextArrow = ({ onClick }) => (
    <ArrowButton style={{ right: "-60px" }} onClick={onClick}>
      <FiChevronRight />
    </ArrowButton>
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  console.log(products);
  console.log(answers);

  return (
    <Wrapper>
      <TextAndButtonContainer>
        <Heading>
          Build your everyday self <br />
          care routine.
        </Heading>
        <Paragraph>
          Perfect for if you're looking for soft, nourished skin, our
          moisturizing body washes are made with skin-natural nutrients that
          work with your skin to replenish moisture. With a light formula, the
          bubbly lather leaves your skin feeling cleansed and cared for. And by
          choosing relaxing fragrances you can add a moment of calm to the end
          of your day.
        </Paragraph>
        <Button to={"/"} onClick={handleRetake}>
          Retake the quiz
        </Button>
      </TextAndButtonContainer>

      <CardsWrapper>
        <ProductsCards>
          <ProductSlider {...sliderSettings}>
            {/* Routine Card */}
            <ProductCard>
              <RoutineCard>
                <RoutineTextsWrapper>
                  <RoutineHeading>Daily routine</RoutineHeading>
                  <RoutineParagraph>
                    Perfect for if you're looking for soft, nourished skin, our
                    moisturizing body washes are made with skin-natural
                    nutrients that work with your skin to replenish moisture.
                    With a light formula, the bubbly lather leaves your skin
                    feeling cleansed and cared for.
                  </RoutineParagraph>
                </RoutineTextsWrapper>
              </RoutineCard>
            </ProductCard>

            {/* Render products */}
            {products.map((product) => (
              <ProductCard key={product.id}>
                <FavouriteContainer onClick={() => toggleWishlist(product.id)}>
                  {wishlist.includes(product.id) ? <FaHeart /> : <CiHeart />}
                </FavouriteContainer>
                <ProductImageContainer>
                  <ProductImage
                    src={product?.images[0]?.src}
                    alt={product.title}
                  />
                </ProductImageContainer>
                <ProductDescription>
                  <ProductName>{product.title}</ProductName>
                  <ProductPrice>${product?.variants[0]?.price}</ProductPrice>
                </ProductDescription>
              </ProductCard>
            ))}
          </ProductSlider>
        </ProductsCards>
      </CardsWrapper>
    </Wrapper>
  );
};

export default Results;

const Wrapper = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${BackgroundResults});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 550px;
`;

const TextAndButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled.div`
  color: white;
  font-size: 48px;
  padding-bottom: 10px;
`;

const Paragraph = styled.div`
  width: 30%;
  color: white;
  padding-bottom: 40px;
`;

const Button = styled(Link)`
  width: 150px;
  outline: none;
  border: 1px solid white;
  border-radius: 6px;
  padding: 12px;
  text-decoration: none;
  color: white;
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
`;

const CardsWrapper = styled.div`
  top: 470px;
  position: absolute;
  display: flex;
`;

const RoutineCard = styled.div`
  min-width: 350px;
  height: 100%;
  border-radius: 8px;
  background-color: #eef7fb;
`;

const RoutineTextsWrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const RoutineHeading = styled.div`
  font-size: 24px;
`;

const RoutineParagraph = styled.div`
  letter-spacing: 1.5px;
`;

const ProductsCards = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ProductCard = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.01);
  }
`;

const FavouriteContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 10px;
  background-color: white;
`;

const ProductImageContainer = styled.div`
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 350px;
`;

const ProductDescription = styled.div`
  text-align: center;
  padding: 10px;
`;

const ProductName = styled.div`
  font-size: 20px;
`;

const ProductPrice = styled.div`
  padding-top: 10px;
  font-size: 18px;
`;

const ProductSlider = styled(Slider)`
  width: 80%;

  .slick-track {
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    margin: 10px;
  }

  .slick-dots li button:before {
    font-size: 10px;
    color: #5bc1ed;
  }
  .slick-dots li.slick-active button:before {
    color: #1c2635;
  }
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: #eef7fb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    font-size: 22px;
    color: #1c2635;
  }

  &:hover {
    transform: translateY(-50%) scale(1.05);
  }
`;
