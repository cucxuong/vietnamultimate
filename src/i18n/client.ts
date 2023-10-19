"use client";

import { useEffect, useMemo } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultNS, fallbackLng, getOptions } from "@/i18n/settings";
import { read, utils } from "xlsx";

//
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ["path", "htmlTag", "cookie", "navigator"],
        },
    });

async function loadTranslationResource() {
    const f = await(await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRRWHIYrS-foK1LAQ1idwwENindh7CzNNlejYnSt9S3z6tUrxgin4S8Dkv1py1jMbnU9id91da5F1Cc/pub?output=xlsx")).arrayBuffer();
    const wb = read(f);
    const worksheet = wb.Sheets[wb.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet, { header: ["key", "en", "vi"] });
    let en = {};
    let vi = {};
    data.map((row, index) => {
        if (index < 1) {
            return;
        }
        let rowData = JSON.parse(JSON.stringify(row));
        if (rowData.key) {
            en = { ...en, [rowData.key]: rowData.en };
            vi = { ...vi, [rowData.key]: rowData.vi };
        }
    });
    return { en, vi };
}

export function hasLoadedTranslationResources(ns = defaultNS) {
    return [i18next.hasResourceBundle("en", ns), i18next.hasResourceBundle("vi", ns)].every((e) => e)
}

const runsOnServerSide = typeof window === "undefined";

export function useAppTranslation(lng = i18next.language, ns = defaultNS, options = getOptions()) {
    const lang = lng || fallbackLng;
    if (runsOnServerSide && i18next.resolvedLanguage !== lang) {
        i18next.changeLanguage(lang);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const hasLoaded: boolean = hasLoadedTranslationResources(ns);
            if (hasLoaded) {
                i18next.changeLanguage(lang);
            } else {
                loadTranslationResource()
                    .then((res) => {
                        return i18next
                            .addResourceBundle("en", defaultNS, res.en, true, true)
                            .addResourceBundle("vi", defaultNS, res.vi, true, true);
                    })
                    .then(() => i18next.changeLanguage(lang));
            }
        }, [lang, ns]);
    }
    return useTranslation();
}
