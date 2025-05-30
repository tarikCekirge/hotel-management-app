import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/
const emailRegex = /\S+@\S+\.\S+/;

function SignupForm() {

  const { signup, isLoading } = useSignup()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const password = watch("password");

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password })
    reset(undefined, {
      keepErrors: false,
      keepTouched: false,
      keepDirty: false,
      keepIsValid: false,
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Ad Soyad" error={errors?.fullName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Ad soyad zorunludur",
          })}
        />
      </FormRow>

      <FormRow label="Email adresi" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register("email", {
            required: "Email adresi zorunludur",
            pattern: {
              value: emailRegex,
              message: "Geçerli bir email adresi giriniz",
            },
          })}
        />
      </FormRow>

      <FormRow label="Şifre (en az 8 karakter)" error={errors?.password?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register("password", {
            required: "Şifre zorunludur",
            minLength: {
              value: 8,
              message: "Şifre en az 8 karakter olmalıdır",
            },
          })}
        />
      </FormRow>

      <FormRow label="Şifreyi tekrar girin" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Lütfen şifrenizi tekrar girin",
            validate: (value) =>
              value === password || "Şifreler uyuşmuyor",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => reset()}>
          İptal
        </Button>
        <Button disabled={!isDirty || !isValid || isLoading} type="submit">
          Yeni kullanıcı oluştur
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
