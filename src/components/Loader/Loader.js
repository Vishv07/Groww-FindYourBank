import React from "react";

const Loader = (props) => {
  return (
    <div>
      {props.isloading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "60vh",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <div className="loader center">
            <i
              className="fa fa-spinner fa-spin fa-2x"
              style={{ color: "#00FFC4" }}
            />
          </div>
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default Loader;
