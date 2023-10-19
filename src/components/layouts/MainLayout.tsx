"use client";

import { hasLoadedTranslationResources, useAppTranslation } from "@/i18n/client";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { t, i18n } = useAppTranslation();
    const hasLoaded = hasLoadedTranslationResources();
    if (!hasLoaded) {
        return <></>;
    }
    return <>{children}</>;
}
