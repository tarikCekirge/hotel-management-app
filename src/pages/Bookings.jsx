import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {


  return (
    <>
      <Row type="horizontal" justify="space-between" align="center">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="vertical" align="center" justify="space-between">
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
