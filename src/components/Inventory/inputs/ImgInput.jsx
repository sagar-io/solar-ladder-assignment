import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { useCallback, useEffect } from "react";

export const ImgInput = ({ imgFiles, setImgFiles, preLoadValues }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (preLoadImgLen + imgFiles.length + acceptedFiles.length <= 5) {
        setImgFiles((prev) => [
          ...prev,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      } else {
        alert("Error: Maximum 5 images are allowed !");
      }
    },
    [imgFiles]
  );

  useEffect(() => {
    return () => imgFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: 5,
    onDrop,
    multiple: true,
  });

  let selectedImagesElements = [];
  let preLoadImgLen = 0;

  if (preLoadValues) {
    preLoadImgLen = preLoadValues.images.length;
    selectedImagesElements = preLoadValues.images.map((url, id) => (
      <div className="thumbnail-img" key={url + "-" + id}>
        <img src={url} alt="" />
      </div>
    ));
  }

  const preLoadImagesElement = imgFiles.map((file, id) => (
    <div className="thumbnail-img" key={file.name + "-" + id}>
      <img
        src={file.preview}
        alt={file.name}
        onLoad={() => URL.revokeObjectURL(file.preview)}
      />
    </div>
  ));

  return (
    <>
      <div className="img-input" {...getRootProps()}>
        <div>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the upto 5 images at me...</p>
          ) : (
            <p>Drag and Drop or Click to Upload upto 5 images.</p>
          )}
          <IoMdCloudUpload className="icon" />
        </div>

        <div className="selected-img-container">
          {selectedImagesElements}
          {preLoadImagesElement}
        </div>
      </div>
    </>
  );
};
