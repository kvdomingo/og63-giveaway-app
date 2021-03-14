import PropTypes from "prop-types";
import { MDBTypography as Type, MDBListGroupItem as ListGroupItem, MDBListGroup as ListGroup } from "mdbreact";

function WinnersList({ winners }) {
  return (
    <>
      <ListGroup>
        <ListGroupItem>
          <Type tag="h2" variant="h2-responsive">
            Winners
          </Type>
        </ListGroupItem>
        {winners.map((winner, i) => (
          <ListGroupItem key={i}>{winner.username}</ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
}

WinnersList.propTypes = {
  winners: PropTypes.array.isRequired,
};

export default WinnersList;
