import * as React from "react";
import "./class-media.css";
import { ClassMediaViewModel } from "../../../../view-models/media";
import upload from "../../../../shared/UtilsImages/upload.png";

interface Props {
  media: ClassMediaViewModel[];
  handleDeletePhotoForEditedClass: Function;
  handleUploadPhoto: Function;
  handleDeletePhoto: Function;
}

interface State {
  uploadedImages: UploadedImage[];
  uploadedEditedImages: UploadedImage[];
  edit: boolean;
}

interface UploadedImage {
  dataURL: string;
  isVideo: boolean;
}

const initialUploadState = {
  uploadedImages: [],
  uploadedEditedImages: [],
  edit: true
};

export class ClassMedia extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialUploadState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.media && prevProps.media !== this.props.media) {
      let images: UploadedImage[] = [];
      for (var i = 0; i < this.props.media.length; i++) {
        let uploadElement: UploadedImage = {
          dataURL: this.props.media[i].imageName,
          isVideo: false
        };
        let extension = uploadElement.dataURL.split(".").pop();
        if (extension === "mp4") uploadElement.isVideo = true;
        else uploadElement.isVideo = false;

        images.push(uploadElement);
      }
      this.setState({ ...this.state, uploadedEditedImages: images });
    }
  }

  private handleImageUpload(event: any): void {
    let files = event.target.files;
    let uploadedImages: UploadedImage[] = [];
    for (let i = 0; i < files.length; i++) {
      let uploadElement: UploadedImage = {
        dataURL: "",
        isVideo: false
      };
      let reader = new FileReader();
      let incomeFile = files[i];
      let fileName = incomeFile.name;
      let extension = fileName.split(".").pop();
      reader.onloadend = () => {
        uploadElement.dataURL = String(reader.result);
        if (extension === "mp4") uploadElement.isVideo = true;
        else uploadElement.isVideo = false;
        this.props.handleUploadPhoto(incomeFile);
        uploadedImages.push(uploadElement);
        this.setState({
          uploadedImages: uploadedImages
        });
      };
      reader.readAsDataURL(incomeFile);
    }
  }

  private handleDeletePhoto(index: number) {
    let uploadedImages = this.state.uploadedImages;
    uploadedImages.splice(index, 1);
    this.setState({ uploadedImages });
    this.props.handleDeletePhoto(index);
  }

  private handleDeletePhotoForEditedClass(index: number, image: UploadedImage) {
    let uploadedEditedImages = this.state.uploadedEditedImages;
    uploadedEditedImages.splice(index, 1);
    this.setState({ uploadedEditedImages });
    this.props.handleDeletePhotoForEditedClass(index, image.dataURL);
  }

  render() {
    return (
      <div>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={upload} alt="upload button" />
        </label>
        <input
          onChange={this.handleImageUpload.bind(this)}
          type="file"
          id="file-upload"
          name="fileBrowser"
          multiple
          style={{
            display: "none"
          }}
          accept="image/jpg,image/png,image/jpeg,video/mp4"
        />
        <ul className="a">
          {this.state.uploadedEditedImages.map((image, key) => (
            <li className="liForMedia" key={key}>
              <div className="divForMedia">
                {image.isVideo ? (
                  <video controls className="imageUpload">
                    <source src={image.dataURL} />
                  </video>
                ) : (
                  <img
                    className="imageUpload"
                    src={"/Images/" + image.dataURL}
                    alt="simple description"
                  />
                )}
                <button
                  type="button"
                  className="inputDelete"
                  onClick={this.handleDeletePhotoForEditedClass.bind(
                    this,
                    key,
                    image
                  )}
                >
                  <img
                    className="deleteImage"
                    src="/UtilsImages/delete.png"
                    alt="delete button"
                  />
                </button>
              </div>
            </li>
          ))}

          {this.state.uploadedImages.map((image, key) => (
            <li className="liForMedia" key={key}>
              <div className="divForMedia">
                {image.isVideo ? (
                  <video controls className="imageUpload">
                    <source src={image.dataURL} />
                  </video>
                ) : (
                  <img
                    className="imageUpload"
                    src={image.dataURL}
                    alt="description"
                  />
                )}
                <button
                  type="button"
                  className="inputDelete"
                  onClick={this.handleDeletePhoto.bind(this, key)}
                >
                  <img
                    className="deleteImage"
                    src="/UtilsImages/delete.png"
                    alt="description"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
