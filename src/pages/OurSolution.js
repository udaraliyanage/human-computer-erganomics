import assets from "../common/assets";
import "./OurSolution.css";
import { Button } from "../components/Button";
import Webcam from "react-webcam";
import React from "react";
import { LightBox } from "../components/LightBox";
import axios from "axios";

export function OurSolution() {
  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: "user",
  // };

  const webcamRef = React.useRef(null);
  const [showLightBox, setShowLightbox] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState("");
  const [analysedResponse, setAnalysedResponse] = React.useState(undefined);
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
    console.log("###", capturedImage);
    const response = await axios.post(
      "http://localhost:8080/api/ergonomics/index",
      {
        image: capturedImage,
      }
    );
    console.log("###Response###", response);
    setAnalysedResponse(response.data);
  };

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
        <LightBox width="82%" onClickClose={setshowLightboxWebcam}>
          <div className="row">
            <div className="col-md-6">
              <div className="camSettingWrapper">
                {!capturedImage && analysedResponse == undefined && (
                  <div>
                    <form>
                      <div>
                        <input
                          type="checkbox"
                          id="settings1"
                          name="settings1"
                          value="Bike"
                        />
                        <label for="settings1">Screen Setting</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="settings2"
                          name="settings2"
                          value="Bike"
                        />
                        <label for="settings2">Camera Turned On</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="settings3"
                          name="settings3"
                          value="Bike"
                        />
                        <label for="settings3">Human Position Detected</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="settings4"
                          name="settings4"
                          value="Bike"
                        />
                        <label for="settings4">Lightning Checking</label>
                      </div>
                      <div className="resetTuneDiv">
                        <Button btnText={"Reset Tuning"} />
                      </div>
                    </form>

                    <div className="screenSettingsWrapper">
                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">
                            Screen Diagnol
                          </div>
                          <div className="screenSettingValue">13 inc</div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">
                            Display Resolution
                          </div>
                          <div className="screenSettingValue">
                            1920 * 1080(Full HD)
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">Screen Width</div>
                          <div className="screenSettingValue">
                            11.3" (28.8 cm)
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">
                            Screen Height
                          </div>
                          <div className="screenSettingValue">
                            6.4" (16.2 cm)
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">Aspect Ratio</div>
                          <div className="screenSettingValue">
                            1.78:1 (16:9)
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">Brightness</div>
                          <div className="screenSettingValue">
                            <input
                              type="range"
                              class="form-range"
                              id="customRange1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {analysedResponse && (
                  <div>
                    <div>
                      <div className="screenSettingsDiv">
                        <div className="screenSettingLabel">Screen Diagnol</div>
                        <div className="screenSettingValue">1.78:1 (16:9)</div>
                      </div>
                    </div>
                    <div>
                      <div className="screenSettingsDiv">
                        <div className="screenSettingLabel">
                          Display Resolution
                        </div>
                        <div className="screenSettingValue">
                          1920 * 1080 (Full HD)
                        </div>
                      </div>
                    </div>

                    <div className="resultsDiv">
                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabelResults boldFont">
                            <span>
                              <img
                                src={assets.warningRed}
                                className="expressionIcon"
                                alt="asd"
                              />
                            </span>
                            Minimum Distance
                          </div>
                          <div className="screenSettingValue redFont">
                            {analysedResponse.Details.MinDistance}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabelResults boldFont">
                            <span>
                              <img
                                src={assets.warningYello}
                                className="expressionIcon"
                                alt="asd"
                              />
                            </span>
                            Maximum Distance
                          </div>
                          <div className="screenSettingLabelResults yellowFont">
                            {analysedResponse.Details.MaxDistance}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabelResults boldFont">
                            <span>
                              <img
                                src={assets.tick}
                                className="expressionIcon"
                                alt="asd"
                              />
                            </span>
                            Visual Acuity distance
                          </div>
                          <div className="screenSettingValue greenFont">
                            {analysedResponse.Details.VisualAcuityDistance}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabelResults boldFont blueFont">
                            <span>
                              <img
                                src={assets.info}
                                className="expressionIcon"
                                alt="asd"
                              />
                            </span>
                            Ergonomic Distance Score
                          </div>
                          <div className="screenSettingValue blueFont">
                            0.62m
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="finaleResultsDiv">
                      Result: <span className="resultsSpan">Acceptable</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              {!capturedImage && analysedResponse == undefined && (
                <div>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={1}
                    // videoConstraints={videoConstraints}
                  />

                  <div className="captureBtnDiv">
                    <Button
                      btnText={"Capture"}
                      solid={true}
                      onClick={capture}
                    />

                    <Button btnText={"Stop Webcam"} />
                  </div>
                </div>
              )}

              {capturedImage && analysedResponse == undefined && (
                <div>
                  <div className="capturedImageDiv">
                    <img
                      src={capturedImage}
                      alt="asd"
                      className="capturedImage"
                    />
                  </div>

                  <div className="captureBtnDiv">
                    <Button
                      btnText={"Analyse the Posture"}
                      solid={true}
                      onClick={submitCapturedImage}
                    />

                    <Button btnText={"Stop Webcam"} onClick={recapture} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* {analysedResponse && <div className="resultDiv">
            {analysedResponse.score + analysedResponse.message}
          </div>}  */}
        </LightBox>
      )}
    </div>
  );
}
