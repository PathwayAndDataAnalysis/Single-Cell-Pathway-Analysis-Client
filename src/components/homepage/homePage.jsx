import NavBar from "../navBar";
import {UploadData} from "../other/uploadData";
import axios from "axios";
import {FileItem} from "../other/fileItem";
import {ActionButton} from "../buttons/actionButton";

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
        allAnalysis: [],
    };

    getAllFiles = () => {
        axios.get('http://127.0.0.1:8000/file/get_all/')
            .then(res => {
                console.log("res.data", res.data.files);

                let temp = [];
                for (let i = 0; i < res.data['files'].length; i++)
                    temp.push(res.data['files'][i]);

                this.setState({allFiles: temp});
                console.log("allFiles:    ", this.state.allFiles);
            })
            .catch(err => {
                console.log(err);
            });
    }

    getAllAnalysis = () => {
        axios.get('http://127.0.0.1:8000/analysis/get_all/')
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['files'].length; i++)
                    temp.push(res.data['files'][i]);
                this.setState({allAnalysis: temp});
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteFile = (file) => {
        axios
            .post('http://127.0.0.1:8000/file/delete/', {file: file})
            .then((response) => {
                console.log(response);
                this.getAllFiles();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onFileChange = (event) => {
        console.log(event.target.files)
        this.setState({selectedFiles: event.target.files[0]});
    }

    onFileUpload = () => {
        console.log('uploading');
        console.log(this.state.selectedFiles);

        const formData = new FormData();
        formData.append("myFile", this.state.selectedFiles, this.state.selectedFiles.name);

        let setPercentage = (completed) => {
            this.setState({uploadPercentage: completed});
        }

        let config = {
            onUploadProgress: function (progressEvent) {
                let percCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log("percentCompleted:  ", percCompleted);

                setPercentage(percCompleted);
            }, headers: {'Content-Type': 'multipart/form-data'}
        };


        axios
            .post('http://127.0.0.1:8000/file/upload/', formData, config)
            .then((response) => {
                console.log(response);
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
                                    return (<FileItem keyValue={index}
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
                                        <p>{file['fileName']}</p>
                                    )
                                })
                        }

                        <div className='flex flex-row justify-end mt-6'>
                            <ActionButton text='New Analysis'
                                          type='button'
                                          onClick={() => {
                                          }}
                            />

                        </div>
                    </div>

                    {/*{this.state.allFiles.map((file, index) => (<div key={index}*/}
                    {/*                                                className='
                    my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100
                    '
                    >*/}
                    {/*        <div>*/}
                    {/*            <a href='/home' className=''>*/}
                    {/*                <h5 className='w-full mb-2 text-2xl font-bold tracking-tight text-gray-900'>*/}
                    {/*                    {file}*/}
                    {/*                </h5>*/}
                    {/*                <p className='font-normal text-gray-700'>*/}

                    {/*                </p>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}

                    {/*        <div className='flex flex-row justify-end mt-6'>*/}
                    {/*            <ActionButton text='Edit'*/}
                    {/*                          type='button'*/}
                    {/*                          onClick={() => {*/}
                    {/*                          }}*/}
                    {/*            />*/}

                    {/*            <ActionButton text='View'*/}
                    {/*                          type='button'*/}
                    {/*                          onClick={() => {*/}
                    {/*                          }}*/}
                    {/*            />*/}

                    {/*            <ActionButton text='Delete'*/}
                    {/*                          type='button'*/}
                    {/*                          onClick={this.deleteFile.bind(this, file)}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*))}*/}

                </div>
            </div>
        );
    }
}

export default HomePage;
