import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

const FileUpload = ({ setImages }) => {
    const [imagePreview, setImagePreview] = React.useState([]);

    const handleFileUpload = (event) => {
        // limit image to 5
        const files = event.target.files;
        const totalImages = imagePreview.length + files.length;
        if (totalImages <= 5) {
            const filesArray = Array.from(files);
            setImages((prevImages) => [...prevImages, ...filesArray]);

            const previews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );

            // add image previews to state with previous image previews
            setImagePreview([...imagePreview, ...previews]);
        } else {
            toast.error('You can only upload up to 5 images');
        }
    };

    const handleRemoveImage = (index) => {
        const filtered = imagePreview.filter((_, i) => i !== index);
        setImagePreview(filtered);

        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // useEffect(() => {
    //     console.log(imagePreview);
    // }, [imagePreview]);

    return (
        <div>
            <Toaster richColors />
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        {imagePreview.length >= 5 ? (
                            <>
                                <p className="mb-2 text-sm text-gray-500 font-bold dark:text-gray-400">
                                    Maksimal 5 gambar
                                </p>
                                <p className="mb-2 text-sm text-gray-500 font-semibold dark:text-gray-400">
                                    Kamu sudah memasukkan 5 gambar
                                </p>
                            </>
                        ) : (
                            <>
                                {imagePreview.length === 0 ? (
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        Upload gambar
                                    </p>
                                ) : (
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Anda sudah memasukkan{' '}
                                            {imagePreview.length} Gambar
                                        </span>
                                    </p>
                                )}
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{' '}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG or JPEG
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        name="image_url"
                        className="hidden"
                        multiple
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleFileUpload}
                        disabled={imagePreview.length >= 5}
                    />
                </label>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {imagePreview.map((image, index) => (
                    <div key={index} className="relative">
                        <button
                            type="button"
                            className="text-xs text-red-500 absolute top-1 right-1"
                            onClick={() => {
                                handleRemoveImage(index);
                            }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <img
                            width={100}
                            height={100}
                            className="rounded-xl object-cover h-[100px] w-[100px]"
                            src={image}
                            alt="image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
