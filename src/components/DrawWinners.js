import { useState } from "react";
import {
  MDBRow as Row,
  MDBCol as Col,
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBTypography as Type,
} from "mdbreact";
import PropTypes from "prop-types";
import api from "../utils/Endpoints";

function DrawWinners({ data, winners, getWinners }) {
  const [loading, setLoading] = useState(false);

  function handlePublish() {
    setLoading(true);
    let body = winners.map(winner => ({
      giveaway: data.id,
      participant: winner.id,
    }));
    api.data
      .publishDraw(body)
      .then(res => getWinners())
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <ListGroup className="mb-4">
        <ListGroupItem>
          <Row>
            <Col md={6}>
              <Type tag="h2" variant="h2-responsive">
                Winners
              </Type>
            </Col>
            <Col md={6} className="text-left text-md-right ml-0">
              <button className="btn btn-sm btn-warning black-text" onClick={handlePublish}>
                {loading ? <div className="spinner-border spinner-border-sm" role="status" /> : "Publish"}
              </button>
            </Col>
          </Row>
        </ListGroupItem>
        {winners.map((winner, i) => (
          <ListGroupItem key={i}>{winner.username}</ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
}

DrawWinners.propTypes = {
  data: PropTypes.object.isRequired,
  winners: PropTypes.array.isRequired,
  getWinners: PropTypes.func.isRequired,
};

export default DrawWinners;
