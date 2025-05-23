import GLobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";



const App = () => {
  return (
    <>
      <GLobalStyles />
      <Button>Varsayılan Buton</Button>
      <Button size="large">Large Buton</Button>
      <Button variation="secondary">Secondary Buton</Button>

      <div>

        <Row>
          <div>Default Yatay</div>
          <div>Satır</div>
        </Row>

        <Row type="vertical">
          <div>Dikey</div>
          <div>Satır</div>
        </Row>

        <Heading as='h1'>H1</Heading>
        <Heading as='h2'>H1</Heading>
        <Heading as='h3'>H1</Heading>
        <Heading as='h5'>H1</Heading>

      </div>

    </>


  );
};

export default App;