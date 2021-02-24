import { LoadingProvider, SnackbarProvider } from "@eyeseetea/d2-ui-components";
import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import _ from "lodash";
import React from "react";
import { getCompositionRoot } from "../CompositionRoot";
import { AppContext } from "../webapp/contexts/app-context";
import Settings from "../webapp/logic/settings";
import ThemesPage from "../webapp/pages/themes/ThemesPage";
import { initializeMockServer } from "./mocks/server";

let settings: Settings;

const { api } = initializeMockServer();
const compositionRoot = getCompositionRoot({
    appConfig: {
        appKey: "bulk-load",
        storage: "dataStore",
    },
    dhisInstance: { url: api.baseUrl },
    mockApi: api,
});

const renderComponent = async () => {
    await act(async () => {
        render(
            <AppContext.Provider value={{ api, d2: {}, compositionRoot }}>
                <LoadingProvider>
                    <SnackbarProvider>
                        <ThemesPage settings={settings} themes={[]} setSettings={_.noop} setThemes={_.noop} />
                    </SnackbarProvider>
                </LoadingProvider>
            </AppContext.Provider>
        );
    });
};

describe("ImportTemplatePage", () => {
    beforeAll(async () => {
        settings = await Settings.build(api, compositionRoot);
    });

    test("Renders correctly", async () => {
        await renderComponent();

        expect(screen.getByRole("button", { name: "Create theme" })).toBeInTheDocument();
    });
});

export {};
