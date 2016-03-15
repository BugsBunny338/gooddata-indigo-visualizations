import { transformConfigToLine } from '../src/chartConfigCreators';

describe('chartConfigCreators', () => {
    describe('transformConfigToLine', () => {
        const category = {
            type: 'attribute',
            collection: 'stack',
            displayForm: '/gdc/md/project/obj/2'
        };

        const config = {
            type: 'column',
            buckets: {
                measures: [
                    {
                        measure: {
                            type: 'metric',
                            objectUri: '/gdc/md/project/obj/1'
                        }
                    }
                ],
                categories: [
                    { category }
                ],
                filters: []
            }
        };

        it('converts object with stack', () => {
            let lineConfig = transformConfigToLine(Object.assign({}, config));
            expect(lineConfig).to.eql({
                type: 'column',
                x: '/gdc/md/project/obj/2',
                y: '/metricValues',
                color: '/gdc/md/project/obj/2',
                stacking: true,
                where: {},
                orderBy: []
            });
        });

        it('converts object without stack', () => {
            let withoutStackConfig = Object.assign({}, config);
            withoutStackConfig.buckets.categories[0].category = Object.assign(
                {}, category, { collection: 'attribute' }
            );

            let lineConfig = transformConfigToLine(withoutStackConfig);
            expect(lineConfig).to.eql({
                type: 'column',
                x: '/gdc/md/project/obj/2',
                y: '/metricValues',
                color: '/metricGroup',
                stacking: false,
                where: {},
                orderBy: []
            });
        });
    });
});
