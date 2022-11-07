import NavBar from "../navBar";
import {ActionButton} from "../buttons/actionButton";
import {UploadData} from "../other/uploadData";
import axios from "axios";
import {FileItem} from "../other/fileItem";

const {Component} = require("react");

class HomePage extends Component {
    componentDidMount() {
        this.getAllFiles();
    }

    state = {
        selectedFiles: [],
        allFiles: []
    };

    getAllFiles = () => {
        axios.get('http://127.0.0.1:8000/file/get_all/')
            .then(res => {
                this.setState({allFiles: []});
                for (let i = 0; i < res.data['files'].length; i++) {
                    this.state.allFiles.push(res.data['files'][i]);
                }
                console.log("all files: ", this.state.allFiles);
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
        formData.append(
            "myFile",
            this.state.selectedFiles,
            this.state.selectedFiles.name
        );

        axios
            .post('http://127.0.0.1:8000/file/upload/',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}})
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
                    <h1 className='text-left text-xl my-6'>Files:</h1>

                    <div className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>

                        <UploadData onUploadClick={this.onFileUpload} onFileChange={this.onFileChange}/>

                        {
                            this.state.allFiles.map((file, index) => (

                                <FileItem key={index}
                                          fileName={file["fileName"]}
                                          fileSize={file["fileSize"] + " KB"}
                                          fileDate={file['uploadDate']}
                                          onDeleteClick={() => this.deleteFile(file.fileName)}
                                />
                            ))
                        }
                    </div>


                    <h1 className='text-left text-xl my-6'>Analysis:</h1>

                    {/*{this.state.allFiles.map((file, index) => (*/}
                    {/*    <div key={index}*/}
                    {/*         className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100'>*/}
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

                    {/*))*/}
                    {/*}*/}

                </div>
            </div>
        );
    }
}

export default HomePage;
