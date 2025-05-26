
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useEffect } from "react";



function CreateCabinForm({ cabin }) {

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

  const { register, handleSubmit, watch, trigger, reset, formState: { errors, isValid, isDirty } } = useForm({
    mode: "onChange",
  });
  const regularPrice = watch("regularPrice");

  useEffect(() => {
    trigger("discount");
  }, [regularPrice, trigger]);


  const onSubmit = (data) => {
    const imageFile = data.image?.[0];

    if (!imageFile) {
      toast.error("Lütfen bir resim seçin.");
      return;
    }
    addNewCabin({ ...data, image: imageFile })
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
            required: "Resim eklemek zorunludur.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty || !isValid || isCreating}>
          {isCreating ? 'Adding...' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
