import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

export default function Slider() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1}>
        <img
          src="https://bancaydep.com/wp-content/uploads/banner-bancaydep.jpg"
          className="d-block w-100"
          alt="..."
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
  );
}
