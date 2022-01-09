import React, { useState } from "react";

export const Context = React.createContext();

const Provider = (props) => {
  const [banks, setBanks] = useState([]);

  const update = (data) => {
    setBanks(data);
  };
  return (
    <Context.Provider
      value={{
        banks,
        updateBanks: (data) => update(data),
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
