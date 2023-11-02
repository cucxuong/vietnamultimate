import { forwardRef, MutableRefObject } from "react";

const Schedule = forwardRef(({}, ref) => {
    return <section ref={ref as MutableRefObject<HTMLDivElement | null>} className="grid grid-cols-2 gap-4">VNHAT 2023 Schedule</section>;
});

Schedule.displayName = "Schedule";
export default Schedule;
