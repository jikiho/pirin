class MetadataModel {
    state: string;
    version: number;
    user: string;
    timestamp: string;
}

class ValueModel {
    id: string;
    //name: string;
    status: string;
    ebk: string;
    ebkTitle: string;
    cpv: string;
    cpvTitle: string;
    funding: string;
    amount: number;
    user: string;
    timestamp: string;
}

export class DatasetModel {
    id: string;
    name: string;
    type: string;
    period: string;
    organization: string;
    metadata: MetadataModel;
    values: ValueModel[];

    static convert(item: any): DatasetModel {
        let metadata = {},
            values = {},
            children = [];

        if (item.metadata) {
            for (let data of item.metadata) {
                metadata[data.dimension.alias] = data.value;
            }
        }

        if (item.values) {
            for (let data of item.values) {
                values[data.dimension.alias] = data.value;
            }
        }

        if (item.children) {
            for (let child of item.children) {
                let metadata = {},
                    values = {};

                for (let data of child.metadata) {
                    metadata[data.dimension.alias] = data.value;
                }

                for (let data of child.values) {
                    values[data.dimension.alias] = data.value;
                }

                children.push({
                    id: child.id,
                    //name: child.name,
                    metadata,
                    values
                });
            }
        }

        return item.metadata && Object.assign(new DatasetModel(), {
            id: item.id,
            name: item.name,
            type: values['type'] ? values['type'].name : undefined,
            period: values['period'] ? values['period'].name.replace(/-Q0$/, '') : undefined,
            organization: values['organization'] ? values['organization'].name : undefined,
            metadata: {
                state: values['state'] ? values['state'].name : undefined,
                version: 0,
                user: metadata['user'],
                timestamp: metadata['timeStamp']
            },
            values: children.map(child => {
                return {
                    id: child.id,
                    //name: child.name,
                    status: child.values.itemStatus.name,
                    ebk: child.values.ebk.code,
                    ebkTitle: child.values.ebk.name,
                    cpv: child.values.cpv.code,
                    cpvTitle: child.values.cpv.name,
                    funding: child.values.funding.code,
                    amount: child.values.amount,
                    user: child.metadata.user,
                    timestamp: child.metadata.timeStamp
                }
            })
        });
    }
}
