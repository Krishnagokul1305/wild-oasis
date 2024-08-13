import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import useEditSettings from "./useEditSettings";
import { useEffect } from "react";

function UpdateSettingsForm() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { isEditing, updateSettings } = useEditSettings();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: settings || {},
  });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  function onSubmit(data) {
    updateSettings({
      minBookingLength: +data.minBookingLength,
      maxBookingLength: +data.maxBookingLength,
      maxGuestPerBooking: +data.maxGuestPerBooking,
      breakFastPrice: +data.breakFastPrice,
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      className="space-y-6 text-lg bg-white px-7 py-5 mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center py-3 border-grey-100 gap-5">
        <label htmlFor="min-nights" className="w-3/12 font-semibold text-xl">
          Minimum nights/booking
        </label>
        <div className="w-7/12">
          <input
            type="number"
            id="min-nights"
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("minBookingLength")}
            disabled={isEditing}
          />
        </div>
      </div>

      <div className="flex items-center py-3 border-grey-100 gap-5">
        <label htmlFor="max-nights" className="w-3/12 font-semibold text-xl">
          Maximum nights/booking
        </label>
        <div className="w-7/12">
          <input
            type="number"
            id="max-nights"
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("maxBookingLength")}
            disabled={isEditing}
          />
        </div>
      </div>

      <div className="flex items-center py-3 border-grey-100 gap-5">
        <label htmlFor="max-guests" className="w-3/12 font-semibold text-xl">
          Maximum guests/booking
        </label>
        <div className="w-7/12">
          <input
            type="number"
            id="max-guests"
            className="py-2 px-4 border border-grey-300 rounded-md w-full "
            {...register("maxGuestPerBooking")}
            disabled={isEditing}
          />
        </div>
      </div>

      <div className="flex items-center py-3 border-grey-100 gap-5">
        <label
          htmlFor="breakfast-price"
          className="w-3/12 font-semibold text-xl"
        >
          Breakfast price
        </label>
        <div className="w-7/12">
          <input
            type="number"
            id="breakfast-price"
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("breakFastPrice")}
            disabled={isEditing}
          />
        </div>
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ms-auto block me-10"
        disabled={isEditing}
      >
        Update
      </button>
    </form>
  );
}

export default UpdateSettingsForm;
