import { useState } from "react";
import PropTypes from "prop-types";
import { MDBTypography as Type, MDBListGroup as ListGroup, MDBListGroupItem as ListGroupItem } from "mdbreact";
import DrawWinners from "./DrawWinners";

function DrawParticipants({ data, participants, getWinners, winnersDrawn }) {
  const [winners, setWinners] = useState([]);

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function handleDraw() {
    let pool = [...participants];
    pool = shuffle(pool);
    let winners = [];
    for (let i = 0; i < data.num_winners; i++) {
      winners.push(pool.pop());
    }
    setWinners(winners);
  }

  return (
    <div className="border p-4">
      <button
        className="btn btn-warning black-text mb-5 ml-0"
        onClick={handleDraw}
        disabled={participants.length === 0 || winnersDrawn}
      >
        Random draw
      </button>
      {winners.length > 0 && (
        <DrawWinners data={data} winners={winners} getWinners={getWinners} winnersDrawn={winnersDrawn} />
      )}
      <ListGroup>
        <ListGroupItem>
          <Type tag="h2" variant="h2-responsive">
            Participants
          </Type>
        </ListGroupItem>
        {participants.map((participant, i) => (
          <ListGroupItem key={i}>{participant.username}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

DrawParticipants.propTypes = {
  data: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  getWinners: PropTypes.func.isRequired,
  winnersDrawn: PropTypes.bool.isRequired,
};

export default DrawParticipants;
