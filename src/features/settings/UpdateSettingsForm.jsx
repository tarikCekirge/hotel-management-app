import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useEffect } from 'react';
import { useEditSettings } from './useEditSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings,
  } = useSettings();


  const { editSettings, isEditing } = useEditSettings()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  function onSubmit(data) {
    console.log("Gönderilecek veriler:", data);
  }

  const handleUpdate = (e) => {
    const { value, id } = e.target;

    const newValue = Number(value);
    const currentValue = settings?.[id];

    if (newValue === currentValue) return;

    editSettings({
      newSettingsData: {
        [id]: newValue,
      },
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Hata oluştu: {error.message}</div>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum gece/rezervasyon" error={errors?.minBookingLength?.message}>
        <Input type="number" id="minBookingLength" {...register("minBookingLength", { required: "Zorunlu alan" })} onBlur={handleUpdate} disabled={isEditing} />
      </FormRow>

      <FormRow label="Maksimum gece/rezervasyon" error={errors?.maxBookingLength?.message}>
        <Input type="number" id="maxBookingLength" {...register("maxBookingLength", { required: "Zorunlu alan" })} onBlur={handleUpdate} disabled={isEditing} />
      </FormRow>

      <FormRow label="Maksimum misafir/rezervasyon" error={errors?.maxGuestsPerBooking?.message}>
        <Input type="number" id="maxGuestsPerBooking" {...register("maxGuestsPerBooking", { required: "Zorunlu alan" })} onBlur={handleUpdate} disabled={isEditing} />
      </FormRow>

      <FormRow label="Kahvaltı ücreti" error={errors?.breakfastPrice?.message}>
        <Input type="number" id="breakfastPrice" {...register("breakfastPrice", { required: "Zorunlu alan" })} onBlur={handleUpdate} disabled={isEditing} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
