import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {

  return (
    <>
      <Row type="horizontal" align="center" justify="space-between">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <AddCabin />
      <CabinTable />
    </>
  );
}

export default Cabins;
