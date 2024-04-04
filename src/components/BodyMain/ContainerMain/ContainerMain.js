import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { CiShoppingCart } from 'react-icons/ci';
import { IoMdCloseCircle } from 'react-icons/io';
import ReactPlayer from 'react-player';
import { VscMute, VscUnmute } from 'react-icons/vsc';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContainerMain({ cartItems, addToCart }) {
  const [movies, setMovies] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isProductCard2ndVisible, setIsProductCard2ndVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Cây hoa');

  useEffect(() => {
    axios
      .get('https://api-caycanh.vercel.app/api/tree')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, []);

  useEffect(() => {
    handleChange({ target: { value: 'Cây hoa' } });
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const truncateOverview = (overview) => {
    if (overview) {
      const maxLength = 200;
      return overview.length > maxLength
        ? overview.substring(0, maxLength - 3) + '...'
        : overview;
    }
    return '';
  };

  const handleProductCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsProductCard2ndVisible(true);
  };

  const handleProductCard2ndClose = () => {
    setSelectedMovie(null);
    setIsProductCard2ndVisible(false);
  };

  const renderTreeType = (type) => {
    switch (type) {
      case 'table':
        return 'Cây để bàn';
      case 'construction':
        return 'Cây công trình';
      case 'flower':
        return 'Hoa';
      default:
        return 'Không rõ';
    }
  };

  const handleAddToCartClick = (movie) => {
    setCart([...cart, movie]);
    addToCart(movie);
    toast.success('Thêm vào giỏ hàng thành công!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <ContainerStyle>
      <ToastContainer />
      <div className="container">
        <div className="Heading">
          <h1>Danh sách cây cảnh có trong cửa hàng </h1>
          <div>
            <label htmlFor="trees">Chọn loại cây:</label>
            <select
              className="selec"
              id="trees"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="Cây hoa">Cây hoa</option>
              <option value="Cây công trình">Cây công trình</option>
              <option value="Cây để bàn">Cây để bàn</option>
            </select>
          </div>
        </div>

        {selectedValue === 'Cây hoa' && (
          <div className="row">
            {movies.map((movie) => {
              if (movie.type === 'flower') {
                return (
                  <div
                    key={movie._id}
                    className="mb-30 col-lg-4 col-sm-6 mb-30"
                  >
                    <div className="product-card mx-auto mb-3">
                      <a
                        className="product-thumb"
                        href="#/"
                        onClick={() => handleProductCardClick(movie)}
                      >
                        <img src={movie.poster_path} alt="Movie Poster" />
                      </a>
                      <div className="product-card-body">
                        <h5 className="product-title">
                          {movie.title || movie.name}
                        </h5>
                        <span className="product-price">
                          Loại cây: {renderTreeType(movie.type)}
                        </span>
                        <span className="product-price2">
                          Price: {movie.price}đ
                        </span>
                        <p className="product-meta">
                          {truncateOverview(movie.overview)}
                        </p>
                      </div>
                      <div className="product-buttons-wrap">
                        <div className="product-buttons">
                          <div className="product-button">
                            <a
                              href="#/"
                              onClick={() => handleAddToCartClick(movie)}
                            >
                              <CiShoppingCart className="product-button-icona" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {isProductCard2ndVisible && selectedMovie && (
              <div className="product-card_2nd">
                <IoMdCloseCircle
                  className="icon_product2nd"
                  onClick={handleProductCard2ndClose}
                />
                <div className="product-card2nd-item">
                  <div className="product-card2nd-video">
                    <ReactPlayer
                      autoPlay={true}
                      playing={true}
                      loop={true}
                      width="100%"
                      height="100%"
                      volume={0.5}
                      muted={isMuted}
                      url={selectedMovie.link_film}
                      className="videoIntro"
                    />
                    {isMuted ? (
                      <VscMute
                        className="btnVolume"
                        onClick={() => setIsMuted((prev) => !prev)}
                      />
                    ) : (
                      <VscUnmute
                        className="btnVolume"
                        onClick={() => setIsMuted((prev) => !prev)}
                      />
                    )}
                  </div>
                  <div className="product-card2nd-info">
                    <h2>{selectedMovie.title || selectedMovie.name}</h2>
                    <span>{truncateOverview(selectedMovie.overview)}</span>
                    <span>Thể loại: {selectedMovie.type}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedValue === 'Cây công trình' && (
          <div className="row">
            {movies.map((movie) => {
              if (movie.type === 'construction') {
                return (
                  <div
                    key={movie._id}
                    className="mb-30 col-lg-4 col-sm-6 mb-30"
                  >
                    <div className="product-card mx-auto mb-3">
                      <a
                        className="product-thumb"
                        href="#/"
                        onClick={() => handleProductCardClick(movie)}
                      >
                        <img src={movie.poster_path} alt="Movie Poster" />
                      </a>
                      <div className="product-card-body">
                        <h5 className="product-title">
                          {movie.title || movie.name}
                        </h5>
                        <span className="product-price">
                          Loại cây: {renderTreeType(movie.type)}
                        </span>
                        <span className="product-price2">
                          Price: {movie.price}đ
                        </span>
                        <p className="product-meta">
                          {truncateOverview(movie.overview)}
                        </p>
                      </div>
                      <div className="product-buttons-wrap">
                        <div className="product-buttons">
                          <div className="product-button">
                            <a
                              href="#/"
                              onClick={() => handleAddToCartClick(movie)}
                            >
                              <CiShoppingCart className="product-button-icona" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {isProductCard2ndVisible && selectedMovie && (
              <div className="product-card_2nd">
                <IoMdCloseCircle
                  className="icon_product2nd"
                  onClick={handleProductCard2ndClose}
                />
                <div className="product-card2nd-item">
                  <div className="product-card2nd-video">
                    <ReactPlayer
                      autoPlay={true}
                      playing={true}
                      loop={true}
                      width="100%"
                      height="100%"
                      volume={0.5}
                      muted={isMuted}
                      url={selectedMovie.link_film}
                      className="videoIntro"
                    />
                    {isMuted ? (
                      <VscMute
                        className="btnVolume"
                        onClick={() => setIsMuted((prev) => !prev)}
                      />
                    ) : (
                      <VscUnmute
                        className="btnVolume"
                        onClick={() => setIsMuted((prev) => !prev)}
                      />
                    )}
                  </div>
                  <div className="product-card2nd-info">
                    <h2>{selectedMovie.title || selectedMovie.name}</h2>
                    <span>{truncateOverview(selectedMovie.overview)}</span>
                    <span>Thể loại: {selectedMovie.type}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {selectedValue === 'Cây để bàn' && (
          <div className="row">
            {movies.map((movie) => {
              if (movie.type === 'table') {
                return (
                  <div
                    key={movie._id}
                    className="mb-30 col-lg-4 col-sm-6 mb-30"
                  >
                    <div className="product-card mx-auto mb-3">
                      <a
                        className="product-thumb"
                        href="#/"
                        onClick={() => handleProductCardClick(movie)}
                      >
                        <img src={movie.poster_path} alt="Movie Poster" />
                      </a>
                      <div className="product-card-body">
                        <h5 className="product-title">
                          {movie.title || movie.name}
                        </h5>
                        <span className="product-price">
                          Loại cây: {renderTreeType(movie.type)}
                        </span>
                        <span className="product-price2">
                          Price: {movie.price}đ
                        </span>
                        <p className="product-meta">
                          {truncateOverview(movie.overview)}
                        </p>
                      </div>
                      <div className="product-buttons-wrap">
                        <div className="product-buttons">
                          <div className="product-button">
                            <a
                              href="#/"
                              onClick={() => handleAddToCartClick(movie)}
                            >
                              <CiShoppingCart className="product-button-icona" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {isProductCard2ndVisible && selectedMovie && (
              <div className="product-card_2nd">
                <IoMdCloseCircle
                  className="icon_product2nd"
                  onClick={handleProductCard2ndClose}
                />
                <div className="product-card2nd-item">
                  <div className="product-card2nd-video">
                    <ReactPlayer
                      autoPlay={true}
                      playing={true}
                      loop={true}
                      width="100%"
                      height="100%"
                      volume={0.5}
                      muted={isMuted}
                      url={selectedMovie.link_film}
                      className="videoIntro"
                    />
                    {isMuted ? (
                      <VscMute
                        className="btnVolume"
                        onClick={() => setIsMuted((prev) => !prev)}
                      />
                    ) : (
                      <VscUnmute
                        className="btnVolume"
                        onClick={() => setIsMuted((prev) => !prev)}
                      />
                    )}
                  </div>
                  <div className="product-card2nd-info">
                    <h2>{selectedMovie.title || selectedMovie.name}</h2>
                    <span>{truncateOverview(selectedMovie.overview)}</span>
                    <span>Thể loại: {selectedMovie.type}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ContainerStyle>
  );
}
const ContainerStyle = styled.div`
  .mx-auto {
    padding-top: 0px !important;
  }

  .selec {
    margin-left: 10px;
    color: #5ba503;
    text-align: center;
    width: 200px;
    padding: 5px 2px;
    border-radius: 10px;
  }

  .product-button a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-card-body {
    padding: 0 10px;
  }

  .product-button-icona {
    z-index: 999;
    position: absolute;
    width: 3rem;
    height: 3rem;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .product-card2nd-item {
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
    .product-card2nd-video {
      width: 90%;
      height: 600px;
      .videoIntro {
        width: 100%;
      }
    }
    .product-card2nd-info {
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
  .product-meta {
    font-size: 12px;
    line-height: 20px;
    margin-top: 0;
    margin-bottom: 1rem;
    height: 100px;
  }

  .product-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .product-card_2nd {
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
    .icon_product2nd {
      position: absolute;
      font-size: 30px;
      color: #fff;
      margin-top: 10px;
      top: 0;
      right: 10px;
      cursor: pointer;
    }
  }

  body {
    margin-top: 20px;
    background: #eee;
  }

  .Heading {
    margin: 30px 0 10px 0;
    h1 {
      text-align: center;
      font-size: 24px;
      padding: 10px;
    }
  }

  .mb-30 {
    margin-bottom: 30px;
  }

  .product-card {
    position: relative;
    max-width: 380px;
    height: 100%;
    padding-bottom: 43px;
    transition: all 0.35s;
    border: 1px solid #e7e7e7;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .product-card .product-thumb {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 20px;
  }
  .product-price {
    display: block;
  }
  .product-card .product-thumb > img {
    display: block;
    width: 100%;
    height: 90%;
    border-radius: 10px;
  }
`;

export default ContainerMain;
