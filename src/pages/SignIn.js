import assets from '../common/assets';
import './SignIn.css';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Link } from "react-router-dom";
export function SignIn() {
return(
<div>
<div className="row">
        <img src={assets.bannerImage} alt="asd" className="bannerImage" />
        <div className="bannerCaptionSignIn">
              <div className="signinInputWrapper">
                  <div className="labelSignIn">
                  Email Address
                  </div>
              <TextField  name="email-address"/>
              </div>
              <div className="signinInputWrapper">
                  <div className="labelSignIn">
                  Password
                  </div>
              <TextField  name="email-address"/>
              </div>
          <div className="signInBtn">
            <Button btnText={"Sign In"}  />
          </div>
          <div className="continueAsGuest">
          <Link  to="/oursolution">
                Continue As Guest
              </Link>
          </div>
        </div>
      </div>
</div>
)
}