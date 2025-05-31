import Button from "../../ui/Button";
import { useChekout } from "./useChekout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useChekout()
  return (
    <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
