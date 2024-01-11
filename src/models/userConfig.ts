export default interface UserConfig {
    userSettingsId: string,
    id: string,
    views: view[],
}

interface view {
    name: string,
    columnsToShow: string[],
    numberOfItemsPerPage: number,
    sortBy: string,
    sortAscending: boolean,
}