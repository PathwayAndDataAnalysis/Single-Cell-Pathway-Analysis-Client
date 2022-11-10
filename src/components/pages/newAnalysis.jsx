import NavBar from "../navBar";
import {InputLayout} from "../other/inputLayout";
import {ActionButton} from "../buttons/actionButton";
import {DropDownLayout} from "../other/dropDownLayout";
import {getAllFilesHandler} from "../api/apiHandlers";

const {Component} = require("react");

class NewAnalysis extends Component {

    componentDidMount() {
        this.getAllFiles();
    }

    state = {
        uploadedFiles: [],

        selectedDataMatrixFile: "",
        selectedMetaDataFile: "",

        usePCA: true,
        pcaCount: '',
        selectedPCAFile: '',

        selectedMethod: true,
        selectedUMAPFile: '',

        n_neighbors: '',
        min_dist: '',
        metric: '',
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

    onDataMatrixFileChange = (event) => {
        console.log(event.target.value);
        this.setState({selectedDataMatrixFile: event.target.value});
    }

    onMetaDataFileChange = (event) => {
        console.log(event.target.value);
        this.setState({selectedMetaDataFile: event.target.value});
    }

    handleUsePCAChange = (event) => {
        console.log(event.target.value);
        this.setState({usePCA: event.target.value === "Use PCA"});
    }

    onPCACountChange = (event) => {
        console.log(event.target.value);
        this.setState({pcaCount: event.target.value});
    }

    handleMethodChange = (event) => {
        console.log(event.target.value);
        this.setState({selectedMethod: event.target.value === "Use UMAP"});
    }

    onPCAFileChange = (event) => {
        console.log(event.target.value);
        this.setState({selectedPCAFile: event.target.value});
    }

    onUMAPFileChange = (event) => {
        console.log(event.target.value);
        this.setState({selectedUMAPFile: event.target.value});
    }

    onUMAPParametersChange = (event) => {
        if (event.target.id === "n_neighbors")
            this.setState({n_neighbors: event.target.value});
        else if (event.target.id === "min_dist")
            this.setState({min_dist: event.target.value});
        else if (event.target.id === "metric")
            this.setState({metric: event.target.value});

    }

    render() {
        return (<div>
                <div>
                    <NavBar/>
                </div>

                <div className='container mx-auto'>
                    <h1 className='text-left text-xl mt-4 mb-2'>Setup Analysis:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        <InputLayout inputFor="Name of the analysis:" inputId="analysis_name" placeholder="New Analysis..."/>
                    </div>


                    <h1 className='text-left text-xl mt-4 mb-2'>Data:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        <DropDownLayout label="Data matrix:"
                                        id="data_matrix"
                                        options={["Select Data Matrix File", ...this.state.uploadedFiles]}
                                        onChange={this.onDataMatrixFileChange}
                        />

                        <DropDownLayout label="Metadata:"
                                        id="meta_data"
                                        options={["Select Meta Data File", ...this.state.uploadedFiles]}
                                        onChange={this.onMetaDataFileChange}
                        />
                    </div>


                    <h1 className='text-left text-xl mt-4 mb-2'>Dimension reduction:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        <DropDownLayout label="Select one:"
                                        id="pca_dr"
                                        options={["Use PCA", "Use Existing PCA File"]}
                                        onChange={this.handleUsePCAChange}/>
                        {
                            this.state.usePCA ?
                                <InputLayout inputFor="Number of comp:"
                                             inputId="no_of_comp"
                                             placeholder=""
                                             onChange={this.onPCACountChange}
                                />
                                :
                                <div>
                                    {/*<FileUploadLayout*/}
                                    {/*    labelName="PCA File:"*/}
                                    {/*    onUploadClick={this.onPCAFileUpload}*/}
                                    {/*    onFileChange={this.onPCAFileChange}*/}
                                    {/*    uploadPercentage={this.state.pcaFileUploadPercentage}*/}
                                    {/*/>*/}

                                    <DropDownLayout label="Select PCA File:"
                                                    id="pca_file"
                                                    options={["Select Existing PCA File", ...this.state.uploadedFiles]}
                                                    onChange={this.onPCAFileChange}
                                    />

                                </div>
                        }

                    </div>


                    <h1 className='text-left text-xl mt-4 mb-2'>2D projection:</h1>
                    <div className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>

                        <DropDownLayout
                            label="Method:"
                            id="method"
                            options={["Use UMAP", "Use Existing UMAP File"]}
                            onChange={this.handleMethodChange}
                        />
                        {
                            this.state.selectedMethod ?

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
                                        onChange={this.onUMAPParametersChange}
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
                                                    onChange={this.onUMAPFileChange}
                                    />
                                </div>
                        }
                    </div>


                    <div className='flex flex-row justify-end mt-6'>
                        <ActionButton type="button" text='Run Analysis' onClick={() => {
                            console.log("Run Analysis");
                            console.log(this.state);
                        }}/>

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