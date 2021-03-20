import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/Endpoints";
import { MDBListGroup as ListGroup, MDBListGroupItem as ListGroupItem } from "mdbreact";

function EntryForm({ data, getData }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [outsideTime, setOutsideTime] = useState(true);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const update = setTimeout(() => {
      let current = new Date();
      setOutsideTime(current > new Date(data.end) || current < new Date(data.start));
      if (current > new Date(data.end)) {
        setLabel("This giveaway has ended");
      } else if (current < new Date(data.start)) {
        setLabel("This giveaway has not started yet");
      } else {
        setLabel("Discord username");
      }
    }, 3000);
    return () => clearTimeout(update);
  }, []);

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleReset() {
    setUsername("");
    setErrorMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (username.match(/.+#\d{4}/gi)) {
      let body = { username, giveaway: data.id };
      setLoading(true);
      api.data
        .participant(body)
        .then(res => {
          handleReset();
          getData();
          setErrorMessage("");
          setSuccessMessage("Your entry has been received.");
        })
        .catch(err => {
          err = { ...err };
          err = err.response.data;
          if (
            err?.non_field_errors?.length === 1 &&
            err.non_field_errors[0] === "The fields username, giveaway must make a unique set."
          ) {
            setErrorMessage("You have already entered this giveaway");
            setSuccessMessage("");
          } else {
            console.error(err);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setErrorMessage("Invalid Discord username, must follow the format: John#1234");
    }
  }

  return (
    <>
      <form className="border p-4 form my-4" onSubmit={handleSubmit}>
        <div className="pb-3">
          <label htmlFor="username" className="justify-content-start">
            {label}
          </label>
          <input
            id="username"
            type="text"
            className="form-control w-75"
            value={username}
            name="username"
            onChange={handleChange}
            disabled={loading || outsideTime}
            required
          />
          {!!successMessage ? <small className="text-success">{successMessage}</small> : null}
          {!!errorMessage ? <small className="text-danger">{errorMessage}</small> : null}
        </div>
        <button type="submit" className="btn btn-indigo ml-0" disabled={loading || outsideTime}>
          {loading ? <div className="spinner-border" role="status" /> : "Enter"}
        </button>
        <ListGroup className="mt-4">
          <ListGroupItem>
            {data.participants} participant{data.participants === 1 ? null : "s"}
          </ListGroupItem>
        </ListGroup>
      </form>
    </>
  );
}

EntryForm.propTypes = {
  data: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
};

export default EntryForm;
