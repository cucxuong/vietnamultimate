import axiosInstance from "@/api/axios";

export const getVietnamHatPlayers = async () => {
    return await axiosInstance.get('/admin/vietnam-hat-2023/players');
};

export const authorizeCountry = async ({ code } : { code: string }) => {
    return await  axiosInstance.post('/admin/vietnam-hat-2023/authorize', {
        code
    });
}

export const updatePaymentStatus = async ({ player_code } : { player_code: string })=> {
    return await axiosInstance.post('/admin/vietnam-hat-2023/update-payment', {
        player_code
    });
}
