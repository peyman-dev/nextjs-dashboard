import React from "react";

export function getServerSideProps(context) {

  return {
    props: {
      // props for your component
    },
  };
}

const AuthenticationProvider = ({ children }) => {
  return <>{children}</>;
};

export default AuthenticationProvider;
