"use client";

import { hasLoadedTranslationResources, useAppTranslation } from "@/i18n/client";
import Loading from "../UIs/Loading";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { t, i18n } = useAppTranslation();
    const hasLoaded = hasLoadedTranslationResources();
    if (!hasLoaded) {
        return <Loading></Loading>;
    }
    return <>{children}</>;
}
