import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
    const [isopenModal, setIsopenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setIsopenModal(show => !show)}>Yeni Oda EKle</Button>
            {isopenModal &&
                <Modal onCLose={() => setIsopenModal(false)}>
                    <CreateCabinForm onCLoseModal={() => setIsopenModal(false)} />
                </Modal>}
        </>
    )
}

export default AddCabin