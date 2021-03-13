import { useState, useEffect } from "react";
import { MDBContainer as Container } from "mdbreact";
import "./App.css";
import EntryForm from "./components/EntryForm";
import GiveawayDescription from "./components/GiveawayDescription";
import ParticipantsList from "./components/ParticipantsList";
import Loading from "./shared/Loading";
import api from "./utils/Endpoints";

function App() {
  const [giveaway, setGiveaway] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  function getData() {
    api.data
      .giveaway()
      .then(res => setGiveaway(res.data))
      .catch(err => console.log(err.message));
  }

  return loading ? (
    <Loading />
  ) : (
    <Container className="py-5">
      <GiveawayDescription data={giveaway} />
      <EntryForm data={giveaway} getData={getData} />
      <ParticipantsList data={giveaway.participants} />
    </Container>
  );
}

export default App;
