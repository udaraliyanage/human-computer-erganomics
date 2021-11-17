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
  const [analysedResponse, setAnalysedResponse] = React.useState(null);
  const [goNext, setGoNext] = React.useState(false);
  const [screenSettings, setScreenSetting] = React.useState({});
  const [hideCameraRow, setHideCameraRow] = React.useState(false);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    console.log("###", capturedImage);
    const response = await axios.post(
      "http://localhost:8080/api/ergonomics/index",
      {
        image: capturedImage,
      }
    );
    if(response){
      setHideCameraRow(true);
    }
    console.log("###Response###", response);
    setAnalysedResponse(response.data);
  }, [webcamRef]);

  const setshowLightboxWebcam = () => {
    setShowLightbox(!showLightBox);
  };
  const recapture = () => {
    setCapturedImage("");
  };
  // const submitCapturedImage = async () => {
    
  // };

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
      {console.log("adheesh hideCameraRow", hideCameraRow, goNext)}
      {showLightBox && (
        
        <LightBox
          width={goNext && hideCameraRow ==false ? "82%" : "55%"}
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
                    checked
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
                    checked
                  />
                  <label for="settings1">Under Warranty</label>
                </div>
              </div>

              <div className="settingsInputWrapper">
                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Screen Size</div>
                    <div className="screenSettingInput">
                      <TextField name="screenSize" placeholder="13" onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Screen Width</div>
                    <div className="screenSettingInput">
                      <TextField name="screenWidth"  placeholder="11.3"   onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Screen Height</div>
                    <div className="screenSettingInput">
                      <TextField name="screenHeight"  placeholder="6.4" onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Aspect Ratio</div>
                    <div className="screenSettingInput">
                      <TextField name="screenApRatio"  placeholder="1.78:1" onChange={screenSettingOnchangeHandler}/>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="screenSizeInputFieldWrap">
                    <div className="screenSettingLabel">Display Resolution</div>
                    <div className="screenSettingInput">
                      <select className="resSelectDrop" name="disRes" id="cars" onChange={screenSettingOnchangeHandler} >
                        <option value="1920*1080">1920*1080</option>
                        <option value="1920*1020">1920*1020</option>
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

          {goNext && !hideCameraRow && (
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
                            checked
                          />
                          <label for="settings1">Screen Setting</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="settings2"
                            name="settings2"
                            value="Bike"
                            checked
                          />
                          <label for="settings2">Camera Turned On</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="settings3"
                            name="settings3"
                            value="Bike"
                            checked
                          />
                          <label for="settings3">Human Position Detected</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="settings4"
                            name="settings4"
                            value="Bike"
                            checked
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
                            {screenSettings.screenSize}
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
                              {analysedResponse?.Details?.MinDistance} 
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
                              {analysedResponse?.Details?.MaxDistance}
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
                              {analysedResponse?.Details?.VisualAcuityDistance}
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
                              {analysedResponse?.ErgonomicsIndex}
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
                        btnText={"Analyse the Posture"}
                        solid={true}
                        onClick={capture}
                      />

                     
                    </div>
                  </div>
                )}

                {capturedImage  && (
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
                       
                      />

                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {hideCameraRow && <div className="scoreSummeryWrapper">
                <div className="scoreSumInnerWrap">
                  <div className="capturedUserImageSm">
                  <img src={capturedImage} className="capturedSmallImageUSer" alt="asd"/>
                  </div>
                  <div className="ergoScoreSumDiv">
                    <div className="sumErgoScoreTitle">
                      Your Ergonomic Distance Score:
                    </div>
                    <div className="sumErgoScore">
                      9.3
                    </div>
                    <div className="sumErgoScoreTitle">
                      Ergonomic Assessment Outcome:
                    </div>
                    <div className="sumErgoScore">
                      Good
                    </div>
                    <p className="scoreSumMessage">You are doing great<br /> Keep it up!</p>
                    <p className="scoreSumMessage">Check the detailed analysis report</p>
                    <div className="toDetailedAnalysisReport">
                      <Button btnText="Detailed Analysis Result" onClick={()=>setHideCameraRow(false)}/>
                    </div>
                  </div>
                </div>
          </div> }
        </LightBox>
      )}
    </div>
  );
}
