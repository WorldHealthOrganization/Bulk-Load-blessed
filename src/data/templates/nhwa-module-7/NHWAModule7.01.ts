import { CustomTemplate, DataSource, StyleSource } from "../../../domain/entities/Template";

export class NHWAModule701 implements CustomTemplate {
    public readonly type = "custom";
    public readonly id = "NHWA_MODULE_7_v1";
    public readonly name = "NHWA Module 7";
    public readonly url = "templates/NHWA_Module_7.xlsx";
    public readonly dataFormId = { type: "value" as const, id: "ZRsZdd2AvAR" };
    public readonly dataFormType = { type: "value" as const, id: "dataSets" as const };

    public readonly dataSources: DataSource[] = [
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "gNDFctqpNyv" },
            categoryOption: { type: "value", id: "IMqululFzhP" },
            ref: { type: "cell", sheet: "Expenditure", ref: "E8" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "gNDFctqpNyv" },
            categoryOption: { type: "value", id: "N3nYJ6ScaYx" },
            ref: { type: "cell", sheet: "Expenditure", ref: "F8" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "gNDFctqpNyv" },
            categoryOption: { type: "value", id: "UKbfaRlqkpY" },
            ref: { type: "cell", sheet: "Expenditure", ref: "G8" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "Wgfv9IaDiWM" },
            categoryOption: { type: "value", id: "Xr12mI7VPn3" },
            ref: { type: "cell", sheet: "Expenditure", ref: "G12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "CvaGFNVhuQl" },
            categoryOption: { type: "value", id: "Pva8axKgU16" },
            ref: { type: "cell", sheet: "Expenditure", ref: "D16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "CvaGFNVhuQl" },
            categoryOption: { type: "value", id: "tOubXDEXuXK" },
            ref: { type: "cell", sheet: "Expenditure", ref: "E16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "CvaGFNVhuQl" },
            categoryOption: { type: "value", id: "BEmreemK803" },
            ref: { type: "cell", sheet: "Expenditure", ref: "F16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "CvaGFNVhuQl" },
            categoryOption: { type: "value", id: "qPPju3xBhV9" },
            ref: { type: "cell", sheet: "Expenditure", ref: "G16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "l5RPrypr3Wg" },
            categoryOption: { type: "value", id: "LfoJLP7BbDk" },
            ref: { type: "cell", sheet: "Expenditure", ref: "E20" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "l5RPrypr3Wg" },
            categoryOption: { type: "value", id: "hL8lKfXNzln" },
            ref: { type: "cell", sheet: "Expenditure", ref: "F20" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Expenditure", type: "cell", ref: "V2" },
            period: { sheet: "Expenditure", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "l5RPrypr3Wg" },
            categoryOption: { type: "value", id: "VWIQFya88eZ" },
            ref: { type: "cell", sheet: "Expenditure", ref: "G20" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "aBpbcEgtzgw" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D10" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "aBpbcEgtzgw" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E10" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "aBpbcEgtzgw" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F10" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "aBpbcEgtzgw" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G10" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "aBpbcEgtzgw" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H10" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "aBpbcEgtzgw" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I10" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "LHbCtHlZr3Y" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D11" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "LHbCtHlZr3Y" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E11" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "LHbCtHlZr3Y" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F11" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "LHbCtHlZr3Y" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G11" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "LHbCtHlZr3Y" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H11" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "LHbCtHlZr3Y" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I11" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "VtVkbvygJnm" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "VtVkbvygJnm" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "VtVkbvygJnm" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "VtVkbvygJnm" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "VtVkbvygJnm" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "VtVkbvygJnm" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I12" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "fGOgbIqsxDn" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D13" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "fGOgbIqsxDn" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E13" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "fGOgbIqsxDn" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F13" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "fGOgbIqsxDn" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G13" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "fGOgbIqsxDn" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H13" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "fGOgbIqsxDn" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I13" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "MPzyVWiSFF2" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D14" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "MPzyVWiSFF2" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E14" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "MPzyVWiSFF2" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F14" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "MPzyVWiSFF2" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G14" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "MPzyVWiSFF2" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H14" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "MPzyVWiSFF2" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I14" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "ALBRKpJsddQ" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D15" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "ALBRKpJsddQ" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E15" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "ALBRKpJsddQ" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F15" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "ALBRKpJsddQ" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G15" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "ALBRKpJsddQ" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H15" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "ALBRKpJsddQ" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I15" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "FVANVRToxVF" },
            categoryOption: { type: "value", id: "iWRW6jXAzvP" },
            ref: { type: "cell", sheet: "Remuneration", ref: "D16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BOsqct4iCpa" },
            categoryOption: { type: "value", id: "iWRW6jXAzvP" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "H6pdAoosHWN" },
            categoryOption: { type: "value", id: "iWRW6jXAzvP" },
            ref: { type: "cell", sheet: "Remuneration", ref: "F16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "BCjjT4Xujzu" },
            categoryOption: { type: "value", id: "iWRW6jXAzvP" },
            ref: { type: "cell", sheet: "Remuneration", ref: "G16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "oTcSBrUk1hs" },
            categoryOption: { type: "value", id: "iWRW6jXAzvP" },
            ref: { type: "cell", sheet: "Remuneration", ref: "H16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "kOWad32u5xr" },
            categoryOption: { type: "value", id: "iWRW6jXAzvP" },
            ref: { type: "cell", sheet: "Remuneration", ref: "I16" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "M7R7LVsXlAN" },
            categoryOption: { type: "value", id: "Xr12mI7VPn3" },
            ref: { type: "cell", sheet: "Remuneration", ref: "N20" },
        },
        {
            type: "cell",
            orgUnit: { sheet: "Remuneration", type: "cell", ref: "N2" },
            period: { sheet: "Remuneration", type: "cell", ref: "I4" },
            dataElement: { type: "value", id: "cXn60b9eotz" },
            categoryOption: { type: "value", id: "Xr12mI7VPn3" },
            ref: { type: "cell", sheet: "Remuneration", ref: "E20" },
        },
    ];

    public readonly styleSources: StyleSource[] = [];
}
