import assets from "../common/assets";
import "./OurSolution.css";
import { Button } from "../components/Button";
import Webcam from "react-webcam";
import React from "react";
import { LightBox } from "../components/LightBox";
import axios from "axios";
import { TextField } from "../components/TextField";

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
  const [goNext, setGoNext] = React.useState(false);
  const [screenSettings, setScreenSetting] = React.useState({});
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

  const screenSettingOnchangeHandler = (event) => {
    // console.log("adheesh", event.target.value)
    const value= event.target.value;
    setScreenSetting({...screenSettings, [event.target.name]: value})
    console.log("adheesh screenSettings", screenSettings);
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
        <LightBox
          width={goNext ? "82%" : "65"}
          onClickClose={setshowLightboxWebcam}
        >
          {!goNext && (
            <div className="setUserSettingWrapper">
              <div className="laptopModel">
                Laptop Model: Inspiron I3 Laptop
              </div>

              <div className="laptopSettingsWrapper">
                <div className="laptopSettingsOuter">
                  <input
                    type="checkbox"
                    id="settings1"
                    name="settings1"
                    value="Bike"
                    className="checkBoxInput"
                  />
                  <label for="settings1">Screen Setting</label>
                </div>

                <div className="laptopSettingsOuter">
                  <input
                    type="checkbox"
                    id="settings1"
                    name="settings1"
                    value="Bike"
                    className="checkBoxInput"
                  />
                  <label for="settings1">Under Warranty</label>
                </div>
              </div>

              <div className="settingsInputWrapper">
                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Screen Size</div>
                    <div className="screenSettingInput">
                      <TextField name="screenSize" placeholder="Test Udara" onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Screen Width</div>
                    <div className="screenSettingInput">
                      <TextField name="screenWidth" onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Screen Height</div>
                    <div className="screenSettingInput">
                      <TextField name="screenHeight" onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Aspect Ratio</div>
                    <div className="screenSettingInput">
                      <TextField name="screenApRatio"  onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Display Resolution</div>
                    <div className="screenSettingInput">
                      <select className="resSelectDrop" name="disRes" id="cars" onChange={screenSettingOnchangeHandler} >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Brightness</div>
                    <div className="screenSettingInput">
                      <input
                        type="range"
                        class="form-range firstRange"
                        id="customRange1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="nextBtnDiv">
                <Button btnText="Next" onClick={() => setGoNext(true)} />
              </div>
            </div>
          )}
          {goNext && (
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
                  <div className="screenSettingValue">{screenSettings.screenSize}</div>
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
                            <div className="screenSettingLabel">
                              Screen Width
                            </div>
                            <div className="screenSettingValue">
                              {screenSettings.screenWidth}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="screenSettingsDiv">
                            <div className="screenSettingLabel">
                              Screen Height
                            </div>
                            <div className="screenSettingValue">
                              {screenSettings.screenHeight}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="screenSettingsDiv">
                            <div className="screenSettingLabel">
                              Aspect Ratio
                            </div>
                            <div className="screenSettingValue">
                              {screenSettings.screenApRatio}
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
                  {capturedImage && (
                    <div>
                      <div>
                        <div className="screenSettingsDiv">
                          <div className="screenSettingLabel">
                            Screen Diagnol
                          </div>
                          <div className="screenSettingValue">
                            1.78:1 (16:9)
                          </div>
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
                              {analysedResponse.ErgonomicsIndex}
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
          )}

          {/* {analysedResponse && <div className="resultDiv">
            {analysedResponse.score + analysedResponse.message}
          </div>}  */}
        </LightBox>
      )}
    </div>
  );
}
