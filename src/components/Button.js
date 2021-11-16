import "./Button.css";
import classnames from "classnames";

export const Button = (props) => {
  return (
    <div
      className={classnames(
        props.solid ? "btnSolidBackground" : "btnComponent",
        props.tranparent && "transparentBtn"
      )}
      onClick={props.onClick}
    >
      {props.btnText}
    </div>
  );
};
