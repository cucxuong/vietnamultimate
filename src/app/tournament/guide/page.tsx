import { forwardRef, MutableRefObject } from "react";

const Guide = forwardRef(({}, ref) => {
    return <section ref={ref as MutableRefObject<HTMLDivElement | null>} className="grid grid-cols-2 gap-4">VNHAT 2023
        Guide</section>;
});

Guide.displayName = "Guide";
export default Guide;
