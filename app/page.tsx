"use client";

import { ChangeEvent, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import Latex from "react-latex-next";
import BounceLoader from "react-spinners/BounceLoader";

export default function Home() {
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAIResponse, setOpenAIResponse] = useState<string>("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) {
      window.alert("No file selected. Choose a file.");
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log(reader.result);
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.log("error: " + error);
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (image === "") {
      toast.error("Upload an image.");
      return;
    }

    setIsLoading(true);

    // POST api/analyzeImage
    await fetch("api/analyzeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // base64 image
      }),
    }).then(async (response: any) => {
      const data = await response.text();
      setOpenAIResponse(data);
      setIsLoading(false);
    });
  }
  return (
    <div className='min-h-screen text-md'>
      <div className='w-full py-3 bg-indigo-500'>
        <h2 className='text-xl text-white font-semibold text-center'>
          AI Math Teacher
        </h2>
        <h3 className='text-xl text-white text-center'>
          Upload your Home Work
        </h3>
      </div>
      <div className='max-w-7xl py-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-1'>
          {image !== "" ? (
            <div className='mb-4 overflow-hidden'>
              <img
                src={image}
                alt='Uploaded Question'
                className='w-full object-contain max-h-72'
              />
            </div>
          ) : (
            <div className='animate-pulse md:flex md:items-center my-6'>
              <div className='flex items-center justify-center w-full h-72 bg-gray-300 rounded'>
                <svg
                  className='w-10 h-10 text-gray-200'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 18'
                >
                  <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                </svg>
              </div>
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='w-full'>
              <label className='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
                <span className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <span className='font-medium text-gray-600'>
                    Drop files to Attach, or{" "}
                    <span className='text-blue-600 underline'>browse</span>
                  </span>
                </span>
                <input
                  type='file'
                  name='file_upload'
                  className='hidden'
                  onChange={(e) => handleFileChange(e)}
                />
              </label>
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                className='w-full p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md my-4 text-center'
              >
                Check my solution
              </button>
            </div>
          </form>
        </div>
        {/* <div className='lg:col-span-2 flex justify-start items-center'>
          {isLoading ? (
            <BounceLoader color={"#123abc"} loading={isLoading} size={60} />
          ) : openAIResponse !== "" ? (
            <div className=''>
              <h2 className='text-xl font-bold mb-4'>AI Response</h2>
              <Latex>{openAIResponse}</Latex>
            </div>
          ) : null}
        </div> */}
        <div className='lg:col-span-2 flex justify-start items-center'>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <BounceLoader color={"#123abc"} loading={isLoading} size={60} />
              <p>Evaluating your answer...</p>
            </div>
          ) : openAIResponse !== "" ? (
            <div className=''>
              <h2 className='text-xl font-bold mb-4'>Here is your feedback:</h2>
              <Latex>{openAIResponse}</Latex>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
