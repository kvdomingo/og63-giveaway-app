import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api, { auth } from "../utils/Endpoints";
import { MDBListGroup as ListGroup, MDBListGroupItem as ListGroupItem } from "mdbreact";

function EntryForm({ data, getData }) {
  const [authId, setAuthId] = useState("");
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [outsideTime, setOutsideTime] = useState(true);
  const [label, setLabel] = useState("");

  useEffect(() => {
    setAuthId(localStorage.getItem("SQUADID") || "");
    if (!authId) setLoading(false);
  }, []);

  useEffect(() => {
    const update = setTimeout(() => {
      let current = new Date();
      setOutsideTime(current > new Date(data.end) || current < new Date(data.start));
      if (current > new Date(data.end)) {
        setLabel("This giveaway has ended");
      } else if (current < new Date(data.start)) {
        setLabel("This giveaway has not started yet");
      } else {
        setLabel("");
      }
    }, 3000);
    return () => clearTimeout(update);
  }, []);

  function handleJoin() {
    setErrorMessage("");
    setSuccessMessage("");
    let body = { username, giveaway: data.id };
    setLoading(true);
    api.data
      .participant(body)
      .then(res => {
        setErrorMessage("");
        getData();
        setErrorMessage("");
        setSuccessMessage("Your entry has been received.");
      })
      .catch(err => {
        err = { ...err };
        err = err.response.data;
        if (err.non_field_errors?.[0].toLowerCase() === "the fields username, giveaway must make a unique set.") {
          setErrorMessage("You have already entered this giveaway");
          setSuccessMessage("");
        } else {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    auth
      .connect()
      .then(({ authId }) => {
        setAuthId(authId);
        localStorage.setItem("SQUADID", authId);
      })
      .catch(console.error);

    auth
      .auth(authId)
      .get("/users/@me/guilds")
      .then(res => res.json())
      .then(data => {
        let serverId = data.find(guild => guild.id === "758495516358082642");
        if (serverId === -1) {
          setErrorMessage("You are not eligible to join this giveaway");
        } else {
          auth
            .auth(authId)
            .get("/users/@me")
            .then(res => res.json())
            .then(data => {
              data = { ...data };
              setUserData(data);
              setUsername(`${data.username}#${data.discriminator}`);
              handleJoin();
            })
            .catch(console.error);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  return (
    <>
      <form className="border p-4 form my-4" onSubmit={handleSubmit}>
        <div className="pb-3">
          {label}
          {!!successMessage ? <small className="text-success">{successMessage}</small> : null}
          {!!errorMessage ? <small className="text-danger">{errorMessage}</small> : null}
        </div>
        <button type="submit" className="btn btn-indigo ml-0" disabled={loading || outsideTime}>
          {loading ? <div className="spinner-border" role="status" /> : "Enter with Discord"}
        </button>
        <ListGroup className="mt-4">
          <ListGroupItem>
            {data.participants || 0} participant{data.participants !== 1 && "s"}
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
