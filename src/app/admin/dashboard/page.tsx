"use client";
import { useEffect } from "react";
import axiosInstance from "@/api/axios";
import { useRouter } from "next/router";

const Page = () => {
    useEffect(() => {
        axiosInstance.get('/admin/tournaments')
            .then(res => console.log(res));
    }, []);

    return (
        <div>Admin Dashboard</div>
    );
};

export default Page;
