import { generateUid } from "d2/uid";
import _ from "lodash";
import { Codec } from "purify-ts";
import { DataElement, DataForm } from "../../../domain/entities/DataForm";
import { DataPackage } from "../../../domain/entities/DataPackage";
import {
    CustomTemplate,
    DataSource,
    DownloadCustomizationOptions,
    ImportCustomizationOptions,
    StyleSource,
} from "../../../domain/entities/Template";
import { ThemeStyle } from "../../../domain/entities/Theme";
import { ExcelRepository } from "../../../domain/repositories/ExcelRepository";
import { InstanceRepository } from "../../../domain/repositories/InstanceRepository";
import i18n from "../../../locales";
import { cache } from "../../../utils/cache";
import { GetSchemaType, Schema } from "../../../utils/codec";
import { promiseMap } from "../../../webapp/utils/promises";

export class SnakebiteAnnualReport implements CustomTemplate {
    public readonly type = "custom";
    public readonly id = "SNAKEBITE_ANNUAL_REPORT_v1";
    public readonly name = "Snakebite Annual Report";
    public readonly url = "templates/Snakebite_Annual_Report.xlsx";
    public readonly dataFormId = { type: "value" as const, id: "XBgvNrxpcDC" };
    public readonly dataFormType = { type: "value" as const, id: "dataSets" as const };
    public readonly fixedOrgUnit = { type: "cell" as const, sheet: "National", ref: "C4" };
    public readonly fixedPeriod = { type: "cell" as const, sheet: "National", ref: "F4" };

    public readonly dataSources: DataSource[] = [
        (sheet: string) => {
            switch (sheet) {
                case "National":
                    return _.range(30).map(offset => ({
                        type: "row",
                        orgUnit: { sheet, type: "cell", ref: "C4" },
                        period: { sheet, type: "cell", ref: "F4" },
                        dataElement: { sheet, type: "row", ref: 7 + offset * 6 },
                        categoryOption: { sheet, type: "row", ref: 8 + offset * 6 },
                        range: {
                            sheet,
                            rowStart: 9 + offset * 6,
                            rowEnd: 9 + offset * 6,
                            columnStart: "A",
                        },
                    }));
                case "Metadata":
                case "OrgUnits":
                case "Validation":
                    return [];
                default:
                    return _.range(50).map(offset => ({
                        type: "row",
                        orgUnit: { sheet: "National", type: "cell", ref: "C4" },
                        period: { sheet: "National", type: "cell", ref: "F4" },
                        dataElement: { sheet, type: "row", ref: 1 },
                        categoryOption: { type: "value", id: generateUid() },
                        range: {
                            sheet,
                            rowStart: 2 + offset,
                            rowEnd: 2 + offset,
                            columnStart: "A",
                        },
                    }));
            }
        },
    ];

    public readonly styleSources: StyleSource[] = [];

