import React from "react";

function ControlledInput(props) {
  const [value, setValue] = React.useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <input
        style={{
          padding: "5px",
          color: "black",
          width: "100%",
          height: "100%",
        }}
        type="number"
        placeholder={props.placeholder}
        value={value}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
        }
        onChange={(e) => {
          let code = e.target.value.charCodeAt(0);
          if (e.target.value === "") {
            setValue("");
            return;
          }
          if (code >= 49 && code <= 57) {
            if (e.target.value <= props.max && e.target.value >= props.min) {
              setValue(e.target.value);
              props.onChange(e.target.value);
            } else {
              e.preventDefault();
            }
          }
        }}
      ></input>
    </div>
  );
}
ControlledInput.defaultProps = {
  placeholder: "Number...",
  min: "1",
  max: "100",
  disabled: false,
  onChange: (value) => console.log(value),
};

export default ControlledInput;
