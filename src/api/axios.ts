import axios from "axios";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Auto add AccessToken to header request
axiosInstance.interceptors.request.use((request) => {
    console.log(hasCookie('access_token'));
    const accessToken = hasCookie('access_token') ? getCookie('access_token') : '';
    console.log("Access Token: ", accessToken);

    if (accessToken !== '') {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return request;
});

// Catch when access_token expire and refresh
const axiosAutoRefreshInterceptor = () => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            if (error.response.status !== 401 || !hasCookie("refresh_token")) {
                return Promise.reject(error);
            }

            // Remove interceptor
            axiosInstance.interceptors.response.eject(refreshInterceptor);

            try {
                const res = await axiosInstance.post("/auth/refresh-token");
            } catch (e) {
                deleteCookie('access_token');
                deleteCookie('refresh_token');

                return Promise.reject(e);
            }
        }
    )
}

export default axiosInstance;
