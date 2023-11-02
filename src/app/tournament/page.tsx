import { forwardRef } from "react";

const Tournament = forwardRef(({}, ref) => {
    return (
        <section className="grid grid-cols-2 gap-4">
        </section>
    );
});

Tournament.displayName = "Tournament";
export default Tournament;
