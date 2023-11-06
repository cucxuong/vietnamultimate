import axiosInstance from "@/api/axios";
import { PlayerStatus } from "@/utils/vietnam-hat-2023.utils";

export const getVietnamHatPlayers = async () => {
    return await axiosInstance.get('/admin/vietnam-hat-2023/players');
};

export const authorizeCountry = async ({ code } : { code: string }) => {
    return await  axiosInstance.post('/admin/vietnam-hat-2023/authorize', {
        code
    });
}

export const updatePaymentStatus = async ({ player_code, status } : { player_code: string, status: PlayerStatus.paid | PlayerStatus.halfpaid })=> {
    return await axiosInstance.post('/admin/vietnam-hat-2023/update-payment', {
        player_code,
        status
    });
}


export const updatePlayerStatus = async ({ player_code, status } : { player_code: string, status: PlayerStatus }) => {
    return await axiosInstance.post('/admin/vietnam-hat-2023/update-status', {
        player_code,
        status
    });
}
