export function resetObjectTodefault(obj: any, defaultObj: any): void {
    console.log(obj, defaultObj);
    for (const key in defaultObj) {
        if (obj.hasOwnProperty(key)) {
            console.log(typeof obj[key],obj[key]);
            if (typeof obj[key] === "object" && obj[key] !== null) {
                resetObjectTodefault(obj[key], defaultObj[key]);
            } else {
                obj[key] = defaultObj[key];
            }
        }
    }
}
