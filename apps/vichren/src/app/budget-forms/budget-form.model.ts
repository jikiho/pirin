/**
 * Budget form model.
 */
import {BehaviorSubject} from 'rxjs/Rx';

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

class ValueModel {
    number: number;
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
}

export class BudgetFormModel {
    number: number;
    id: string;
    name: string;
    type: string;
    period: string;
    organization: string;
    values: ValueModel[];
    metadata: MetadataModel;

    clone(...args) {
        return Object.assign.apply(this, [new BudgetFormModel(), this, ...args])
    }

    // conversion names
    static readonly ID = 'id';
    static readonly NAME = 'name';
    static readonly TYPE = 'DFOT';
    static readonly PERIOD = 'DPER';
    static readonly ORGANIZATION = 'DORG';

    static convert(item: any, index: number = -1): BudgetFormModel {
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

        return Object.assign(new BudgetFormModel(), {
            number: index + 1,
            id: item[BudgetFormModel.ID],
            name: item[BudgetFormModel.NAME],
            type: values[BudgetFormModel.TYPE],
            period: values[BudgetFormModel.PERIOD] && values[BudgetFormModel.PERIOD].replace(/-Y$/, ''),
            organization: values[BudgetFormModel.ORGANIZATION],
            metadata: Object.assign(new MetadataModel(), {
                user: metadata[MetadataModel.USER],
                timestamp: metadata[MetadataModel.TIMESTAMP],
                state: values[MetadataModel.STATE],
                version: metadata[MetadataModel.VERSION]
            }),
            values: children.map((child, index) => Object.assign(new ValueModel(), {
                number: index + 1,
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
