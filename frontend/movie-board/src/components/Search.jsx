import React, { useContext } from "react";
import ContextPage from "../ContextPage";

export default function Search() {
  const { setPage, setSearch, setResultsType } = useContext(ContextPage);

  const searchMovies = () => {
    let searchQuery = document.getElementById("searchQuery").value.trim();
    document.getElementById("searchQuery").value = "";
    var inputRegex = /^[0-9a-zA-Z!?$&*()'+-., ]+$/;

    if (inputRegex.test(searchQuery)) {
      if (searchQuery) {
        setResultsType("search");
        setSearch(searchQuery);
        setPage(1);
      }
    } else {
      alert("Please use allowed characters such as A-Z a-z 0-9 !?$&*()'+-.,");
    }
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="container sticky-top p-4 pt-5 col-8 col-sm-6 col-md-6 col-lg-6 col-xl-4">
      <div className="row justify-content-center">
        <div
          className="col-8 col-sm-9 col-md-7 col-lg-7 col-xl-7 col-xxl-7"
          style={{
            paddingRight:
              window.innerHeight < window.innerWidth ? "10px" : "0px",
            paddingLeft:
              window.innerHeight < window.innerWidth ? "20px" : "0px",
          }}
        >
          <input
            type="text"
            className="form-control"
            id="searchQuery"
            placeholder="Find your movie"
            onKeyDown={(e) => {
              handleEnter(e);
            }}
          ></input>
        </div>
        <div className="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              searchMovies();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
