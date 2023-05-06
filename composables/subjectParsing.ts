export function parseSubjectDataIMG(subjects: string[], user: string) {
    let subjectsArray: Subject[] = [];
    for (let i = 0; i < subjects.length; i++) {
        // console.log(subjects[i]);
        // const subjectArray: string[] = subjects[i].replace(/\n/g, ' ').replace(')', ']').replace('(', '[').split(/[\[\]]/);
        const subjectArray: string[] = errorCorrection(subjects[i]).split(']');
        // console.log(subjectArray.join("#"));

        if (subjectArray.length <= 1) continue;
        
        nextItem:
        for (let j = 0; j < subjectArray.length - 1; j++) {
            const strArray: string[] = subjectArray[j].split('.');
            for (let k = 0; k < strArray.length; k++) {
                if (strArray[k].includes('[')) {
                    if (k < 5 || k > 6) {
                        continue nextItem;
                    } else {
                        break;
                    }
                }
            }

            try {
                if (user === "professor") {
                    let n = 0;
                    const groups = strArray[0].split(',');
                    const name = capitalizeFirstLetter(strArray[1].replace(/^\s+|\s+$/g,''));
                    const type = strArray[2].replace(/\s+/g, '').replace("лекции", "Лекции").replace("семинар", "Cеминары").replace("лабораторныезанятия", "Лабораторные занятия");
                    let subgroup = "";
                    if (type.includes("Лабораторные занятия")) {
                        if (strArray[3].includes("(А)") || strArray[3].includes("(Б)")) {
                            subgroup = strArray[3];
                            n++;
                        }
                    }
                    
                    const location = strArray[n + 3].replace(" ", "");
                    let dates = strArray[n + 4] + '.';
                    for (let p = n + 5; p < strArray.length; p++) {
                        dates += strArray[p] + '.';
                    }

                    const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i);
                    subjectsArray.push(subject);
                } else {
                    let n = 0;
                    const groups = [capitalizeFirstLetter(strArray[1].replace(/^\s+|\s+$/g,''))
                                    .replace(/.$/, a => a[0].toUpperCase())
                                    + '.' + strArray[2].toUpperCase() + '.'];
                    const name = capitalizeFirstLetter(strArray[0].replace(/^\s+|\s+$/g,''));
                    const type = strArray[3].replace(/\s+/g, '').replace("лекции", "Лекции").replace("семинар", "Cеминары").replace("лабораторныезанятия", "Лабораторные занятия");
                    let subgroup = "";
                    if (type.includes("Лабораторные занятия")) {
                        if (strArray[4].includes("а") || strArray[4].includes("б")) {
                            subgroup = '(' + strArray[4].toUpperCase() + ')';
                            n++;
                        }
                    }

                    const location = strArray[n + 4].replace(" ", "");
                    let dates = strArray[n + 5] + '.';
                    for (let p = n + 6; p < strArray.length; p++) {
                        dates += strArray[p] + '.';
                    }

                    const dates2 = '[' + dates.slice(0, -1).replace(/\[|\]/g, '').replace(/^\s+|\s+$/g,'') + ']';

                    const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates2, parseDates(dates.slice(0, -1)), i);
                    subjectsArray.push(subject);
                }
            } catch {
                // console.log(strArray)
            }

            // console.log(subject);
        }
    }
    
    // console.log(subjectsArray.value);
    return removeDoubles(subjectsArray);
}

function errorCorrection(str: string) {
    let output = str.toLowerCase()
                    .replace(/\)/g, ']')
                    .replace(/\(/g, '[')
                    .replace(/\n/g, ' ')
                    .split('');

    let outStr = "";
    for (let i = 0; i < output.length; i++) {
        if (output[i] === '[') {
            if (/\d/.test(output[i + 1]) && /\d/.test(output[i + 2]) && /\./.test(output[i + 3])) {
                outStr += output[i];
            }
        } else if (output[i] === ']') {
            if (/\./.test(output[i - 1])) {
                outStr += output[i];
            } else if (/\d/.test(output[i - 1]) && /\d/.test(output[i - 2]) && /\./.test(output[i - 3])) {
                outStr += output[i];
            }
        } else {
            outStr += output[i];
        }
    }

    // console.log(str);
    // console.log(output.join(""));
    // console.log(outStr);
    return outStr;
}

function removeDoubles(subjectsArray: Subject[]) {
    let outputArray: Subject[] = [];
    let flag = false;
    for (let i = 0; i < subjectsArray.length; i++) {
        for (let j = 0; j < outputArray.length; j++) {
            const timeFrame = outputArray[j].time - subjectsArray[i].time;
            if (timeFrame === 0 || timeFrame === 7 || timeFrame === 8) {
                // if (subjectsArray[i].name === "Современные технологии и средства разработки программного обеспечения" && outputArray[j].name ==="Современные технологии и средства разработки программного обеспечения") console.log(subjectsArray[i], outputArray[j], timeFrame)
                if (subjectsArray[i].subgroup === outputArray[j].subgroup) {
                    if (subjectsArray[i].dateStr.replace(/[ \[\]\.\-кчн]/g, '') === outputArray[j].dateStr.replace(/[ \[\]\.\-кчн]/g, '')) {
                        flag = true;
                    }
                }
            }
        }

        if (!flag) outputArray.push(subjectsArray[i]);
        else console.log(subjectsArray[i])
        flag = false;
    }

    console.log(outputArray)
    return outputArray;
}

