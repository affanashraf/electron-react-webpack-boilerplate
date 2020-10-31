import React, { useContext } from "react";
import "./ListItem.css";
import RangeContext from "../contexts/RangeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
// import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";

library.add(faCheckSquare, faSquare);

function ListItem(props) {
  const { selectRange, unSelectRange, findSelectedRanges } = useContext(
    RangeContext
  );
  const [check, setCheck] = React.useState(props.selected);
  return (
    <div
      className="range_list_item"
      onClick={() => {
        let flag = check;
        flag = !flag;
        setCheck(flag);

        if (flag) {
          selectRange(props.id);
        } else {
          unSelectRange(props.id);
        }
      }}
    >
      <FontAwesomeIcon icon={check ? "check-square" : "square"} />
      {`${props.start} to ${props.end}`}
    </div>
  );
}
ListItem.defaultProps = {
  selected: false,
  key: "",
};

export default ListItem;
