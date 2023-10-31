import axiosInstance from "@/api/axios";

export const getVietnamHatPlayers = async () => {
    return await axiosInstance.get('/admin/vietnam-hat-2023/players');
};
