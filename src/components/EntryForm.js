import { useState } from "react";
import { MDBInput as Input } from "mdbreact";
import PropTypes from "prop-types";
import api from "../utils/Endpoints";

function EntryForm({ data, getData }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleReset() {
    setUsername("");
    setErrorMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let body = { username, giveaway: data.id };
    api.data
      .participant(body)
      .then(res => {
        handleReset();
        getData();
      })
      .catch(err => {
        err = { ...err };
        err = err.response.data;
        if (
          err?.non_field_errors &&
          err.non_field_errors[0] === "The fields username, giveaway must make a unique" + " set."
        ) {
          setErrorMessage("You have already entered this giveaway");
        } else {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <form className="form form-inline needs-validation" onSubmit={handleSubmit}>
        <Input type="text" label="Discord username" value={username} name="username" onChange={handleChange} required />
        <button type="submit" className="btn btn-indigo" disabled={loading}>
          {loading ? <div className="spinner-border" role="status" /> : "Enter"}
        </button>
      </form>
      {!!errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
    </>
  );
}

EntryForm.propTypes = {
  data: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
};

export default EntryForm;
