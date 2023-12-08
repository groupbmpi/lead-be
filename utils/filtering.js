function filter(data, filters) {
    const filteredData = data.filter((item) => {
        for (let key in filters) {
            console.log(`key: ${key}, value: ${filters[key]}`);
            if (item.hasOwnProperty(key)) {
                if (item[key] !== filters[key]) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    });

    return filteredData;
}

module.exports = {
    filter,
};