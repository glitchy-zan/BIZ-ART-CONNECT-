import React, { useState, useEffect } from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import { Footer, FooterFix } from "../customComponents/Footer";
import ArtistContainer from "../customComponents/ArtistContainer";
import Container6 from "../customComponents/Container6";
import plusSvg from "../svg/plus.svg";
import deleteSvg from "../svg/delete.svg";
import deleteWhiteSvg from "../svg/delete_white.svg";
import imageStyle from "../customStyle/ContainerStyle.module.css";
import Masonry from "react-masonry-css";

const TrendingPage = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://88.200.63.148:8199";

  useEffect(() => {
    fetchTrendingArtists();
  }, []);

  useEffect(() => {
    console.log(allArtists);
    fetchImages();
  }, [allArtists]);

  const fetchTrendingArtists = async () => {
    axios
      .get("/api/artist/trending/getAll")
      .then((res) => {
        if (res.data.error === false) {
          setAllArtists(res.data.artists);
        } else {
          setAllArtists([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchImages = async () => {
    axios
      .post("/image/getImages2", allArtists)
      .then((res) => {
        console.log(res);
        var temporary_imgs = [];
        for (let i = 0; i < res.data.length; i++) {
          var temp_imgs = [];
          for (let j = 0; j < res.data[i].length; j++) {
            for (let k = 0; k < res.data[i][j].length; k++) {
              temp_imgs.push(res.data[i][j][k]);
            }
          }
          temporary_imgs.push(temp_imgs);
        }
        setImages(temporary_imgs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
      <div className={imageStyle.NavigationContainer}>
        <ArtistNavigation />
      </div>
      <div className={imageStyle.MainContainer}>
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <h2>TRENDING ARTISTS</h2>
        </div>
        {allArtists.map((artist, index) => (
          <ArtistContainer>
            <p>{artist.pseudonym}</p>
            <p>{artist.art_type}</p>
            <p>{artist.genre}</p>
            <Masonry
              breakpointCols={4}
              className={imageStyle.MyMasonryGrid}
              columnClassName={imageStyle.MyMasonryGridColumn}
            >
              {Array.isArray(images[index]) &&
                images[index].map((image, index2) => (
                  <div className={imageStyle.GridItem} key={index2}>
                    <img
                      src={`${BASE_URL}${image.image_path}`}
                      alt={`${index2 + 1}`}
                    />
                  </div>
                ))}
            </Masonry>
          </ArtistContainer>
        ))}
        <Container6>
          <br />
          <br />
          <br />
          <br />
        </Container6>
      </div>
      <FooterFix />
    </>
  );
};

export default TrendingPage;
