import React, { useEffect, useRef } from "react";
import "../styles/Modal.css";
import { BsPlusLg, BsPlayFill, BsHandThumbsUp } from "react-icons/bs";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";
const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, currentContent } = props;
  // console.log(currentContent);
  const [check, setCheck] = useState([]);

  const videoRef = useRef();

  useEffect(() => {
    open
      ? (document.body.style = `overflow: hidden`)
      : (document.body.style = `overflow: scroll`);
  }, [open]);
  // console.log(currentContent.contentId);

  // useEffect(() => {
  //   console.log(currentContent.contentId);
  //   const getsubContet = async () => {
  //     const data = await axios({
  //       url: `${BACKEND_URL}/subcontent`,
  //       method: "POST",
  //       data: {
  //         contentNum: currentContent.contentId,
  //       },
  //     });

  //     console.log(data.data);
  //   };
  //   getsubContet();
  // }, [currentContent]);

  const like = async () => {
    // 찜 추가/삭제
    const data = await axios({
      url: `${BACKEND_URL}/browse/my-list`,
      method: "POST",
      params: {
        useremail: sessionStorage.getItem("email"),
        contentId: currentContent.id,
      },
    });
  };
  // 유저가 찜한 컨텐츠 true/false 값 조회
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        url: `${BACKEND_URL}/browse/my-list/check`,
        method: "GET",
        params: {
          useremail: sessionStorage.getItem("email"),
        },
      });
      setCheck(data.data);
    };
    getData();
  }, []);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? "openModal modal" : "modal"}
      ref={videoRef}
      onClick={(e) => {
        if (videoRef.current === e.target) {
          close();
        }
      }}
    >
      {open ? (
        <div className="modal_wrap_box">
          <div className="modal_wrap">
            <div className="modal_video_box">
              <div className="modal_close">
                <button className="close" onClick={close}>
                  &times;
                </button>
              </div>
              {currentContent.contentVideo ? (
                <video
                  className="video"
                  src={currentContent?.contentVideo}
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: "25px 25px 0 0",
                    boxShadow: "0px 50px 100px black inset",
                  }}
                  // loop
                  autoPlay="autoPlay"
                  muted="muted"
                ></video>
              ) : (
                <img
                  src={currentContent?.detailImg}
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: "25px 25px 0 0",
                    boxShadow: "0px 50px 100px black inset",
                  }}
                ></img>
              )}
              <div className="play_title">
                <div className="img_box">
                  <img src={currentContent?.detailTextImg} alt="수리남" />
                </div>
                <div className="play_progress flex flex_ai_c">
                  <div className="video_progress"></div>
                  <div className="video_progress_text">총 62분 중 0분</div>
                </div>
                <div className="video_button_controller flex flex_jc_sb">
                  {/* <div className="play_btn">재생</div> */}
                  <a className="play flex" href="/">
                    <div className="play_icon flex flex_jc_c flex_ai_c">
                      <BsPlayFill
                        style={{
                          fontSize: "35px",
                          position: "absolute",
                          color: "black",
                        }}
                      />
                    </div>
                    <div className="play_text flex flex_jc_c flex_ai_c">
                      재생
                    </div>
                  </a>

                  <button className="steam" onClick={like}>
                    {check[currentContent.id].likeStatus ? (
                      <AiOutlineCheck
                        style={{
                          color: "white",
                          fontSize: "20px",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          position: "absolute",
                        }}
                      />
                    ) : (
                      <BsPlusLg
                        style={{
                          fontSize: "20px",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          position: "absolute",
                          color: "white",
                        }}
                      />
                    )}
                  </button>
                  <a className="evaluation flex flex_jc_c flex_ai_c" href="/">
                    <BsHandThumbsUp
                      style={{
                        fontSize: "20px",
                        // top: "50%",
                        // left: "50%",
                        // transform: "translate(-50%, -50%)",
                        position: "absolute",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="detail_modal_container flex">
              <div className="pirview_detail_box">
                <div className="pirview_detail flex flex_jc_start">
                  <div className="open_date">{currentContent?.date}</div>
                  <div className="view_age">
                    {currentContent?.age}
                    <img src="" alt="" />
                  </div>
                  <div className="episode">
                    에피소드 {currentContent?.episodes}개
                  </div>
                  <div className="HD">HD</div>
                </div>
                <div className="episode_detail">
                  <div className="episode_title">"1화"</div>
                  <div className="episode_content">
                    {currentContent?.mainStory}
                  </div>
                </div>
              </div>
              <div className="cast_box">
                <div className="cast">
                  <span className="appearance">출연:</span>
                  {currentContent?.actor}
                </div>
                <div className="genre">
                  <span className="genre_title">장르:</span> 범죄, 스릴러, 한국
                  드라마,(아직 안함)
                </div>
                <div className="series">
                  <span className="series_title">시리즈:</span> 긴장감
                  넘치는(아직 안함)
                </div>
              </div>
            </div>

            <div className="episode_video_wrap">
              <div className="episode_video_text flex flex_jc_sb">
                <h2>회차</h2>
                <h2>{currentContent?.contentName}</h2>
              </div>
              {currentContent.detailDtos.map((detail, index) => {
                return (
                  <div className="video_item flex" key={index}>
                    <h2 className="video_number flex flex_ai_c flex_jc_c">
                      {index + 1}
                    </h2>

                    <div className="video_img flex flex_ai_c flex_jc_c">
                      <div className="img_box">
                        <img src={detail.subImg} alt="" />
                      </div>
                    </div>

                    <div className="modal_video_text_wrap">
                      <div className="text1 flex flex_jc_sb">
                        <h4 className="video_title">
                          {detail.detailEpisode}화
                        </h4>
                        <h4 className="video_time">{detail.playtime}분</h4>
                      </div>
                      <div className="text2">{detail.subStory}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
