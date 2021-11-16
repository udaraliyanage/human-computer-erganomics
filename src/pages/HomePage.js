import assets from "../common/assets";
import "./HomePage.css";
import { Button } from "../components/Button";
import Webcam from "react-webcam";
import React from "react";
import { LightBox } from "../components/LightBox";
import axios from "axios";

export function HomePage() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);
  const [showLightBox, setShowLightbox] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState("");
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const setshowLightboxWebcam = () => {
    setShowLightbox(!showLightBox);
  };
  const recapture = () => {
    setCapturedImage("");
  };
  const submitCapturedImage = async () => {
    const response = await axios.post('http://localhost:8080/api/ergonomics/index', capturedImage);
    console.log("adheesh",response );
  }

  return (
    <div>
      <div className="row">
        <img src={assets.bannerImage} alt="asd" className="bannerImage" />
        <div className="bannerCaption">
          <div className="captionHeading">Human Computer Ergonomics</div>
          <p className="captionDescription">
            Innovating how we work. <br />
            Analyse Your Posture By Clicking Below Button
          </p>
          <div className="webCamBtn">
            <Button btnText={"OPEN WEBCAM"} onClick={setshowLightboxWebcam} />
          </div>
        </div>
      </div>
      {showLightBox && (
        <LightBox width="1280px" onClickClose={setshowLightboxWebcam}>
          {!capturedImage && (
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1100}
              videoConstraints={videoConstraints}
            />
          )}
          {capturedImage && (
            <div>
              <div className="capturedImageDiv">
                <img src={capturedImage} alt="asd" className="capturedImage" />{" "}
              </div>

              <div className="retakeButtonDiv">
                <Button
                  btnText={"RECAPTURE"}
                  tranparent={true}
                  onClick={recapture}
                />
              </div>
            </div>
          )}
          <div className="captureBtnDiv">
            <Button btnText={capturedImage ? "SUBMIT" : "CAPTURE"} solid={true} onClick={capturedImage ? submitCapturedImage : capture} />
          </div>
        </LightBox>
      )}
      <div></div>
    </div>
  );
}
