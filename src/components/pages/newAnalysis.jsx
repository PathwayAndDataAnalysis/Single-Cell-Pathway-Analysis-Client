import NavBar from "../navBar";
import {InputLayout} from "../other/inputLayout";
import {ActionButton} from "../buttons/actionButton";
import {DropDownLayout} from "../other/dropDownLayout";
import {getAllFilesHandler, runAnalysisHandler} from "../api/apiHandlers";

const {Component} = require("react");

class NewAnalysis extends Component {

    dimReductionTypes = ["Use PCA", "Use Existing PCA File"];
    umapTypesArray = ["Use UMAP", "Use Existing UMAP File"];

    componentDidMount() {
        this.getAllFiles();
    }

    state = {
        uploadedFiles: [],

        newAnalysisName: "",
        selectedDataMatrixFile: "",
        selectedMetaDataFile: "",

        usePCA: true,
        pcaCount: '',
        selectedPCAFile: '',

        useUMAP: true,
        selectedUMAPFile: '',

        n_neighbors: '',
        min_dist: '',
        metric: 'euclidean',
    }

    getAllFiles = () => {
        getAllFilesHandler()
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['files'].length; i++)
                    temp.push(res.data['files'][i]['fileName']);
                this.setState({uploadedFiles: temp});
            })
            .catch(err => {
                console.log(err);
            });
    }

    onUMAPParametersChange = (event) => {
        if (event.target.id === "n_neighbors")
            this.setState({n_neighbors: event.target.value});
        else if (event.target.id === "min_dist")
            this.setState({min_dist: event.target.value});
        else if (event.target.id === "metric")
            this.setState({metric: event.target.value});

    }

    onRunAnalysisClick = () => {
        let analysisParams = {
            "analysisName": this.state.newAnalysisName,
            "dataMatrixFile": this.state.selectedDataMatrixFile,
            "metaDataFile": this.state.selectedMetaDataFile,
            "usePCA": this.state.usePCA,
            "pcaCount": this.state.pcaCount,
            "selectedPCAFile": this.state.selectedPCAFile,
            "useUMAP": this.state.useUMAP,
            "selectedUMAPFile": this.state.selectedUMAPFile,
            "n_neighbors": this.state.n_neighbors,
            "min_dist": this.state.min_dist,
            "metric": this.state.metric,
        }

        runAnalysisHandler(analysisParams)
            .then(res => {
                console.log(res);
                window.location.href = "/home";
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (<div>
                <div>
                    <NavBar/>
                </div>

                <div className='container mx-auto'>
                    <h1 className='text-left text-xl mt-4 mb-2'>Setup Analysis:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        <InputLayout inputFor="Name of the analysis:"
                                     inputId="analysis_name"
                                     placeholder="New Analysis..."
                                     onChange={(event) => {
                                         this.setState({newAnalysisName: event.target.value})
                                     }}

                        />
                    </div>


                    <h1 className='text-left text-xl mt-4 mb-2'>Data:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        <DropDownLayout label="Data matrix:"
                                        id="data_matrix"
                                        options={["Select Data Matrix File", ...this.state.uploadedFiles]}
                                        onChange={(event) => {
                                            this.setState({selectedDataMatrixFile: event.target.value});
                                        }}
                        />

                        <DropDownLayout label="Metadata:"
                                        id="meta_data"
                                        options={["Select Meta Data File", ...this.state.uploadedFiles]}
                                        onChange={(event) => {
                                            this.setState({selectedMetaDataFile: event.target.value});
                                        }}
                        />
                    </div>


                    <h1 className='text-left text-xl mt-4 mb-2'>Dimension reduction:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        <DropDownLayout label="Select one:"
                                        id="pca_dr"
                                        options={this.dimReductionTypes}
                                        onChange={(event) => {
                                            this.setState({usePCA: event.target.value === "Use PCA"});
                                        }}
                        />
                        {
                            this.state.usePCA ?
                                <InputLayout inputFor="Number of comp:"
                                             inputId="no_of_comp"
                                             placeholder=""
                                             onChange={(event) => {
                                                 this.setState({pcaCount: event.target.value});
                                             }}
                                />
                                :
                                <div>
                                    <DropDownLayout label="Select PCA File:"
                                                    id="pca_file"
                                                    options={["Select Existing PCA File", ...this.state.uploadedFiles]}
                                                    onChange={(event) => {
                                                        this.setState({selectedPCAFile: event.target.value});
                                                    }}
                                    />

                                </div>
                        }

                    </div>


                    <h1 className='text-left text-xl mt-4 mb-2'>2D projection:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>

                        <DropDownLayout
                            label="Method:"
                            id="method"
                            options={this.umapTypesArray}
                            onChange={(event) => {
                                this.setState({useUMAP: event.target.value === "Use UMAP"});
                            }}
                        />
                        {
                            this.state.useUMAP ?

                                <div>
                                    <InputLayout
                                        inputFor="n_neighbors:"
                                        inputId="n_neighbors"
                                        placeholder="15"
                                        onChange={this.onUMAPParametersChange}
                                    />
                                    <InputLayout
                                        inputFor="min_dist:"
                                        inputId="min_dist"
                                        placeholder="0.1"
                                        onChange={(event) => {
                                            this.setState({min_dist: event.target.value})
                                        }}
                                    />
                                    <DropDownLayout
                                        label="metric:"
                                        id="metric"
                                        options={["euclidean", "no euclidean"]}
                                        onChange={this.onUMAPParametersChange}
                                    />
                                </div>
                                :
                                <div>
                                    <DropDownLayout label="UMAP File:"
                                                    id="umap_file"
                                                    options={["Select UMAP File", ...this.state.uploadedFiles]}
                                                    onChange={(event) => {
                                                        this.setState({selectedUMAPFile: event.target.value});
                                                    }}
                                    />
                                </div>
                        }
                    </div>


                    <div className='flex flex-row justify-end mt-6'>
                        <ActionButton type="button"
                                      text='Run Analysis'
                                      onClick={this.onRunAnalysisClick}
                        />

                        <ActionButton type="button" text='Cancel' onClick={() => {
                            window.location = '/home'
                        }}/>
                    </div>

                </div>

            </div>
        );
    }
}

export default NewAnalysis;