    public async downloadCustomization(
        excelRepository: ExcelRepository,
        instanceRepository: InstanceRepository,
        options: DownloadCustomizationOptions
    ): Promise<void> {
        const { populate, dataPackage, orgUnits } = options;
        const dataValues = _(dataPackage?.dataEntries)
            .filter(({ orgUnit }) => orgUnits[0] === orgUnit)
            .flatMap(({ dataValues }) => dataValues)
            .value();

        const dataSet = await this.getDataForms(instanceRepository);
        const { metadata, antivenomEntries, antivenomProducts } = await this.readDataStore(instanceRepository);

        const getName = (id: string) => {
            return _([
                metadata?.dataElements[id]?.totalName,
                metadata?.optionCombos[id]?.name,
                dataSet?.dataElements.find(de => de.id === id)?.name,
                _.flatMap(dataSet?.dataElements, ({ categoryOptionCombos }) => categoryOptionCombos).find(
                    coc => coc?.id === id
                )?.name,
            ])
                .compact()
                .first();
        };

        const write = (sheet: string, column: string | number, row: number, value: string) =>
            excelRepository.writeCell(
                this.id,
                {
                    type: "cell" as const,
                    sheet: sheet,
                    ref: `${excelRepository.buildColumnName(column)}${row}`,
                },
                value
            );

        const defineName = (sheet: string, column: string, row: number, name: string) =>
            excelRepository.defineName(this.id, `_${name}`, {
                type: "cell" as const,
                sheet: sheet,
                ref: `${column}${row}`,
            });

        const hideRow = (sheet: string, row: number) =>
            excelRepository.hideCells(this.id, {
                type: "row",
                sheet,
                ref: row,
            });

        const style = (
            sheet: string,
            startColumn: string | number,
            startRow: number,
            endColumn: string | number,
            endRow: number,
            style: ThemeStyle
        ) =>
            excelRepository.styleCell(
                this.id,
                {
                    type: "range",
                    sheet,
                    ref: `${excelRepository.buildColumnName(startColumn)}${startRow}:${excelRepository.buildColumnName(
                        endColumn
                    )}${endRow}`,
                },
                style
            );

        // Add metadata sheet
        await excelRepository.getOrCreateSheet(this.id, "Metadata");

        // Add metadata sheet columns
        await promiseMap(["Type", "Identifier", "Name", "Info"], (label, index) =>
            write("Metadata", index + 1, 1, label)
        );

        // Add metadata sheet rows
        const items = _(dataSet?.dataElements)
            .compact()
            .flatten()
            .flatMap(({ id, name, categoryOptionCombos = [] }) => [
                { id, name, type: "dataElement" },
                ...categoryOptionCombos.map(({ id, name }) => ({
                    id,
                    name,
                    type: "categoryOptionCombo",
                })),
            ])
            .union([
                { id: "true", name: "Yes", type: "boolean" },
                { id: "false", name: "No", type: "boolean" },
            ])
            .value();

        const metadataStart = 2;
        await promiseMap(items, async ({ id, name, type }, index) => {
            const label = getName(id) ?? name;
            const info = metadata?.optionCombos[id]?.info ?? "";

            await write("Metadata", "A", index + metadataStart, type);
            await write("Metadata", "B", index + metadataStart, id);
            await write("Metadata", "C", index + metadataStart, label);
            await write("Metadata", "D", index + metadataStart, info);
        });

        await promiseMap(items, async ({ id }, index) => {
            await defineName("Metadata", "C", index + metadataStart, id);
        });

        // Add organisation units sheet
        await excelRepository.getOrCreateSheet(this.id, "OrgUnits");

        // Add organisation units sheet columns
        await promiseMap(["Identifier", "Name", "Selector"], (label, index) => write("OrgUnits", index + 1, 1, label));

        // Add organisation units sheet rows
        const orgUnitStart = 2;
        const availableOrgUnits = _.sortBy(dataSet?.organisationUnits ?? [], "name");

        await promiseMap(availableOrgUnits, async (orgUnit, index) => {
            await write("OrgUnits", 1, index + orgUnitStart, orgUnit.id);
            await write("OrgUnits", 2, index + orgUnitStart, orgUnit.name);
            await write("OrgUnits", 3, index + orgUnitStart, `=_${orgUnit.id}`);
        });

        await promiseMap(availableOrgUnits, async ({ id }, index) => {
            await defineName("OrgUnits", "B", index + orgUnitStart, id);
        });

        // Add Validation sheet
        await excelRepository.getOrCreateSheet(this.id, "Validation");

        // Yes/No exists on Validation!$A$2:$A$3
        await write("Validation", "A", 1, "Yes/No");
        await write("Validation", "A", 2, "=_true");
        await write("Validation", "A", 3, "=_false");
        const validateYesNoFormula = "Validation!$A$2:$A$3";

        // Hide sheets
        await promiseMap(["Metadata", "OrgUnits", "Validation"], sheet => excelRepository.hideSheet(this.id, sheet));

        // Add National sheet
        const dataElements: Array<DataElement & { section?: { id: string; name: string } }> = dataSet?.sections
            ? _.flatMap(dataSet.sections, ({ id, name, dataElements }) =>
                  dataElements.map(dataElement => ({ ...dataElement, section: { id, name } }))
              )
            : dataSet?.dataElements ?? [];

        const antivenomDataElementIds = _.flatMap(antivenomEntries?.groups, group =>
            group.dataElements.map(de => de.id)
        );

        const nationalDataElements = dataElements.filter(({ id }) => !antivenomDataElementIds.includes(id));

        const sectionTitles = _(nationalDataElements)
            .groupBy(({ section }) => section?.name)
            .mapValues(array => _.first(array)?.id)
            .values()
            .compact()
            .value();

        const nationalStart = 6;
        await excelRepository.getOrCreateSheet(this.id, "National");

        // Add section name
        await write("National", "A", 2, "SNAKEBITE ENVENOMING ANNUAL REPORT");
        await style("National", "A", 2, "H", 2, {
            wrapText: true,
            horizontalAlignment: "center",
            rowSize: 50,
            fontSize: 22,
            bold: true,
            merged: true,
        });

        // Add org unit field
        await write("National", "B", 4, "Organisation Unit");
        await style("National", "B", 4, "C", 4, {
            wrapText: true,
            horizontalAlignment: "center",
            merged: false,
            border: true,
        });
        await excelRepository.setDataValidation(
            this.id,
            { type: "cell", ref: "C4", sheet: "National" },
            "OrgUnits!C2:C2048"
        );

        // Add period field
        await write("National", "E", 4, "Period");
        await style("National", "E", 4, "F", 4, {
            wrapText: true,
            horizontalAlignment: "center",
            merged: false,
            border: true,
        });

        await promiseMap(nationalDataElements, async (dataElement, index) => {
            const { categoryOptionCombos = [] } = dataElement;
            const { showTotal = true, totalName, showName = true, backgroundColor = "#EEEEEE" } =
                metadata.dataElements[dataElement.id] ?? {};

            // A new reporting group appears each 6 rows starting from row number 6
            // For each group row 2 is the data element, row 3 is the category and row 4 is the value
            const offset = index * 6;
            const sectionRow = nationalStart + offset;
            const dataElementRow = nationalStart + offset + 2;
            const categoryRow = nationalStart + offset + 3;
            const valueRow = nationalStart + offset + 4;

            // Some data elements have totals included that move the categories one column to the right
            // These totals are ignored during import as they're only formulas
            const categoryStartColumn = showTotal ? 2 : 1;
            const lastCategoryColumn = categoryStartColumn + categoryOptionCombos.length;

            const baseStyle: ThemeStyle = {
                wrapText: true,
                horizontalAlignment: "center",
                rowSize: 45,
                columnSize: 25,
            };

            const sectionStyle: ThemeStyle = {
                ...baseStyle,
                fontSize: 18,
                bold: true,
                merged: true,
            };

            const dataElementStyle: ThemeStyle = {
                ...baseStyle,
                fillColor: backgroundColor,
                border: true,
                merged: true,
            };

            const categoryStyle = (_cocColor?: string, cocBackgroundColor?: string): ThemeStyle => ({
                ...baseStyle,
                fillColor: cocBackgroundColor ?? backgroundColor,
                border: true,
                merged: false,
            });

            const valueStyle: ThemeStyle = {
                ...baseStyle,
                border: true,
                merged: false,
            };

            // Add section name
            await write("National", "A", sectionRow, dataElement.section?.name ?? "");
            await style("National", "A", sectionRow, "H", sectionRow, sectionStyle);
            if (!sectionTitles.includes(dataElement.id)) hideRow("National", sectionRow);

            // Add data element row
            await write("National", "A", dataElementRow, `=_${dataElement.id}`);
            await style("National", "A", dataElementRow, lastCategoryColumn - 1, dataElementRow, dataElementStyle);
            if (!showName) hideRow("National", dataElementRow);

            // Add totals
            if (showTotal) {
                await write("National", "A", categoryRow, totalName ?? "Total");
                await write(
                    "National",
                    "A",
                    valueRow,
                    `=SUM(B${valueRow}:${excelRepository.buildColumnName(lastCategoryColumn)}${valueRow})`
                );
            }

            // Add category option combos
            const sortedOptionCombos = _.sortBy(
                categoryOptionCombos.map(optionCombo => {
                    const { order = 0 } = metadata.optionCombos[optionCombo.id] ?? {};
                    return { ...optionCombo, order: order };
                }),
                ["order"]
            );

            await promiseMap(sortedOptionCombos, async (category, catIndex) => {
                const { color, backgroundColor } = metadata.optionCombos[category.id] ?? {};

                await write("National", categoryStartColumn + catIndex, categoryRow, `=_${category.id}`);

                await style(
                    "National",
                    "A",
                    categoryRow,
                    lastCategoryColumn - 1,
                    categoryRow,
                    categoryStyle(color, backgroundColor)
                );
            });

            // Style value rows
            await style("National", "A", valueRow, lastCategoryColumn - 1, valueRow, valueStyle);
        });

        // Add antivenom product sheets
        await promiseMap(antivenomEntries.groups, async group => {
            const sheetName = group.name ?? group.id;
            await excelRepository.getOrCreateSheet(this.id, sheetName);

            await promiseMap(group.dataElements, async (dataElement, index) => {
                await write(sheetName, index + 1, 1, `=_${dataElement.id}`);

                if (dataElement.prop === "monovalent" || dataElement.prop === "polyvalent") {
                    const column = excelRepository.buildColumnName(index + 1);
                    await excelRepository.setDataValidation(
                        this.id,
                        { type: "range", ref: `${column}2:${column}2048`, sheet: sheetName },
                        validateYesNoFormula
                    );
                }
            });

            await style(sheetName, "A", 1, group.dataElements.length, 1, {
                wrapText: true,
                horizontalAlignment: "center",
                rowSize: 45,
                columnSize: 30,
                fillColor: "#EEEEEE",
                merged: false,
                border: true,
            });
        });

        if (populate) {
            const recommendedSelector = _.flatMap(antivenomEntries.groups, ({ dataElements }) => dataElements).find(
                ({ recommendedProductsSelector }) => recommendedProductsSelector === true
            )?.id;

            await promiseMap(antivenomEntries.groups, async group => {
                const sheetName = group.name ?? group.id;

                const isRecomended = !!group.dataElements.find(({ id }) => id === recommendedSelector);

                const products = antivenomProducts.filter(({ recommended }) => isRecomended === recommended);

                await promiseMap(products, async (product, rowIndex) => {
                    await promiseMap(group.dataElements, async (dataElement, columnIndex) => {
                        const dataValue = dataValues.find(
                            entry =>
                                entry.dataElement === dataElement.id && entry.category === product.categoryOptionComboId
                        );

                        const value = String(
                            dataValue?.value ?? product[dataElement.prop as keyof typeof product] ?? ""
                        );

                        await write(sheetName, columnIndex + 1, rowIndex + 2, value);
                    });
                });
            });
        }
    }

