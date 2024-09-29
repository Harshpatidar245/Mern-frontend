import React, { useState } from "react";
// import "./Pages.css";
import './CSS/Home.css'
import Carousel from "react-bootstrap/Carousel";
import SliderImage from "../Images/Slider-image-1.jpg";
import SliderImage2 from "../Images/Slider-image-2.jpg";
import SliderImage3 from "../Images/Slider-image-3.jpg";
import data_product from "../Components/Assets/data";
import new_collection from "../Components/Assets/new_collections";
import exclusive_image from "../Components/Assets/exclusive_image.png";
import { Link } from "react-router-dom";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      {/* this is the code for the slider */}

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="slider_image d-block w-100"
            src={SliderImage}
            alt="First slide"
            style={{ height: "36rem", width: "auto", padding: "15px" }}
          />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="slider_image d-block w-100"
            src={SliderImage2}
            alt="Second slide"
            style={{ height: "36rem", width: "auto", padding: "15px" }}
          />
          <Carousel.Caption>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="slider_image d-block w-100"
            src={SliderImage3}
            alt="Third slide"
            style={{ height: "36rem", width: "auto", padding: "15px" }}
          />
          <Carousel.Caption>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Popular in Women */}
      <h1 className="latest-trends">POPULAR IN WOMEN</h1>
      <div className="product-blocks">
        {data_product.map((product) => (
          <div key={product.id} className="product-block">
            <Link to={`product/${product.id}`} className="product-image-container" >
              <img src={product.image} alt="New Collection" className="product-image"/>
            </Link>
            <p className="product-name">{product.name}</p>
            <div className="item-prices">
              <div className="item-price-new">₹{product.new_price}</div>
              <div className="item-price-old">₹{product.old_price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Offers Section */}
      <div className="offers">
        <div className="offers-left">
          <h1>Exclusive</h1>
          <h1>Offers For You</h1>
          <p>ONLY ON BEST SELLERS PRODUCTS</p>
          <button>Check Now</button>
        </div>
        <div className="offers-right">
          <img src={exclusive_image} alt="" className="offer-girl-image" />
        </div>
      </div>

      {/* New Collections Section */}
      <div className="new-collections">
      <h1 className="collection_title">NEW COLLECTIONS</h1>
      <div className="product-blocks">
        {new_collection.map((product, i) => (
          <div key={i} className="product-block">
            <Link to={`product/${product.id}`} className="product-image-container">
              <img src={product.image} alt="New Collection" className="product-image" />
            </Link>
            <p className="product-name">{product.name}</p>
            <div className="item-prices">
              <div className="item-price-new">₹{product.new_price}</div>
              <div className="item-price-old">₹{product.old_price}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ControlledCarousel;
