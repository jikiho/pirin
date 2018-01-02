/**
 * Metadata model (the form or value state changing in time).
 */
class MetadataModel {
    user: string;
    timestamp: string;
    state?: string;
    version?: number;

    // conversion names
    static readonly USER = 'DUSR';
    static readonly TIMESTAMP = 'DDTS';
    static readonly STATE = 'DFOS';
    static readonly VERSION = 'DVER';
}

/**
 * Value model (the form values).
 */
class ValueModel {
    id: string;
    status: string;
    ebk: string;
    cpv: string;
    funding: string;
    amount: number;
    metadata: MetadataModel

    // conversion names
    static readonly ID = 'id';
    static readonly STATUS = 'DITS';
    static readonly EBK = 'DEBK';
    static readonly CPV = 'DCPV';
    static readonly FUNDING = 'DFUN';
    static readonly AMOUNT = 'DAMT';
    //static readonly CURRENCY = 'DCUR';
}

/**
 * Form model (form data, metadata and values).
 */
export class FormModel {
    id: string;
    name: string;
    type: string;
    period: string;
    organization: string;
    values: ValueModel[];
    metadata: MetadataModel;

    // conversion names
    static readonly ID = 'id';
    static readonly NAME = 'name';
    static readonly TYPE = 'DFOT';
    static readonly PERIOD = 'DPER';
    static readonly ORGANIZATION = 'DORG';

    static convert(item: any): FormModel {
        let metadata = {},
            values = {},
            children = [];

        if (item.metadata) {
            for (let data of item.metadata) {
                metadata[data.dimension.code] = data.value;
            }
        }

        if (item.values) {
            for (let data of item.values) {
                values[data.dimension.code] = data.value;
            }
        }

        if (item.children) {
            for (let child of item.children) {
                let metadata = {},
                    values = {};

                for (let data of child.metadata) {
                    metadata[data.dimension.code] = data.value;
                }

                for (let data of child.values) {
                    values[data.dimension.code] = data.value;
                }

                children.push({
                    id: child.id,
                    name: child.name,
                    metadata,
                    values
                });
            }
        }

        return Object.assign(new FormModel(), {
            id: item[FormModel.ID],
            name: item[FormModel.NAME],
            type: values[FormModel.TYPE],
            period: values[FormModel.PERIOD] && values[FormModel.PERIOD].replace(/-Y$/, ''),
            organization: values[FormModel.ORGANIZATION],
            metadata: Object.assign(new MetadataModel(), {
                user: metadata[MetadataModel.USER],
                timestamp: metadata[MetadataModel.TIMESTAMP],
                state: values[MetadataModel.STATE],
                version: metadata[MetadataModel.VERSION]
            }),
            values: children.map(child => Object.assign(new ValueModel(), {
                id: child.id,
                status: child.values[ValueModel.STATUS],
                name: child.name,
                ebk: child.values[ValueModel.EBK],
                cpv: child.values[ValueModel.CPV],
                funding: child.values[ValueModel.FUNDING],
                amount: child.values[ValueModel.AMOUNT],
                metadata: Object.assign(new MetadataModel(), {
                    user: child.metadata[MetadataModel.USER],
                    timestamp: child.metadata[MetadataModel.TIMESTAMP]
                })
            }))
        });
    }
}