    public async importCustomization(
        _excelRepository: ExcelRepository,
        instanceRepository: InstanceRepository,
        options: ImportCustomizationOptions
    ): Promise<DataPackage | undefined> {
        const { dataPackage } = options;
        const dataSet = await this.getDataForms(instanceRepository);

        const dataEntries = await promiseMap(dataPackage.dataEntries, async ({ dataValues, ...dataPackage }) => {
            const { antivenomEntries, antivenomProducts } = await this.readDataStore(instanceRepository);

            const antivenomDataElements = _.flatMap(antivenomEntries.groups, ({ dataElements }) => dataElements);

            const antivenomDataElementIds = antivenomDataElements.map(({ id }) => id);

            const recommendedSelector = antivenomDataElements.find(
                ({ recommendedProductsSelector }) => recommendedProductsSelector === true
            )?.id;

            const getDataElementsByProp = (prop: string) =>
                antivenomDataElements.filter(dataElement => prop === dataElement.prop).map(({ id }) => id);

            const productByCategory = _(dataValues)
                .groupBy("category")
                .mapValues(values => {
                    const productItem = values.find(({ dataElement }) =>
                        getDataElementsByProp("productName").includes(dataElement)
                    );

                    const product = antivenomProducts.find(({ productName }) => productName === productItem?.value);

                    return product;
                })
                .value();

            const freeCategories = _(getDataElementsByProp("productName"))
                .map(id => dataSet?.dataElements.find(dataElement => dataElement.id === id))
                .compact()
                .groupBy("id")
                .mapValues(dataElements =>
                    _.flatMap(
                        dataElements,
                        ({ categoryOptionCombos }) =>
                            categoryOptionCombos
                                ?.filter(
                                    ({ id }) =>
                                        !antivenomProducts.find(
                                            ({ categoryOptionComboId }) => categoryOptionComboId === id
                                        )
                                )
                                .map(({ id }) => id) ?? []
                    )
                )
                .value();

            const nationalDataValues = dataValues.filter(
                ({ dataElement }) => !antivenomDataElementIds.includes(dataElement)
            );

            const [existingProducts, newProducts] = _.partition(dataValues, dataValue => {
                const isProduct = antivenomDataElementIds.includes(dataValue.dataElement);
                const exists = !!dataValue.category && !!productByCategory[dataValue.category];
                return isProduct && exists;
            });

            const cleanExistingProducts = _.compact(
                existingProducts.map(({ category = "", ...dataValue }) => {
                    const product = productByCategory[category];
                    // TODO: Filter data elements so that are not overwritten (manufacturer name, etc...)
                    // Waiting for Jorge's implementation

                    return {
                        ...dataValue,
                        category: product?.categoryOptionComboId ?? category,
                    };
                })
            );

            const cleanNewProducts = _(newProducts)
                .groupBy("category")
                .mapValues(dataValues => {
                    const productNameDataElement = dataValues.find(({ dataElement }) =>
                        getDataElementsByProp("productName").includes(dataElement)
                    )?.dataElement;
                    if (!productNameDataElement) return [];

                    const [category] = _.pullAt(freeCategories[productNameDataElement] ?? [], [0]);
                    if (!category) {
                        throw new Error(
                            i18n.t(
                                "It is not possible to create products. The maximum number of products has been reached. Please contact your administrator."
                            )
                        );
                    }

                    return dataValues.map(dataValue => ({ ...dataValue, category }));
                })
                .values()
                .flatten()
                .value();

            const newAntivenomProducts = _(cleanNewProducts)
                .groupBy("category")
                .mapValues((dataValues, categoryOptionComboId) => {
                    const getField = (field: string) => {
                        const result = dataValues.find(({ dataElement }) =>
                            getDataElementsByProp(field).includes(dataElement)
                        )?.value;

                        if (!result) {
                            throw new Error(
                                i18n.t("It is not possible to create product. Please provide {{field}}.", { field })
                            );
                        }

                        return result;
                    };

                    const recommended =
                        dataValues.find(({ dataElement }) => recommendedSelector === dataElement) !== undefined;

                    return {
                        categoryOptionComboId,
                        recommended,
                        deleted: false,
                        monovalent: getField("monovalent"),
                        polyvalent: getField("polyvalent"),
                        productName: getField("productName"),
                        manufacturerName: getField("manufacturerName"),
                    };
                })
                .values()
                .value();

            try {
                const products = AntivenomProductsModel.decode([...antivenomProducts, ...newAntivenomProducts])
                    .ifLeft(error => {
                        console.error(error);
                        throw new Error(error);
                    })
                    .orDefault([]);

                await this.saveAntivenomProducts(instanceRepository, products);
            } catch (error) {
                console.error(error);
                throw new Error(
                    i18n.t("Could not import products. Invalid data received. Please review the excel file.")
                );
            }

            return {
                ...dataPackage,
                dataValues: [...nationalDataValues, ...cleanExistingProducts, ...cleanNewProducts],
            };
        });

        return { type: "dataSets", dataEntries };
    }

