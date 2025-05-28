import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {


  return (
    <>
      <Row type="horizontal" justify="space-between" align="center">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>
      <Row type="horizontal" align="center" justify="space-between">
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
