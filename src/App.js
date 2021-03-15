import { useState, useEffect } from "react";
import { MDBContainer as Container } from "mdbreact";
import "./App.css";
import EntryForm from "./components/EntryForm";
import GiveawayDescription from "./components/GiveawayDescription";
import Loading from "./shared/Loading";
import api from "./utils/Endpoints";
import Draw from "./components/Draw";
import WinnersList from "./components/WinnersList";

function App() {
  const [giveaway, setGiveaway] = useState({});
  const [winners, setWinners] = useState([]);
  const [giveawayLoading, setGiveawayLoading] = useState(true);
  const [winnersLoading, setWinnersLoading] = useState(true);

  useEffect(() => {
    getData();
    getWinners();
  }, []);

  function getData() {
    api.data
      .giveaway()
      .then(res => {
        setGiveaway(res.data);
      })
      .catch(err => console.log(err.message))
      .finally(() => setGiveawayLoading(false));
  }

  function getWinners() {
    api.data
      .winner()
      .then(res => {
        setWinners(res.data);
      })
      .catch(err => console.log(err.message))
      .finally(() => setWinnersLoading(false));
  }

  return giveawayLoading || winnersLoading ? (
    <Loading />
  ) : (
    <Container className="py-5">
      <GiveawayDescription data={giveaway} />
      <EntryForm data={giveaway} getData={getData} />
      {!!winners.length && <WinnersList winners={winners} />}
      <Draw data={giveaway} getWinners={getWinners} winnersDrawn={winners.length > 0} />
    </Container>
  );
}

export default App;
