import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import styled from 'styled-components';

export default function Slider() {
  return (
    <Sliderrrr style={{ marginTop: '70px' }}>
      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselItem itemId={1}>
          <img
            src="https://bancaydep.com/wp-content/uploads/banner-bancaydep.jpg"
            className="d-block w-100 "
            alt="..."
            style={{ height: '500px' }}
          />
          <MDBCarouselCaption></MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img
            src="https://bonsaivietnam.com.vn/storage/slider/slider.png"
            className="d-block w-100"
            alt="..."
          />
          <MDBCarouselCaption></MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img
            src="https://webcaycanh.com/wp-content/uploads/2017/03/banner-web-cay-canh-1-840x400.jpg"
            className="d-block w-100"
            alt="..."
          />
          <MDBCarouselCaption></MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </Sliderrrr>
  );
}

const Sliderrrr = styled.div`
  .carousel-indicators li {
    background-color: #5ba503;
  }

  .carousel-control-next-icon {
    background-color: #5ba503;
    padding: 10px;
    border-radius: 10px;
    height: 50px;
    width: 50px;
  }
  .carousel-control-prev-icon {
    background-color: #5ba503;
    padding: 10px;
    border-radius: 10px;
    height: 50px;
    width: 50px;
    opacity: 1;
  }

  .w-100 {
    height: 400px !important;
  }

  .w-100 {
    height: 400px !important;
    border-radius: 10px !important;
    box-shadow:
      0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
  }

  .carousel-item {
    padding: 10px;
  }
`;
