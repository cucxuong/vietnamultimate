import axiosInstance from "./axios";

const fetchTournamentInfo = async ({ id }: { id: string }) => {
    const response = await axiosInstance.get(`/tournaments/${id}`);

    console.log(response);
};

interface RegisterProps {
    name: string;
    nickname: string | null;
    yob: string;
    gender: "male" | "female";
    email: string;
    stayingCountry: string;
    isStudent: boolean | null;
    options: string;
}

const registerTournament = async (data: RegisterProps) => {
    const response = await axiosInstance.post("/tournament-players", {
        ...data,
        full_name: data.name,
        current_country: data.stayingCountry,
        year_of_birth: data.yob,
        is_student: data.stayingCountry === "vietnam" ? data.isStudent : null,
        selected_options: data.options,
        tournament: "653761306d34b11e8c3ccc0f",
    });

    return response;
};

export { fetchTournamentInfo, registerTournament };
