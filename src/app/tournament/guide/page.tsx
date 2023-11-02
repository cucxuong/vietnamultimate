import { forwardRef } from "react";

const Guide = forwardRef(({}, ref) => {
    return <section className="grid grid-cols-2 gap-4">VNHAT 2023 Guide</section>;
});

Guide.displayName = "Guide";
export default Guide;
