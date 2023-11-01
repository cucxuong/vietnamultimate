import { forwardRef } from "react";

const Schedule = forwardRef(({}, ref) => {
    return <section className="grid grid-cols-2 gap-4 pt-16">VNHAT 2023 Schedule</section>;
});

Schedule.displayName = "Schedule";
export default Schedule;
