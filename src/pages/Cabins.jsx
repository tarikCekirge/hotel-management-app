import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const cabins = await getCabins();
        console.log(cabins);
      } catch (error) {
        console.error("Veri alınamadı:", error.message);
      }
    };

    fetchCabins();
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
