
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useEffect } from "react";
import { useCreateCabin } from "./useCreateCabin";



function CreateCabinForm({ cabinToEdit, onSetShowForm, onCLoseModal }) {
  const { id: editId, ...editValues } = cabinToEdit || {};

  const idEditSession = Boolean(editId);

  const { addNewCabin, isCreating } = useCreateCabin(() => {
    reset();
    if (idEditSession) {
      onSetShowForm(false);
    }
  });

  const { register, handleSubmit, watch, trigger, reset, formState: { errors, isValid, isDirty } } = useForm({
    mode: "onChange",
    defaultValues: idEditSession ? editValues : {}
  });
  const regularPrice = watch("regularPrice");

  useEffect(() => {
    trigger("discount");
  }, [regularPrice, trigger]);


  const onSubmit = (data) => {
    const isFileList = data.image instanceof FileList;
    const imageFile = isFileList ? data.image[0] : null;

    if (!imageFile && !idEditSession) {
      toast.error("Lütfen bir resim seçin.");
      return;
    }

    const formattedData = {
      ...data,
      image: imageFile || data.image,
    };

    addNewCabin({
      newCabinData: formattedData,
      cabinId: editId,
    });
    onCLoseModal?.()
  };






  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCLoseModal ? "modal" : "default"}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "Bu alan zorunludur." })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Bu alan zorunludur.",
            min: { value: 1, message: "En az 1 kişi olmalı." },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Fiyat zorunludur.",
            min: { value: 0, message: "Fiyat negatif olamaz." },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            min: { value: 0, message: "İndirim negatif olamaz." },
            validate: (value) => {
              if (!regularPrice) return true;
              if (Number(value) > Number(regularPrice)) {
                return "İndirim, normal fiyatı geçemez.";
              }
              return true;
            }
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          defaultValue=""
          id="description"
          {...register("description", {
            required: "Açıklama boş bırakılamaz.",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"

          {...register("image", {
            required: idEditSession ? false : "Lütfen bir resim yükleyin.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" onClick={() => onCLoseModal?.()}>
          {idEditSession ? 'Close' : 'Cancel'}
        </Button>
        <Button type="submit" disabled={!isDirty || !isValid || isCreating}>
          {isCreating
            ? idEditSession
              ? 'Updating...'
              : 'Adding...'
            : idEditSession
              ? 'Update cabin'
              : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
