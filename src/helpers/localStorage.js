/**
 * Get an item from local storage
 * @param {String} name 
 * @param {String} value 
 */
export const getCodeLocalStorage = (key) => {
    const htmlInStorage = JSON.parse(localStorage.getItem(`${key}`));
    if (htmlInStorage) return htmlInStorage
    return ""
}

/**
 * Add an item to a local storage
 * @param  {String} name      The localStorage() key
 * @param  {String} value     The localStorage() value
 */
export const addCodeLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
};