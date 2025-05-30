import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



const CabinRow = ({ cabin }) => {
  const { image, name, id, regularPrice, discount, maxCapacity } = cabin;
  const [showForm, setShowForm] = useState(false);

  const { isCreating, addNewCabin: duplicateToCabin } = useCreateCabin()
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const handleDuplicate = () => {
    const { id, ...duplicateCabin } = cabin;

    const newCabin = {
      ...duplicateCabin,
      image: cabin.image,
      name: `${duplicateCabin.name} (Copy)`,
    };

    duplicateToCabin({ newCabinData: newCabin, cabinId: null });
  };




  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Max: {maxCapacity} kişi</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

        <div>
          <button disabled={isCreating} onClick={handleDuplicate}><HiSquare2Stack /></button>

          <Modal>
            <Modal.Open opens="edit">
              {({ open }) => <button onClick={open}><HiPencil /></button>
              }
            </Modal.Open>
            <Modal.Open opens="delete">
              {({ open }) => <button onClick={open} disabled={isDeleting}><HiTrash /></button>
              }
            </Modal.Open>

            <Modal.Window name="edit">
              {({ close }) => <CreateCabinForm onSetShowForm={setShowForm} cabinToEdit={cabin} onCloseModal={close} />}
            </Modal.Window>
            <Modal.Window name="delete">
              {({ close }) => <ConfirmDelete onCloseModal={close} resourceName={"cabins"} onConfirm={() => deleteCabin(id)} disabled={isDeleting} />}
            </Modal.Window>
          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />
            <Menus.List id={cabin.id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>Duplicate</Menus.Button>
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>



        </div>
      </Table.Row>

    </>
  );
};


export default CabinRow