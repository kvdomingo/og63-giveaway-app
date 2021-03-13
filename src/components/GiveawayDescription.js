import { MDBTypography as Type } from "mdbreact";
import PropTypes from "prop-types";

function GiveawayDescription({ data }) {
  const date = new Date(data.end).toLocaleString();

  return (
    <>
      <Type tag="h1" variant="h1-responsive">
        {data.name}
      </Type>
      <p>
        <b>Prize</b> {data.prize}
      </p>
      <p>
        <b>Winners</b> {data.winners}
      </p>
      <p>
        <b>Eligibility</b> {data.eligibility}
      </p>
      <p>
        <b>Rules</b> {data.rules}
      </p>
      <p>
        <b>End</b> {date}
      </p>
    </>
  );
}

GiveawayDescription.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GiveawayDescription;
