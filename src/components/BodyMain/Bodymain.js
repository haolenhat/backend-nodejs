import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "./Slider/Slider.js";
import ContainerMain from "./ContainerMain/ContainerMain.js";
import Footer from "../Footer/Footer.js";
import axios from "axios";
import Admin from "../admin/admin.js";
import Cart from "../Cart/Cart.js";

const BodyMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setSelectedProduct(product);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-express-inky.vercel.app/api/tree"
        );
        setMoviesData(response.data || []);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (moviesData && moviesData.length > 0) {
      const filteredResults = moviesData.filter((movie) => {
        return (
          movie &&
          (movie.title?.toLowerCase().includes(searchTerm) ||
            movie.name?.toLowerCase().includes(searchTerm))
        );
      });

      setSearchResults(filteredResults);
    }
  };



  return (
    <Router>
      <HeaderStyle className="header-height">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Cây cảnh 5 anh em
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Administrator
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
              </ul>
              <div className="info">
                <div>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <div className="inputInfo">
                    <ul>
                      {searchResults.slice(0, 5).map((movie) => (
                        <li key={movie.id}>
                          <img
                            src={movie.poster_path}
                            alt={movie.title || movie.name}
                          />
                          <span>{movie.title || movie.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </HeaderStyle>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <ContainerMain
                cartItems={cart}
                addToCart={addToCart}
                setSelectedProduct={setSelectedProduct}
              />
              <Cart selectedProduct={selectedProduct} />
              <Footer />
            </>
          }
        />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

const HeaderStyle = styled.div`

  .navbar {
    background-color: #5ba503 !important;
    color:white !important;
    .nav-link{
      color:white !important;
    }
  }
  .sea-card2nd-item {
    display: flex;
    align-items: center;
    width: 100%;
    .btnVolume {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 33%;
      top: 50%;
      cursor: pointer;
      border-radius: 50%;
      padding: 6px;
      color: #bbb;
      border: #fff solid 1px;
      transition: all 0.3s ease;
      transform: scale(1);
      &:hover {
        color: #fff;
        transform: scale(1.2);
        background-color: rgba(211, 211, 211, 0.18);
      }

      @media screen and (max-width: 800px) {
        height: 30px;
        width: 30px;
        padding: 4px;
      }

      @media screen and (max-width: 600px) {
        height: 30px;
        width: 30px;
        padding: 1px;
      }
    }
    .sea-card2nd-video {
      width: 90%;
      height: 600px;
      .videoIntro {
        width: 100%;
      }
    }
    .sea-card2nd-info {
      width: 40%;
      margin: 0 10px;
      width: 40%;
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      h2 {
        color: white;
      }
      span {
        color: white;
      }
    }
  }
  .sea-meta {
    font-size: 12px;
    line-height: 20px;
    margin-top: 0;
    margin-bottom: 1rem;
    height: 100px;
  }

  .sea-title {
    font-size: 14px;
    font-weight: bold;
    height: 30px;
  }

  .sea-card_2nd {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #000;
    .icon_sea2nd {
      position: absolute;
      font-size: 30px;
      color: #fff;
      margin-top: 10px;
      top: 0;
      right: 10px;
      cursor: pointer;
    }
  }

  .inputInfo {
    position: absolute;
    background-color: #5ba503!important;
    border-radius: 10px;
    width: 226px;
    display: none;
    ul {
      padding-top: 10px;
      padding-left: 0;
      display: flex;
      flex-direction: column;
      width: 226px;
      margin-top: 0;
      margin-bottom: 1rem;
      li {
        border-bottom:0.1px solid #333;
        margin: 0 10px 10px 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          margin-right: 5px;
          border-radius: 5px;
        }
        span {
          font-size: 8px;
          line-height: 10px;
        }
      }
      li:hover {
        background-color: #f0f0f0;
      }
    }
  }
  .inputInfo:hover {
    display: block;
  }

  .search-input:focus + .inputInfo {
    display: block;
  }

  .cart_info {
    content: "";
    width: 300px;
    position: absolute;
    height: 100px;
    display: none;
    background-color: #fff;
    border: 0.5px solid #ccc;
    right: 90px;
    border-radius: 10px;

    ul {
      li {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .cart_hv:hover .cart_info {
    display: block;
  }

  .navbar {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    position: fixed;
    width: 100%;
    z-index: 1000;
    position: fixed;
    top: 0;
  }

  .sign-out {
    display: none;
    position: absolute;
    top: 40px;
    width: 140px;
    background-color: #fff;
    padding: 5px;
    border-radius: 10px;
    right: 10px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    span {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 14px;
    }

    .sign-out-icon {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 14px;
    }
  }

  .info_user:before {
    content: "";
    top: 30px;
    width: 60px;
    height: 20px;
    position: absolute;
  }

  .info_user:hover .sign-out {
    display: flex;
  }

  .navbar-brand {
    font-size: 30px;
    line-height: 30px;
    font-weight: bold;
    color: white;
  }

  .collapse {
    justify-content: space-between;
  }

  .container-fluid {
    padding: 0 50px;
  }

  .info {
    display: flex;
    align-items: center;
    input {
      margin-right: 20px;
    }

    .cart_icon {
      margin-left: 10px;
    }

    .info_user {
      display: flex;
      align-items: center;
      margin-left: 10px;

      .info_title {
        margin-left: 5px;
        color: #333;
        font-weight: bold;
        font-size: 14px;

        span {
          font-size: 14px;
          line-height: 14px;
        }

        .infor_name {
          color: #333;
        }
      }

      .info_user-icon {
        cursor: pointer;
        font-size: 20px;
        line-height: 20px;
      }

      .cart_icon:before {
        content: "1";
      }
    }
  }
`;

export default BodyMain;
