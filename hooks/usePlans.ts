import { getPlans } from "@/services/plans"
import { useQuery } from "@tanstack/react-query"

export const useGetPlans = () => {
    return useQuery({
        queryKey: ["plans"],
        queryFn: getPlans,
    })
}