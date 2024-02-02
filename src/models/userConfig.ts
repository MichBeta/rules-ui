export default interface UserConfig {
    userSettingsId: string,
    id: string,
    views: View[],
}

interface View {
    name: string,
    columnsToShow: string[],
    numberOfItemsPerPage: number,
    sortBy: string,
    sortAscending: boolean,
}