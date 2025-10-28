import api from "@/lib/axios"

export const getPlans = async () => {
    const { data } = await api.get("/api/v1/plan/all")
    return data.data
}