

export const getRouteList = (wayPoints) => {

    let dateList = wayPoints.sort((a,b) => {
        return a.date.start.getTime() - b.date.start.getTime();
    });
    let routeList = new Map();


    dateList.forEach((el, index, array) => {
        const date = el.date.start;
        const month = date.getMonth() + 1;
        const days = date.getDate();
        const keys = `${days}-${month}`;
        let values = [el];

        // надо написать цикл и идти не по исходным данным,
        // а по мапе, если такой ключ уже присутствует то брать значения этого ключа и добавлять туда текущий элемент.
        if (index > 0 && index !== array.length - 1) {
            for (let i = index + 1; i < array.length - 1; i++) {
                if (keys === `${array[i].date.start.getDate()}-${array[i].date.start.getMonth() + 1}`) {
                    values.push(array[i]);
                } else {
                    break;
                }
            }
        }
        routeList.set(keys, values);
    });

    console.log(routeList);

    return dateList;
};