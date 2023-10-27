import axiosInstance from "@/api/axios";

export const login = async ({ email, password }: { email: string, password: string}) => {
    return await axiosInstance.post('/auth/login', { email, password });
};
