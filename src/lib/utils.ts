export function mapObj(obj, predicate: (item: any) => any) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = predicate(obj[key]);
        return acc;
    }, {});
}