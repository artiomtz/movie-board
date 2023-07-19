import React, { useContext } from "react";
import ContextPage from "../ContextPage";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import providerNotFound from "../assets/providerNotFound.jpg";
import { motion } from "framer-motion";
import { Oval } from "react-loader-spinner";

export default function Stream(props) {
  const { providers, getMovieProviders, isLoading, setIsLoading } =
    useContext(ContextPage);

  const iconStyle = {
    height: "30px",
    width: "30px",
    borderRadius: "5px",
  };

  const loadProviders = () => {
    setIsLoading(true);
    getMovieProviders(props.movieId);
  };

  return (
    <DropdownButton
      variant="dark"
      menuVariant="dark"
      title={"Stream "}
      className="row pb-1"
      onClick={() => {
        loadProviders();
      }}
    >
      {isLoading ? (
        <div className="row p-4 text-center" style={{ alignItems: "center" }}>
          <Oval
            height={80}
            width={80}
            color="gray"
            wrapperStyle={{}}
            secondaryColor="light-gray"
            strokeWidth={7}
            strokeWidthSecondary={7}
            style={{ alignItems: "center" }}
          />
        </div>
      ) : providers.length > 0 ? (
        providers.map((provider) => (
          <motion.div
            key={provider.source_id}
            layout
            initial={{ x: "0%", y: "0%", opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1], scale: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Dropdown.Item
              href={provider.web_url}
              target="_blank"
              rel="external"
            >
              <div className="row">
                <div className="col-2">
                  <img
                    style={iconStyle}
                    src={provider.format ? provider.format : providerNotFound}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = providerNotFound;
                    }}
                  />
                </div>
                <div className="col-10">
                  <span className="p-2">{provider.name}</span>
                </div>
              </div>
            </Dropdown.Item>
          </motion.div>
        ))
      ) : (
        <div className="row justify-content-center">Nothing Available :(</div>
      )}
    </DropdownButton>
  );
}
