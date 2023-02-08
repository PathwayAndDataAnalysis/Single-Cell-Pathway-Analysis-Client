import axiosClient from "./apiClient";

export function loginUser(user) {
    return axiosClient.post("auth/login/", user);
}

export function registerUser(user) {
    return axiosClient.post("auth/register/", user);
}

export function deleteFileHandler(file) {
    return axiosClient.post(`file/delete/`, {file: file});
}

export function deleteAnalysisHandler(analysis) {
    return axiosClient.post(`analysis/delete/`, {analysis: analysis});
}

export function getAllFilesHandler() {
    return axiosClient.get(`file/get_all/`);
}

export function getAllAnalysisHandler() {
    return axiosClient.get(`analysis/get_all/`);
}

export function uploadFileHandler(fileToUpload, config) {
    const formData = new FormData();
    formData.append("myFile", fileToUpload, fileToUpload.name);

    return axiosClient.post(`file/upload/`, formData, config);
}

export function runAnalysisHandler(analysisParams) {
    return axiosClient.post(`analysis/run/`, analysisParams);
}

export function updateAnalysisHandler(analysisParams) {
    return axiosClient.post(`analysis/update/`, analysisParams);
}

export function getAnalysisCoordinatesHandler(analysisName) {
    return axiosClient.post(`analysis/get_coordinates/`, {analysisName: analysisName});
}

export function getMetadataColumnsHandler(analysisName) {
    return axiosClient.post(`analysis/get_metadata_columns/`, {analysisName: analysisName});
}

export function getGeneEXpressionColumnsHandler(analysisName) {
    return axiosClient.post(`analysis/get_gene_expression_columns/`, {analysisName: analysisName});
}

export function getDataWithMetaDataColumnsHandler(analysisName, column) {
    return axiosClient.post(
        `analysis/get_data_with_metadata_columns/`,
        {analysisName: analysisName, columnName: column}
    );
}
export function getDataWithGeneExpressionColumnsHandler(analysisName, column) {
    return axiosClient.post(
        `analysis/get_data_with_gene_expression_columns/`,
        {analysisName: analysisName, columnName: column}
    );
}

export function getDataUsingGenesHandler(analysisName, genes) {
    return axiosClient.post(
        `analysis/get_data_using_genes/`,
        {analysisName: analysisName, geneList: genes}
    );
}
