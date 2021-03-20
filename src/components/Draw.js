import { useState } from "react";
import api from "../utils/Endpoints";
import DrawParticipants from "./DrawParticipants";
import PropTypes from "prop-types";
import { MDBTypography as Type } from "mdbreact";

function Draw({ data, getWinners, winnersDrawn }) {
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [participantsList, setParticipantsList] = useState({});
  const [inputToken, setInputToken] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenAttempt, setTokenAttempt] = useState(0);

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
        setTokenAttempt(0);
      })
      .catch(err => {
        err = { ...err };
        setIsValidToken(false);
        setToken("");
        setParticipantsList({});
        if (tokenAttempt + 1 === 3) {
          setErrorMessage("Maximum token attempts exceeded.");
        } else {
          setErrorMessage(err.response.data.error);
        }
        setTokenAttempt(tokenAttempt + 1);
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
          <Type tag="h3" variant="h5-responsive" className="text-uppercase mb-4">
            <b>Admin/Mod section</b>
          </Type>
          <label htmlFor="token">Draw token</label>
          <input
            id="token"
            type="password"
            className="form-control"
            value={inputToken}
            name="token"
            onChange={handleChange}
            disabled={isValidToken || tokenAttempt === 3}
            required
          />
          {errorMessage && <small className="text-danger">{errorMessage}</small>}
        </div>
        <button type="submit" className="btn btn-indigo ml-0" disabled={isValidToken || tokenAttempt === 3}>
          {loading ? <div className="spinner-border" role="status" /> : "Submit"}
        </button>
      </form>
      {isValidToken && (
        <DrawParticipants
          data={data}
          participants={participantsList}
          token={token}
          getWinners={getWinners}
          winnersDrawn={winnersDrawn}
        />
      )}
    </>
  );
}

Draw.propTypes = {
  data: PropTypes.object.isRequired,
  getWinners: PropTypes.func.isRequired,
  winnersDrawn: PropTypes.bool.isRequired,
};

export default Draw;
