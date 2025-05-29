import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useChekout } from "../check-in-out/useChekout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking, bookingId, error } = useBooking();
  const { checkout, isCheckingOut } = useChekout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (error) return <p>No booking found for ID {bookingId}</p>;

  const status = booking.status;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal" justify="space-between">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          {status && (
            <Tag type={statusToTagName[status]}>
              {status.replace("-", " ")}
            </Tag>
          )}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && <>
          <Button onClick={() => navigate(`/ckeckin/${bookingId}`)}>
            Check in
          </Button>
        </>}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete-booking">
            {({ open }) => <Button variation='danger' open="delete" onClick={open}>Delete</Button>}
          </Modal.Open>
          <Modal.Window name="delete-booking">
            {({ close }) => (
              <ConfirmDelete
                onCloseModal={close}
                resourceName="booking"
                onConfirm={() => deleteBooking(bookingId, {
                  onSettled: () => navigate(-1)
                })}
                disabled={isDeleting}
              />
            )}
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

