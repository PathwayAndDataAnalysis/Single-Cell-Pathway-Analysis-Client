import NavBar from "../navBar";
import {UploadData} from "../other/uploadData";
import {FileItemLayout} from "../other/fileItemLayout";
import {ActionButton} from "../buttons/actionButton";
import {deleteAnalysisHandler, deleteFileHandler, getAllAnalysisHandler, getAllFilesHandler, uploadFileHandler} from "../api/apiHandlers";
import {AnalysisItemLayout} from "../other/analysisItemLayout";
import NewAnalysis from "../pages/newAnalysis";

const {Component} = require("react");

class HomePage extends Component {
    componentDidMount() {
        this.getAllFiles();
        this.getAllAnalysis();
    }

    state = {
        selectedFiles: [],
        allFiles: [],
        uploadPercentage: 0,
        allAnalysis: []
    };

    getAllFiles = () => {
        getAllFilesHandler()
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['files'].length; i++)
                    temp.push(res.data['files'][i]);
                this.setState({allFiles: temp});
            })
            .catch(err => {
                console.log(err);
            });
    }

    getAllAnalysis = () => {
        getAllAnalysisHandler()
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['analysis'].length; i++)
                    temp.push(res.data['analysis'][i]);
                this.setState({allAnalysis: temp});
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteFile = (file) => {
        deleteFileHandler(file)
            .then((response) => {
                this.getAllFiles();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteAnalysis = (analysis) => {
        deleteAnalysisHandler(analysis)
            .then((response) => {
                this.getAllAnalysis();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onFileChange = (event) => {
        this.setState({selectedFiles: event.target.files[0]});
    }

    onFileUpload = () => {

        let setPercentage = (completed) => {
            this.setState({uploadPercentage: completed});
        }

        let config = {
            onUploadProgress: function (progressEvent) {
                let percCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setPercentage(percCompleted);
            },
            headers: {'Content-Type': 'multipart/form-data'}
        };

        uploadFileHandler(this.state.selectedFiles, config)
            .then((response) => {
                this.getAllFiles();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (<div>
                <div>
                    <NavBar/>
                </div>

                <div className='container mx-auto'>
                    <h1 className='text-left text-xl mt-4 mb-2'>Files:</h1>

                    <div
                        className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>

                        <UploadData
                            onUploadClick={this.onFileUpload}
                            onFileChange={this.onFileChange}
                            uploadPercentage={this.state.uploadPercentage}
                        />

                        {// check if allFiles is empty
                            this.state.allFiles.length === 0 ? // if empty, show empty layout
                                <div className="flex justify-center items-center p-4">
                                    <p className="text-lg">No files uploaded yet</p>
                                </div> : // if not empty, show all files
                                this.state.allFiles.map((file, index) => {
                                    return (<FileItemLayout keyValue={index}
                                                            fileName={file['fileName']}
                                                            fileSize={file['fileSize']}
                                                            uploadDate={file['uploadDate']}
                                                            onDeleteClick={this.deleteFile.bind(this, file['fileName'])}
                                    />)
                                })}
                    </div>


                    <h1 className='text-left text-xl mt-6 mb-2'>Analysis:</h1>

                    <div
                        className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                        {
                            this.state.allAnalysis.length === 0 ?
                                <div className="flex justify-left items-left p-4">
                                    <p className="text-lg">No analysis done yet</p>
                                </div> :
                                this.state.allAnalysis.map((file, index) => {
                                    return (
                                        // <p>{file['fileName']}</p>
                                        <AnalysisItemLayout
                                            keyValue={index}
                                            analysisName={file['analysisName']}
                                            onViewClick={() => {

                                            }}
                                            onEditClick={() => {

                                            }}
                                            onDeleteClick={this.deleteAnalysis.bind(this, file['analysisName'])}
                                        />
                                    )
                                })
                        }

                        <div className='flex flex-row justify-end mt-6'>
                            <ActionButton text='New Analysis'
                                          type='button'
                                          onClick={() => {
                                              window.location = '/new-analysis'
                                          }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default HomePage;
