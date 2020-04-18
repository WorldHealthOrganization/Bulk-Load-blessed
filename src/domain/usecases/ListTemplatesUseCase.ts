import { TemplateRepository } from "../repositories/TemplateRepository";

export class ListTemplatesUseCase {
    constructor(private templateProvider: TemplateRepository) {}

    public execute(): { value: string; label: string }[] {
        return this.templateProvider
            .listTemplates()
            .map(({ id, name }) => ({ value: id, label: name }));
    }
}
