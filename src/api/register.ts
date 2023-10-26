import { VIETNAM_HAT_TOURNAMENT_ID } from "@/config/vietnam-hat.env";
import axiosInstance from "./axios";

const tournamentID = VIETNAM_HAT_TOURNAMENT_ID;

const fetchTournamentInfo = async ({ id }: { id: string }) => {
    await axiosInstance.get(`/tournaments/${tournamentID}`);
};

interface RegisterProps {
    name: string;
    nickname: string | null;
    yob: string;
    gender: "male" | "female";
    email: string;
    stayingCountry: string;
    isStudent: boolean | null;
    tournament: string;
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
        tournament: tournamentID,
    });

    return response;
};

export { fetchTournamentInfo, registerTournament };