export function parseSubjectData(subjects: string[], user: string) {
    let subjectsArray: Subject[] = [];
    for (let i = 0; i < 8; i++) {
        const subjectArray: string[] = subjects[i].split(']');

        if (subjectArray.length <= 1) continue;
        
        for (let j = 0; j < subjectArray.length - 1; j++) {
            subjectArray[j] += ']';
            const strArray: string[] = subjectArray[j].split('.');
            try {
                if (user === "professor") {
                    let n = 0;
                    const groups = strArray[0].split(',');
                    const name = strArray[1];
                    const type = strArray[2].replace(/\s+/g, '').replace("лекции", "Лекции").replace("семинар", "Cеминары").replace("лабораторныезанятия", "Лабораторные занятия");
                    let subgroup = "";
                    if (type.includes("Лабораторные занятия")) {
                        if (strArray[3].includes("(А)") || strArray[3].includes("(Б)")) {
                            subgroup = strArray[3];
                            n++;
                        }
                    }
                    
                    const location = strArray[n + 3].replace(" ", "");
                    let dates = strArray[n + 4] + '.';
                    for (let p = n + 5; p < strArray.length; p++) {
                        dates += strArray[p] + '.';
                    }

                    const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i);
                    subjectsArray.push(subject);
                } else {
                    let n = 0;
                    const groups = [strArray[1] + '.' + strArray[2] + '.'];
                    const name = strArray[0];
                    const type = strArray[3].replace(/\s+/g, '').replace("лекции", "Лекции").replace("семинар", "Cеминары").replace("лабораторныезанятия", "Лабораторные занятия");
                    let subgroup = "";
                    if (type.includes("Лабораторные занятия")) {
                        if (strArray[4].includes("(А)") || strArray[4].includes("(Б)")) {
                            subgroup = strArray[4];
                            n++;
                        }
                    }

                    const location = strArray[n + 4].replace(" ", "");
                    let dates = strArray[n + 5] + '.';
                    for (let p = n + 6; p < strArray.length; p++) {
                        dates += strArray[p] + '.';
                    }

                    const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i);
                    subjectsArray.push(subject);
                }
            } catch {
                console.log(strArray)
            }


            
            // console.log(subject);
        }
    }
    
    // console.log(subjectsArray.value);
    return subjectsArray;
}

function parseDates(dates: string) {
    // return [dates];
    const tmpArray: string[] = dates.replace(/(к.н.)|(ч.н.)|[\[\] ]/g, '').split(',');
    let dateArray: string[] = [];
    let n = 7;
    if (dates.includes("ч.н.")) {
        n = 14;
    }

    for(let i = 0; i < tmpArray.length; i++) {
        if (tmpArray[i].includes('-')) {
            const [start, end]: string[] = tmpArray[i].split('-');
            let newDate = dateParser(start);
            const endDate = dateParser(end);

            while(newDate <= endDate) {
                dateArray.push(newDate.toISOString());
                newDate.setDate(newDate.getDate() + n);
            }

        } else {
            dateArray.push(dateParser(tmpArray[i]).toISOString());
        }
    }

    // console.log(dates, dateArray);
    return dateArray;
}

function dateParser(date: string) {
    const [day, month] = date.split('.');
    const year = new Date().getFullYear();
    return new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
}

class Subject {
    groups: string[];
    name: string;
    type: string;
    subgroup: string;
    location: string;
    dateStr: string;
    dates: string[];
    time: number;

    constructor(groups: string[], name: string, type: string, subgroup: string, location: string, dateStr: string, dates: string[], time: number) {
        this.groups = groups;
        this.name = name;
        this.type = type;
        this.subgroup = subgroup;
        this.location = location;
        this.dateStr = dateStr;
        this.dates = dates;
        this.time = time;
    }
};

export const timeMap = new Map([
    [0, "8:30 - 10:10"],
    [1, "10:20 - 12:00"],
    [2, "12:20 - 14:00"],
    [3, "14:10 - 15:50"],
    [4, "16:00 - 17:40"],
    [5, "18:00 - 19:30"],
    [6, "19:40 - 21:10"],
    [7, "21:20 - 22:50"],
    [8, "8:30 - 12:00"],
    [9, "10:20 - 14:00"],
    [10, "12:20 - 15:50"],
    [11, "14:10 - 17:40"],
    [12, "16:00 - 19:30"],
    [13, "18:00 - 21:10"],
    [14, "19:40 - 22:50"],
    [15, "21:20 - 1:00"]
])

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}