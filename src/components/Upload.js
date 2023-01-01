import React, { useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
import Select from 'react-select';
import "./Upload.css";


 


const planes = [
	{ label: 'Concorde', value: 'Concorde' },
	{ label: 'Airbus A220', value: 'A220' },
	{ label: 'Airbus A300', value: 'A300' },
	{ label: 'Airbus A320', value: 'A320' },
	{ label: 'Airbus A330', value: 'A330' },
	{ label: 'Airbus A340', value: 'A340' },
	{ label: 'Airbus A350', value: 'A350' },
	{ label: 'Airbus A380', value: 'A380' },
	{ label: 'Airbus A400M', value: 'A400M' },

	{ label: 'Antonov An-124', value: 'An-124' },
	{ label: 'Antonov An-148', value: 'An-148' },
	{ label: 'Antonov An-158', value: 'An-158' },
	{ label: 'Antonov An-225', value: 'An-225' },

	{ label: 'ATR 42', value: 'Atr42' },
	{ label: 'ATR 72', value: 'Atr72' },

	{ label: 'Boeing 717', value: '717' },
	{ label: 'Boeing 737', value: '737' },
	{ label: 'Boeing 747', value: '747' },
	{ label: 'Boeing 757', value: '757' },
	{ label: 'Boeing 767', value: '767' },
	{ label: 'Boeing 777', value: '777' },
	{ label: 'Boeing 787', value: '787' },
	{ label: 'Boeing C-17', value: 'C-17' },

	{ label: 'Bombardier CRJ-100', value: 'CRJ-100' },
	{ label: 'Bombardier CRJ-200', value: 'CRJ-200' },
	{ label: 'Bombardier CRJ-400', value: 'CRJ-400' },
	{ label: 'Bombardier CRJ-700', value: 'CRJ-700' },
	{ label: 'Bombardier CRJ-900', value: 'CRJ-900' },
	{ label: 'Bombardier CRJ-1000', value: 'CRJ-1000' },

	{ label: 'De Havilland Dash 8', value: 'Dash8' },

	{ label: 'BAe 146', value: 'BAe146' },
	{ label: 'Avro RJ', value: 'Avrorj' },

	{ label: 'BAC 1-11', value: 'Bac1-11' },
	{ label: 'BAc Vickers VC-10', value: 'Vc-10' },

	{ label: 'Cessna 408', value: 'C408' },

	{ label: 'Comac ARJ21', value: 'Arj21' },
	{ label: 'Comac C919', value: 'C919' },

	{ label: 'Convair CV-880', value: 'Cv-880' },
	{ label: 'Convair CV-990', value: 'Cv-990' },

	{ label: 'Dassault Mercure', value: 'Mercure' },

	{ label: 'Douglas DC-8', value: 'Dc8' },
	{ label: 'Douglas DC-9', value: 'Dc9' },
	{ label: 'MD-80', value: 'Md80' },
	{ label: 'MD-90', value: 'Md90' },
	{ label: 'Douglas DC-10', value: 'Dc10' },
	{ label: 'MD-11', value: 'Md11' },

	{ label: 'Dornier Do-328', value: 'Do328' },
	{ label: 'Dornier Do-728', value: 'Do728' },

	{ label: 'Embraer ERJ-145', value: 'Erj145' },
	{ label: 'Embraer ERJ-170', value: 'Erj170' },
	{ label: 'Embraer ERJ-190', value: 'Erj190' },
	{ label: 'Embraer E-Jet E2', value: 'Ejete2' },

	{ label: 'Fokker 50', value: 'fokker50' },
	{ label: 'Fokker 60', value: 'fokker60' },
	{ label: 'Fokker 70', value: 'fokker70' },
	{ label: 'Fokker 100', value: 'fokker100' },

	{ label: 'Handley Page Herald', value: 'Herald' },

	{ label: 'Ilyushin IL-96', value: 'Il96' },

	{ label: 'Lockheed C-5 Galaxy', value: 'C5galaxy' },
	{ label: 'Lockheed L-188 Electra', value: 'L188electra' },

	{ label: 'Mitsubishi SpaceJet MRJ90', value: 'Mrj90' },

	{ label: 'Saab 340', value: 'S340' },
	{ label: 'Saab 2000', value: 'S2000' },

	{ label: 'Short SC.5 Belfast', value: 'Sc5belfast' },

	{ label: 'Sukhoi Superjet 100', value: 'Superjet100' },

	{ label: 'Tupolev Tu-204', value: 'Tu-204' },
	{ label: 'Tupolev Tu-214', value: 'Tu-214' },

	{ label: 'Other', value: 'Other' },























  ];
  



function Upload({ user }) {
	const [caption, setCaption] = useState("");
	const [Aircraft, setAircraft] = useState("");
	const [Airline, setAirline] = useState("");
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [showDelete, setshowDelete] = useState(false);
	const [fileName, setFileName] = useState("");
	const [progress, setProgress] = useState(0);

	const handleFileChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
		setFile(URL.createObjectURL(e.target.files[0]));

		var a = e.target.value.toString().split('\\');
		var name = a[a.length -1];
		if(name.length > 20) name = name.split('.')[0].substring(0,20) + '....'+ name.split('.')[name.split('.').length - 1];
		setFileName(name);
		setshowDelete(true);
	};
	
	const handleTrash = () => {
		setshowDelete(false);
		setImage(null);
		setFileName("")
		setFile(null);
	}

	const closeUpload = () => {
		document.querySelector(".upload").style.display = "none";
		document.querySelector(".filter").style.display = "none";
	}

	const openUpload = () => {
		document.querySelector(".upload").style.display = "grid";
		document.querySelector(".filter").style.display = "block";
	}


	const handleUpload = () => {
		const imageName = `${image.name}${Math.floor(Math.random() * (9999 - 1000) ) + 1000}`;
		const uploadTask = storage.ref(`images/${imageName}`).put(image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},

			(error) => {
				console.log(error);
				alert(error.message);
			},

			() => {
				storage
					.ref("images")
					.child(imageName)
					.getDownloadURL()
					.then((url) => {
						db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            avatar: user.photoURL || `https://avatars.dicebear.com/api/gridy/${user.email}.svg`,
							caption: caption,
							imageUrl: url,
							email: user.email,
							username: user.displayName || user.email.split('@')[0],
							Aircraft : Aircraft,
							Airline : Airline,
						});
						setAirline("");
						setAircraft("");
						setProgress(0);
						setCaption("");
						setImage(null);
						setFileName("")
						setFile(null);
						setshowDelete(false);
						closeUpload();
						document.getElementById('root').scrollIntoView({ behavior: 'smooth' });
					});
			}
		);
	};

	return (
		<>
			<div className="addPostBtn" onClick={openUpload}><i className="fas fa-plus"></i></div>
			<div className="upload">
				<div className="uploadContent">
				
					{file &&
					<>
						<div className="postHeader">
							<h3 className="uploadPreview">POST PREVIEW</h3>
						</div>
						
						<img className="postImage" src={file} alt={fileName}/>
					</>
					}
					<input 
						className="uploadCaption"
						type="text"
						placeholder="Enter a caption..."
						onChange={(event) => setCaption(event.target.value)}
						value={caption}
					/>

 <Select options={planes} className="dropdown" onChange={opt => setAircraft(opt.value)} 
 />


<input 
						className="uploadCaption"
						type="text"
						placeholder="Enter Airline..."
						onChange={(event) => setAirline(event.target.value)}
						value={Airline}
					/>

 <button onClick={console.log(Aircraft)}></button>



					<div className="uploadButtons">
						<label htmlFor="file-upload" className="customFileUpload">
							<i className="fas fa-file-upload"></i> Upload Image
						</label>
						<input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
						{ showDelete &&
						<>
							<div className="fileName">{fileName}</div>
							<div className="trashBtn" onClick={handleTrash}><i className="fas fa-trash"></i></div>
						</>
						}

						

						
					</div>



					<progress className="uploadProgress" value={progress} max="100"></progress>
					<button type="submit" disabled={!file && !caption} onClick={handleUpload} className="postButton">
						Post
					</button>
					<div className="closeBtn" onClick={closeUpload}><i className="fas fa-times"></i></div>
				</div>
			</div>

		</>
		
	);
}

export default Upload;
