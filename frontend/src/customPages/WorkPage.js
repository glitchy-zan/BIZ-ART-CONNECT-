import React, { useState, useEffect, useRef } from "react";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Container5 from "../customComponents/Container5";
import Container6 from "../customComponents/Container6";
import Container7 from "../customComponents/Container7";
import { Footer, FooterFix } from "../customComponents/Footer";
import paintBrushSvg from "../svg/paintbrush.svg";
import plusSvg from "../svg/plus.svg";
import deleteSvg from "../svg/delete.svg";
import deleteWhiteSvg from "../svg/delete_white.svg";
import imageStyle from "../customStyle/ContainerStyle.module.css";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";

const WorkPage = () => {
  const BASE_URL = "http://88.200.63.148:8199";

  const [work, setWork] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchWork = async () => {
    setLoading(true);
    const response = await axios.get("/api/workFetch");
    return response.data;
  };

  useEffect(() => {
    fetchWork().then((data) => {
      if (data.exists === false) {
        setWork([]);
      } else {
        let work_reverse = data.work.reverse();
        setWork(work_reverse);
      }
    });
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post("/image/getImages", work);
        if (Array.isArray(response.data)) {
          setImages(response.data);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLoading(false);
        } else {
          console.log("Unexpected response format");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, [work]);

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const createWorkSection = () => {
    navigate("/artist/portfolio/work/add");
  };

  const handleRemoveImage = (index, index2) => {
    axios
      .post("/image/deleteImage", images[index][index2])
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveWork = async (index) => {
    axios
      .post("/work/workDelete", work[index])
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e, index) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    let workId = work[index].id;
    formData.append("index", workId);
    try {
      const res = await axios.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      window.location.reload();
    } catch (err) {
      setMessage(err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Circles
          height="80"
          width="80"
          color="#333"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className={imageStyle.NavigationContainer}>
        <ArtistNavigation />
      </div>
      <div className={imageStyle.MainContainer}>
        <h1
          style={{
            margin: "80px 80px 20px 80px",
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          WORK
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container7 onClick={createWorkSection}>
            <img
              style={{ marginBottom: "-20px" }}
              src={plusSvg}
              alt=""
              width="30"
              height="30"
            />
            <p>Create new work section</p>
          </Container7>
        </div>
        <div>
          {work.map((item, index) => (
            <Container5 key={index}>
              <h3>{item.title}</h3>
              <hr />
              <p>{formatDateTime(item.creation_date)}</p>
              <hr />
              <img
                style={{ marginBottom: "-20px" }}
                src={paintBrushSvg}
                alt=""
                width="30"
                height="30"
              />
              <p>{item.medium}</p>
              <hr />
              <p>{item.description}</p>
              <hr />
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
                      <button
                        className={imageStyle.RemoveButton}
                        onClick={() => handleRemoveImage(index, index2)}
                      >
                        <img
                          src={deleteWhiteSvg}
                          alt=""
                          width="100"
                          height="100"
                        />
                      </button>
                    </div>
                  ))}
              </Masonry>
              <Container5>
                <h1>Upload Image</h1>
                {message && <p>{message}</p>}
                <form onSubmit={(e) => onSubmit(e, index)}>
                  <input type="file" name="image" onChange={onFileChange} />
                  <button type="submit">Upload</button>
                </form>
              </Container5>
              <img
                style={{ cursor: "pointer" }}
                src={deleteSvg}
                onClick={() => handleRemoveWork(index)}
                alt=""
                width="50"
                height="50"
              />
            </Container5>
          ))}
          <Container6>
            <br />
            <br />
            <br />
            <br />
          </Container6>
        </div>
      </div>
      <FooterFix />
    </>
  );
};

export default WorkPage;