    @cache()
    private async getDataForms(instanceRepository: InstanceRepository): Promise<DataForm | undefined> {
        const dataForms = await instanceRepository.getDataForms({
            ids: ["XBgvNrxpcDC"],
            type: ["dataSets"],
        });

        return dataForms.find(({ id }) => id === "XBgvNrxpcDC");
    }

    private async readDataStore(
        instanceRepository: InstanceRepository
    ): Promise<{
        metadata: CustomMetadata;
        antivenomEntries: AntivenomEntries;
        antivenomProducts: AntivenomProducts;
    }> {
        const dataStore = instanceRepository.getDataStore("snake-bite");

        const readDataStore = async <T>(key: string, model: Codec<T>): Promise<T> => {
            const response = await dataStore.get(key).getData();

            const value = model
                .decode(response)
                .ifLeft(error => console.error(error))
                .toMaybe()
                .extract();

            if (!value) {
                throw new Error(
                    i18n.t("Snake bite data store {{type}} is corrupted. Please contact an administrator.", {
                        type: key,
                    })
                );
            }

            return value as T;
        };

        return {
            metadata: await readDataStore("customMetadata", CustomMetadataModel),
            antivenomEntries: await readDataStore("antivenomEntries", AntivenomEntriesModel),
            antivenomProducts: await readDataStore("antivenomProducts", AntivenomProductsModel),
        };
    }

