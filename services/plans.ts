import api from "@/lib/axios"

export const getPlans = async () => {
    const { data } = await api.get("/plan/all")
    return data.data
}