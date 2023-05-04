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