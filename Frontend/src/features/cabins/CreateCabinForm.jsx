import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { _id: id, ...editValues } = cabinToEdit;
  const isEditingSession = id ? true : false;
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: editValues });

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isLoading = isCreating || isEditing;

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("maxCapacity", data.maxCapacity);
    formData.append("regularPrice", data.regularPrice);
    formData.append("discount", data.discount);
    formData.append("description", data.description);
    console.log(formData.get("discount"), formData.get("regularPrice"));
    if (data.image[0]?.name) {
      formData.append("image", data.image[0]);
    }

    isEditingSession ? editCabin({ id, formData }) : createCabin(formData);
    onClose?.();
    reset();
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <form
      className="text-lg bg-white px-5"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/* Form Row */}
      <div className="grid grid-cols-[12rem_1fr] gap-6 py-3 border-grey-100">
        <label htmlFor="name" className="font-medium">
          Cabin name
        </label>
        <div>
          <input
            type="text"
            id="name"
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("name", {
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.name?.message && (
            <p className="text-sm text-red-700 mt-2 ">{errors.name.message}</p>
          )}
        </div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-[12rem_1fr] gap-6 py-3 border-grey-100">
        <label htmlFor="maxCapacity" className="font-medium">
          Maximum capacity
        </label>
        <div>
          <input
            type="number"
            id="maxCapacity"
            defaultValue={1}
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("maxCapacity", {
              minLength: 1,
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.maxCapacity?.message && (
            <p className="text-sm text-red-700 mt-2">
              {errors.maxCapacity.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-[12rem_1fr] gap-6 py-3 border-grey-100">
        <label htmlFor="regularPrice" className="font-medium">
          Regular price
        </label>
        <div>
          <input
            type="number"
            id="regularPrice"
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("regularPrice", {
              minLength: 1,
              required: "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.regularPrice?.message && (
            <p className="text-sm text-red-700 mt-2">
              {errors.regularPrice.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-[12rem_1fr] gap-6 py-3 border-grey-100">
        <label htmlFor="discount" className="font-medium">
          Discount
        </label>
        <div>
          <input
            type="number"
            id="discount"
            defaultValue={0}
            className="py-2 px-4 border border-grey-300 rounded-md w-full"
            {...register("discount", {
              validate: (val) =>
                val <= getValues("regularPrice") ||
                "Discount must be less than regular price",
            })}
            disabled={isLoading}
          />
          {errors?.discount?.message && (
            <p className="text-sm text-red-700 mt-2">
              {errors.discount.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-[12rem_1fr] gap-6 py-3 border-grey-100">
        <label htmlFor="description" className="font-medium">
          Description
        </label>
        <div>
          <textarea
            id="description"
            className="py-2 px-4 border border-grey-300 rounded-md w-full h-32"
            defaultValue=""
            {...register("description", {
              required: "This field is required",
            })}
            disabled={isLoading}
          ></textarea>
          {errors?.description?.message && (
            <p className="text-sm text-red-700 mt-2">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-[12rem_1fr] gap-6 py-3">
        <label htmlFor="image" className="font-medium">
          Cabin photo
        </label>
        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="block w-fit text-sm text-grey-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            {...register("image", {
              required: isEditingSession ? false : "This field is required",
            })}
            disabled={isLoading}
          />
          {errors?.image?.message && (
            <p className="text-sm text-red-700 mt-2">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 py-3">
        <button
          type="reset"
          className="py-2 px-4 bg-grey-200 text-grey-700 rounded-md hover:bg-grey-300"
          disabled={isLoading}
          onClick={() => onClose?.()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          disabled={isLoading}
        >
          {isEditingSession ? "Edit cabin" : " Add cabin"}
        </button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
