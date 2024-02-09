import {ClaimRow} from "@/models/claimField";

export default class UserConfig {
    userSettingsId: string;
    id: string;
    views: View[];

    constructor(userSettingsId: string, id: string, views: View[]) {
        this.userSettingsId = userSettingsId;
        this.id = id;
        this.views = views;
    }

    static updateViewFromJson(json: any, view: View) {
        let userConfig = new UserConfig(json.userSettingsId, json.id, json.views);
        let viewIndex = userConfig.views.findIndex(v => v.name === view.name);

        let updatedViews = [...userConfig.views]; // Create a new array

        updatedViews[viewIndex] = new View(
            view.name,
            view.columnsToShow.map((column: any) => column.key),
            view.numberOfItemsPerPage,
            view.sortBy,
            view.sortAscending
        ); // Update the desired element

        userConfig.views = updatedViews;
        return userConfig;
    }
}

export class View {
    name: string;
    columnsToShow: string[];
    numberOfItemsPerPage: number;
    sortBy: string;
    sortAscending: boolean;

    constructor(name: string, columnsToShow: string[], numberOfItemsPerPage: number, sortBy: string, sortAscending: boolean) {
        this.name = name;
        this.columnsToShow = columnsToShow;
        this.numberOfItemsPerPage = numberOfItemsPerPage;
        this.sortBy = sortBy;
        this.sortAscending = sortAscending;
    }
}