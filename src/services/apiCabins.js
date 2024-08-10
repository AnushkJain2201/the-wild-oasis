import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be fetched')
    }

    return data;
}

export async function createCabin(newCabin) {

    const imageNmae = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageNmae}`;
    // https://ohvjyoqeodripkouqqmz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    // 1. Create a new cabin and insert it
    const { data, error } = await supabase
        .from('cabins')
        .insert([
            { ...newCabin, image: imagePath }
        ])
        .select()

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be created')
    }


    // 2. Upload the image
    const {error: storageError} = await supabase.storage.from("cabin-images").upload(imageNmae, newCabin.image);

    // 3 Delete the cabin if there is an error while uploading the corresponding image
    if (storageError) {
        console.error(storageError)
        await supabase.from('cabins').delete().eq('id', data.id)
        throw new Error('Image could not be uploaded and cabin was not created')
    }

    return data;

}

export async function deleteCabin(id) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be deleted')
    }
}