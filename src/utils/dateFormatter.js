export const dateFormatter = (param) => {
    // It returns YYYY-MM-DD (e.g. 2022-05-29)
    // Taken from here:
    // https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date#comment17904013_3605248
    const date = new Date(param);
    //const dt = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    //It returns dd-MM-YYYY (e.g. 25-01-2022)
    const dt = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear();
    return dt;
};