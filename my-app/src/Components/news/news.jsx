import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./news.css";

const News = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const newsArticles = [
    {
      title: "At 100% two students from the same Mississauga school have perfect grades",
      link: "https://www.insauga.com/at-100-two-students-from-the-same-mississauga-school-have-perfect-grades/",
      description: "Listed for perfect high school average.",
      image: "insauga.png" // Path from the public folder
    },
    {
      title: "Two Mississauga Students Earn Perfect Scores at St. Francis Xavier Catholic School",
      link: "https://weeklyvoice.com/two-mississauga-students-earn-perfect-scores-at-st-francis-xavier-catholic-school/?utm_source=dlvr.it&utm_medium=twitter",
      description: "Listed for perfect high school average.",
      image: "voice.png" // Path from the public folder
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false // Disable arrows
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Trigger re-render on resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="news-section">
      <h2 className="news-title">Achievements</h2>
      <Slider key={windowWidth} {...settings}>
        {newsArticles.map((article, index) => (
          <div key={index} className="news-slide">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
              <img src={article.image} alt={article.title} className="news-image" />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default News;
