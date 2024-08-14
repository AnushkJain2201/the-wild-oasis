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

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    const imageNmae = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    const imagePath = hasImagePath ? newCabin.iamge : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageNmae}`;
    // https://ohvjyoqeodripkouqqmz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    let query = supabase.from('cabins');
    // 1. Create a new cabin and insert it
    if (!id) {
        query = query.insert([
            { ...newCabin, image: imagePath }
        ])
    }

    if (id) {
        query = query.update({ ...newCabin, image: imagePath })
            .eq('id', id)
    }

    const { data, error } = await query.select().single();


    if (error) {
        console.error(error)
        throw new Error('Cabin could not be created')
    }


    // 2. Upload the image
    const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageNmae, newCabin.image);

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