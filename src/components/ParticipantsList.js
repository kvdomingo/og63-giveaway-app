import { MDBTypography as Type, MDBListGroup as ListGroup, MDBListGroupItem as ListGroupItem } from "mdbreact";
import PropTypes from "prop-types";

function ParticipantsList({ data }) {
  return (
    <>
      <Type tag="h2" variant="h2-responsive">
        Participants
      </Type>
      <ListGroup>
        {!!data.length ? (
          data.map((participant, i) => <ListGroupItem key={i}>{participant.username}</ListGroupItem>)
        ) : (
          <ListGroupItem>No participants yet</ListGroupItem>
        )}
      </ListGroup>
    </>
  );
}

ParticipantsList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ParticipantsList;
