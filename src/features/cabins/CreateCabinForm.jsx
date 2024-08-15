/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}}) {
	const {id: editId, ...editValues} = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;
	// console.log(errors);

	const {isCreating, createCabin} = useCreateCabin();

	const {isEditing, editCabin} = useEditCabin();

	const isWorking = isCreating || isEditing

	function myOwnSubmit(data) {
		// This data will contain all the data from the form
		// console.log(data);
		const image = typeof data.image == "string" ? data.image : data.image[0];
		if(isEditSession){
			editCabin({newCabinData: {...data, image}, id: editId}, {
				onSuccess: () => reset()
			});
		}
		else {
			createCabin({...data, image: image}, {
				onSuccess: () => reset()
			});
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		// This myOnwSubmit method will be called every time we submit the form, and onError will be called when an error occurs
		<Form onSubmit={handleSubmit(myOwnSubmit, onError)}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label='Maximum Capacity'
				error={errors?.maxCapacity?.message}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Maximum capacity needs to be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Regular price'
				error={errors?.regularPrice?.message}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price needs to be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}
			>
				<Textarea
					type='number'
					id='description'
					disabled={isWorking}
					defaultValue=''
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label='Cabin photo'>
				<FileInput
					id='image'
					accept='image/*'
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
