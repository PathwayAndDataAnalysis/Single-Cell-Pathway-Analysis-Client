import NavBar from "../navBar";
import {ActionButton} from "../buttons/actionButton";
import {UploadData} from "../other/uploadData";
import axios from "axios";

const {Component} = require("react");

class HomePage extends Component {

    state = {
        selectedFile: null
    };

    onFileChange = (event) => {
        console.log(event.target.files[0])
        this.setState({selectedFile: event.target.files[0]});
    }

    onFileUpload = () => {
        console.log('uploading');

        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        console.log(formData);

        axios
            .post('http://127.0.0.1:8000/upload/file/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            .then((response) => {
                console.log(response);
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


                <UploadData onUploadClick={this.onFileUpload} onFileChange={this.onFileChange}/>


                <div
                    className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100'>
                    <div>
                        <a href='/home' className=''>
                            <h5 className='w-full mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                                Card 111111
                            </h5>
                            <p className='font-normal text-gray-700'>
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </a>
                    </div>

                    <div className='flex flex-row justify-end mt-6'>
                        <ActionButton text='Upload'
                                      type='button'
                                      onClick={() => {

                                      }}
                        />

                        <ActionButton text='Remove'
                                      type='button'
                                      onClick={() => {
                                      }}
                        />
                    </div>
                </div>

                <h1 className='text-left text-xl my-6'>Analysis:</h1>

                <div
                    className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100'>
                    <div>
                        <a href='/home' className=''>
                            <h5 className='w-full mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                                Card 2
                            </h5>
                            <p className='font-normal text-gray-700'>
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </a>
                    </div>

                    <div className='flex flex-row justify-end mt-6'>
                        <ActionButton text='Edit'
                                      type='button'
                                      onClick={() => {
                                      }}
                        />

                        <ActionButton text='View'
                                      type='button'
                                      onClick={() => {
                                      }}
                        />

                        <ActionButton text='Delete'
                                      type='button'
                                      onClick={() => {
                                      }}
                        />
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default HomePage;
