import { MDBTypography as Type } from "mdbreact";
import HtmlParser from "react-html-parser";
import PropTypes from "prop-types";

function GiveawayDescription({ data }) {
  return (
    <>
      <Type tag="h1" variant="h1-responsive" className="pb-4">
        {data.name}
      </Type>
      <p>
        <b>Prize:</b> {data.prize}
      </p>
      <p>
        <b>Winners:</b> {data.num_winners}
      </p>
      <p>
        <b>Eligibility:</b> {HtmlParser(data.eligibility)}
      </p>
      <p>
        <b>Rules:</b> {HtmlParser(data.rules)}
      </p>
      <p>
        <b>Start:</b> {new Date(data.start).toLocaleString()}
      </p>
      <p>
        <b>End:</b> {new Date(data.end).toLocaleString()}
      </p>
    </>
  );
}

GiveawayDescription.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GiveawayDescription;
