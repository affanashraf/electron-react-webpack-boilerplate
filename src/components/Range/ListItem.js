import React, { useContext } from "react";
import "./ListItem.css";
import RangeContext from "../contexts/RangeContext";
import { v4 as uuidv4 } from "uuid";
function ListItem(props) {
  const { selectRange, unSelectRange, findSelectedRanges } = useContext(
    RangeContext
  );
  const [check, setCheck] = React.useState(props.selected);
  return (
    <div
      className={check ? "tick" : "range_list_item"}
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
      {`${props.start} to ${props.end}`}
    </div>
  );
}
ListItem.defaultProps = {
  selected: false,
  key: "",
};

export default ListItem;
