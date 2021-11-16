import * as React from "react";
import './LightBox.css';
import assets from '../common/assets';

export function LightBox(props) {
  const { children, onClickClose, width } = props;
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (window && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <div className={"modalWrapper"} ref={modalRef}>
      <section className={"modalMain"} style={{ width: width ?? "auto" }}>
        <em onClick={onClickClose} className={"cancelIcon"}><img src={assets.closeIcon} className="closeImg" alt="asd"/></em>
        {children}
      </section>
    </div>
  );
}
