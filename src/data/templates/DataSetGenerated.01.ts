import { DataSource, GeneratedTemplate, StyleSource } from "../../domain/entities/Template";
import { removeCharacters } from "../../utils/string";

export default class implements GeneratedTemplate {
    public readonly id = "DATASET_GENERATED_v1";
    public readonly name = "Auto-generated dataSet template";

    public readonly rowOffset = 5;
    public readonly colOffset = 0;

    public readonly dataSources: DataSource[] = [
        {
            type: "row",
            orgUnit: {
                sheet: "Data Entry",
                type: "column",
                ref: "A",
            },
            period: {
                sheet: "Data Entry",
                type: "column",
                ref: "B",
            },
            attribute: {
                sheet: "Data Entry",
                type: "column",
                ref: "C",
            },
            range: {
                sheet: "Data Entry",
                rowStart: 8,
                columnStart: "D",
            },
            dataElement: {
                sheet: "Data Entry",
                type: "row",
                ref: 6,
            },
            categoryOption: {
                sheet: "Data Entry",
                type: "row",
                ref: 7,
            },
        },
    ];

    public readonly styleSources: StyleSource[] = [
        {
            section: "header",
            source: {
                type: "range",
                ref: "D2:I2",
                sheet: "Data Entry",
            },
        },
        {
            section: "title",
            source: {
                type: "range",
                ref: "D3:I3",
                sheet: "Data Entry",
            },
        },
        {
            section: "subtitle",
            source: {
                type: "range",
                ref: "D4:I4",
                sheet: "Data Entry",
            },
        },
        {
            section: "footer",
            source: {
                type: "range",
                ref: "D5:I5",
                sheet: "Data Entry",
            },
        },
        {
            section: "logo",
            source: {
                type: "range",
                ref: "A2:C5",
                sheet: "Data Entry",
            },
        },
    ];

    public writeId(id: string | number): string | number {
        return `=_${id}`;
    }

    public readId(string: string | number): string | number {
        return removeCharacters(string);
    }
}
