import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

// const AddCabin = () => {
//     const [isopenModal, setIsopenModal] = useState(false);

//     return (
//         <>
//             <Button onClick={() => setIsopenModal(show => !show)}>Yeni Oda EKle</Button>
//             {isopenModal &&
//                 <Modal onCLose={() => setIsopenModal(false)}>
//                     <CreateCabinForm onCLoseModal={() => setIsopenModal(false)} />
//                 </Modal>}
//         </>
//     )
// }


const AddCabin = () => {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                {({ open }) => <Button onClick={open}>Yeni Oda Ekle</Button>}
            </Modal.Open>

            <Modal.Window name="cabin-form">
                {({ close }) => <CreateCabinForm onCloseModal={close} />}
            </Modal.Window>

            <Modal.Open opens="table">
                {({ open }) => <Button onClick={open}>Tüm Odalar</Button>}
            </Modal.Open>

            <Modal.Window name="table">
                {({ close }) => <CabinTable onCloseModal={close} />}
            </Modal.Window>
        </Modal>
    );
};


export default AddCabin