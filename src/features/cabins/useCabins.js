import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        // queryKey uniquely identify the data that we are querying for
        queryKey: ["cabins"],
    
        // The queryFn is the function that is used to fetch the data, but it is needed here to return a promise
        queryFn: getCabins,
    });

    return { isLoading, cabins, error }
}