    private async saveAntivenomProducts(
        instanceRepository: InstanceRepository,
        products: AntivenomProducts
    ): Promise<void> {
        const dataStore = instanceRepository.getDataStore("snake-bite");
        await dataStore.save("antivenomProducts", products).getData();
    }
}

const CustomMetadataModel = Schema.object({
    dataElements: Schema.optionalSafe(
        Schema.dictionary(
            Schema.string,
            Schema.object({
                totalName: Schema.optional(Schema.string),
                showName: Schema.optionalSafe(Schema.boolean, true),
                showTotal: Schema.optionalSafe(Schema.boolean, true),
                backgroundColor: Schema.optional(Schema.color),
                color: Schema.optional(Schema.color),
                info: Schema.optional(Schema.string),
                defaultCatOptionComboName: Schema.optional(Schema.string), // Not used in excel
            })
        ),
        {}
    ),
    optionCombos: Schema.optionalSafe(
        Schema.dictionary(
            Schema.string,
            Schema.object({
                name: Schema.optional(Schema.string),
                info: Schema.optional(Schema.string),
                order: Schema.optionalSafe(Schema.integer, 0),
                backgroundColor: Schema.optional(Schema.color),
                color: Schema.optional(Schema.color),
            })
        ),
        {}
    ),
    adminUserGroups: Schema.optionalSafe(Schema.array(Schema.string), []),
});

