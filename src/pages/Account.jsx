import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
      </Row>
      <UpdateUserDataForm />

      <Row>
        <Heading as="h3">Update password</Heading>
      </Row>
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
