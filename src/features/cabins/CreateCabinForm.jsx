import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {

  const queryClient = useQueryClient();

  const { mutate: addNewCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Yeni oda eklendi!");
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error("Eklerken hata oldu.", err);
    },
  })

  const { register, handleSubmit, reset, getValues, formState: { errors, isValid, isDirty } } = useForm({
    mode: "onChange",
  });


  const onSubmit = (data) => {
    addNewCabin(data)
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", { required: "Bu alan zorunludur." })} />
        {errors.name && <Error>*{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "Bu alan zorunludur.",
          min: { value: 1, message: "En az 1 kişi olmalı." },
        })} />
        {errors.maxCapacity && <Error>*{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "Fiyat zorunludur.",
          min: { value: 0, message: "Fiyat negatif olamaz." },
        })} />
        {errors.regularPrice && <Error>*{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          min: { value: 0, message: "İndirim negatif olamaz." },
          validate: (value) => {
            const regularPrice = getValues().regularPrice;
            if (value > regularPrice) {
              return "İndirim, normal fiyatı geçemez.";
            }
          },
        })} />
        {errors.discount && <Error>*{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea defaultValue="" id="description"  {...register("description", {
          required: "Açıklama boş bırakılamaz.",
        })} />
        {errors.description && <Error>*{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*"  {...register("image", {
          required: "Resim eklemek zorunludur.",
        })} />
        {errors.image && <Error>*{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button type="reset" variation="secondary" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty || !isValid || isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
