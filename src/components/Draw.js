import { useState } from "react";
import api from "../utils/Endpoints";
import DrawParticipants from "./DrawParticipants";
import PropTypes from "prop-types";

function Draw({ data, getWinners }) {
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [participantsList, setParticipantsList] = useState({});
  const [inputToken, setInputToken] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let body = { token: inputToken };
    setLoading(true);
    api.data
      .getDraw(body)
      .then(res => {
        setParticipantsList(res.data.participantsList);
        setIsValidToken(res.data.isValidToken);
        setToken(inputToken);
      })
      .catch(err => {
        err = { ...err };
        setIsValidToken(false);
        setToken("");
        setParticipantsList({});
        setErrorMessage(err.response.data.error);
      })
      .finally(() => {
        setInputToken("");
        setLoading(false);
      });
  }

  function handleChange(e) {
    setInputToken(e.target.value);
  }

  return (
    <>
      <form className="border p-4 my-4 form" onSubmit={handleSubmit}>
        <div className="pb-3">
          <label htmlFor="token">Draw token</label>
          <input
            id="token"
            type="password"
            className="form-control"
            value={inputToken}
            name="token"
            onChange={handleChange}
            disabled={isValidToken}
            required
          />
          {errorMessage && <small className="text-danger">{errorMessage}</small>}
        </div>
        <button type="submit" className="btn btn-indigo ml-0" disabled={isValidToken}>
          {loading ? <div className="spinner-border" role="status" /> : "Submit"}
        </button>
      </form>
      {isValidToken && (
        <DrawParticipants data={data} participants={participantsList} token={token} getWinners={getWinners} />
      )}
    </>
  );
}

Draw.propTypes = {
  data: PropTypes.object.isRequired,
  getWinners: PropTypes.func.isRequired,
};

export default Draw;
