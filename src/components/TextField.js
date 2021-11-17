import * as React from "react";
import './TextField.css';

export function TextField(props) {

  return (
    <div className="textField">
        <input className="textfieldComp" placeholder={props.placeholder} onChange={props.onChange} type="text" id={props.id} name={props.name} />
    </div>
  );
}
