import { DataSource, GeneratedTemplate, StyleSource } from "../../../domain/entities/Template";

export class OldGenerated01 implements GeneratedTemplate {
    public readonly type = "generated";
    public readonly id = "OLD_GENERATED_v1";
    public readonly name = "Auto-generated dataSet template";

    public readonly rowOffset = 0;
    public readonly colOffset = 0;

    public readonly dataSources: DataSource[] = [];

    public readonly styleSources: StyleSource[] = [];
}