const AntivenomEntriesModel = Schema.object({
    section: Schema.optionalSafe(Schema.integer, 0),
    groups: Schema.optionalSafe(
        Schema.array(
            Schema.object({
                id: Schema.optionalSafe(Schema.string, generateUid),
                name: Schema.optional(Schema.string),
                title: Schema.optional(Schema.string),
                addEntryButton: Schema.optional(Schema.string),
                dataElements: Schema.optionalSafe(
                    Schema.array(
                        Schema.object({
                            id: Schema.optionalSafe(Schema.string, generateUid),
                            prop: Schema.optionalSafe(Schema.string, ""),
                            recommendedProductsSelector: Schema.optionalSafe(Schema.boolean, false),
                            disabled: Schema.optionalSafe(Schema.boolean, false),
                        })
                    ),
                    []
                ),
            })
        ),
        []
    ),
});

const AntivenomProductsModel = Schema.array(
    Schema.object({
        monovalent: Schema.optionalSafe(Schema.boolean, false),
        polyvalent: Schema.optionalSafe(Schema.boolean, false),
        productName: Schema.optionalSafe(Schema.string, ""),
        recommended: Schema.optionalSafe(Schema.boolean, false),
        manufacturerName: Schema.optionalSafe(Schema.string, ""),
        categoryOptionComboId: Schema.optionalSafe(Schema.string, ""),
        deleted: Schema.optionalSafe(Schema.boolean, false),
    })
);

type CustomMetadata = GetSchemaType<typeof CustomMetadataModel>;
type AntivenomEntries = GetSchemaType<typeof AntivenomEntriesModel>;
type AntivenomProducts = GetSchemaType<typeof AntivenomProductsModel>;
