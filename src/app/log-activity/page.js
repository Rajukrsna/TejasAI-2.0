// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [category, setCategory] = useState("");
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   const categoryCards = [
//     {
//       title: "Used Bicycle as Transport",
//       imgSrc: "https://i.ibb.co/80MtHpm/cycle.jpg",
//       category:
//         "Earn points by showing proof of using a bicycle for transport.",
//     },
//     {
//       title: "Recycled Plastic",
//       imgSrc: "https://i.ibb.co/LC3yssm/plastic.jpg",
//       category: "Upload proof of recycling plastic to earn points.",
//     },
//     {
//       title: "Ate Veg Full Day",
//       imgSrc: "https://i.ibb.co/qYMcPsL/veg.jpg",
//       category: "Earn points for eating only vegetables for an entire day!",
//     },
//     {
//       title: "Carpooling",
//       imgSrc: "https://i.ibb.co/6JKjtpy/pool.png",
//       category:
//         "Earn points by carpooling with others instead of driving alone.",
//     },
//     {
//       title: "Zero Waste Shopping",
//       imgSrc: "https://i.ibb.co/Zxpq60d/zerowaste.jpg",
//       category: "Earn points for shopping with zero waste practices.",
//     },
//     {
//       title: "Planted a Tree",
//       imgSrc: "https://i.ibb.co/qjjL51B/tree.jpg",
//       category: "Earn points by showing proof of planting a tree.",
//     },
//     {
//       title: "Switch to LED Bulbs",
//       imgSrc: "https://i.ibb.co/QvTChD4/bulb.jpg",
//       category:
//         "Earn points for switching your home lighting to energy-efficient LED bulbs.",
//     },
//     {
//       title: "Plastic-Free Packaging",
//       imgSrc: "https://i.ibb.co/xJRhgKb/plasticf.jpg",
//       category:
//         "Earn points by opting for plastic-free packaging when shopping.",
//     },
//   ];

//   const handleCategoryClick = (category) => {
//     setCategory(category);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setCategory("");
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     try {
//       const response = await fetch("/photoProofRoutes/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();

//       if (result.status === "success") {
//         setMessage(result.message);
//         setStatus("success");
//       } else {
//         setMessage(result.message);
//         setStatus("error");
//       }

//       setTimeout(() => {
//         setModalOpen(false);
//         setMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setMessage("Error uploading file");
//       setStatus("error");
//     }
//   };

//   return (
//     <div className="container mx-auto md:px-[50px] px-[15px] my-10">
//       <h1 className="text-center text-3xl font-bold mb-8 text-green-700">
//         Earn Points by Uploading Proof
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {categoryCards.map((card, index) => (
//           <div
//             key={index}
//             className="card bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer"
//             onClick={() => handleCategoryClick(card.category)}
//           >
//             <img
//               src={card.imgSrc}
//               alt={card.title}
//               className="w-full h-64 object-cover rounded-t-lg border-b-4 border-green-700"
//             />
//             <div className="p-4">
//               <h5 className="text-xl font-semibold text-green-700 text-center mb-[5px]">
//                 {card.title}
//               </h5>
//               <p className="text-sm text-gray-600 text-center">
//                 {card.category}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Message box */}
//       {message && (
//         <div
//           className={`mt-6 text-center py-3 px-4 rounded-lg ${
//             status === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg w-96">
//             <div className="flex justify-between items-center mb-4 bg-green-700 p-[10px]">
//               <h3 className="text-2xl font-semibold text-white">
//                 {/* Upload your proof for: {category} */}
//                 Upload proof
//               </h3>
//               <button onClick={handleCloseModal} className="text-3xl cursor-pointer text-white">
//                 &times;
//               </button>
//             </div>
//             <div className="text-center">
//                 <p>Upload your proof for: {title}</p>
//             </div>
//             <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//               <div className="mb-4">
//                 <label
//                   htmlFor="image"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Upload Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   id="image"
//                   className="mt-2 block w-full border border-gray-300 rounded-md p-2"
//                   required
//                 />
//               </div>

//               <input type="hidden" name="category" value={category} />
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 w-full"
//               >
//                 Upload
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import axios from "axios"; // Import axios

// export default function Home() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [category, setCategory] = useState("");
//   const [message, setMessage] = useState("");
//   const[imgFile, setImgFile] = useState("");
//   const [status, setStatus] = useState("");

//   const categoryCards = [
//     {
//       title: "Used Bicycle as Transport",
//       imgSrc: "https://i.ibb.co/80MtHpm/cycle.jpg",
//       description: "Earn points by using a bicycle for transport.",
//     },
//     {
//       title: "Recycled Plastic",
//       imgSrc: "https://i.ibb.co/LC3yssm/plastic.jpg",
//       description: "Upload proof of recycling plastic to earn points.",
//     },
//     {
//       title: "Ate Veg Full Day",
//       imgSrc: "https://i.ibb.co/qYMcPsL/veg.jpg",
//       description: "Earn points for eating only vegetables for an entire day!",
//     },
//     {
//       title: "Carpooling",
//       imgSrc: "https://i.ibb.co/6JKjtpy/pool.png",
//       description: "Earn points by carpooling instead of driving alone.",
//     },
//     {
//       title: "Zero Waste Shopping",
//       imgSrc: "https://i.ibb.co/Zxpq60d/zerowaste.jpg",
//       description: "Earn points for practicing zero-waste shopping.",
//     },
//     {
//       title: "Planted a Tree",
//       imgSrc: "https://i.ibb.co/qjjL51B/tree.jpg",
//       description: "Earn points by planting a tree.",
//     },
//     {
//       title: "Switch to LED Bulbs",
//       imgSrc: "https://i.ibb.co/QvTChD4/bulb.jpg",
//       description: "Earn points for switching to energy-efficient LED bulbs.",
//     },
//     {
//       title: "Plastic-Free Packaging",
//       imgSrc: "https://i.ibb.co/xJRhgKb/plasticf.jpg",
//       description: "Earn points by using plastic-free packaging.",
//     },
//   ];

//   const handleCategoryClick = (title) => {
//     setCategory(title);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setCategory("");
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log("i am in form submit");
//     console.log(e.target);
//     // const formData = new FormData(e.target);
//     const formData = new FormData();
//     formData.append("image", fileInput.files[0]);
//     formData.append("category", category);

//     try {
//       console.log("i am in try block");

//       // Using axios for API call
//       const response = await axios.post(
//         "http://localhost:3000/api/photoProof",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Ensure it's set to handle file uploads
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("Successfully uploaded");
//         setMessage(response.data.message || "File uploaded successfully!");
//         setStatus("success");
//       } else {
//         console.log(response.status);
//         console.log(response.message);
//         setMessage("Failed to upload file.");
//         setStatus("error");
//       }

//       setTimeout(() => {
//         handleCloseModal();
//         setMessage("");
//       }, 3000);
//     } catch (error) {
//       // console.error("Error uploading file:", error);
//       console.log("error");
//       setMessage("Error connecting to the server.");
//       setStatus("error");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-center text-3xl font-bold mb-8 text-green-700">
//         Earn Points by Uploading Proof
//       </h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {categoryCards.map((card, index) => (
//           <div
//             key={index}
//             className="card bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer"
//             onClick={() => handleCategoryClick(card.title)}
//           >
//             <img
//               src={card.imgSrc}
//               alt={card.title}
//               className="w-full h-64 object-cover rounded-t-lg"
//             />
//             <div className="p-4">
//               <h5 className="text-xl font-semibold text-green-700 text-center">
//                 {card.title}
//               </h5>
//               <p className="text-sm text-gray-600 text-center">
//                 {card.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Feedback Message */}
//       {message && (
//         <div
//           className={`mt-6 text-center py-3 px-4 rounded-lg ${
//             status === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg w-96">
//             <div className="flex justify-between items-center p-4 bg-green-700">
//               <h3 className="text-xl font-semibold text-white">
//                 Upload Proof for: {category}
//               </h3>
//               <button
//                 onClick={handleCloseModal}
//                 className="text-white text-2xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//             <form className="p-4" onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="image"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Upload Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   id="image"
//                   className="block w-full border border-gray-300 rounded-md mt-2 p-2"
//                   required
//                   onChange={()=>setImgFile()}
//                 />
//               </div>
//               <input type="hidden" name="category" value={category} />
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-6 rounded-md w-full"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";
// import { useState } from "react";
// import axios from "axios"; // Import axios

// export default function Home() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [category, setCategory] = useState("");
//   const [message, setMessage] = useState("");
//   const [imgFile, setImgFile] = useState(null); // File state
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // Image preview URL
//   const [status, setStatus] = useState("");

//   const categoryCards = [
//     {
//       title: "Used Bicycle as Transport",
//       imgSrc: "https://i.ibb.co/80MtHpm/cycle.jpg",
//       description: "Earn points by using a bicycle for transport.",
//     },
//     {
//       title: "Recycled Plastic",
//       imgSrc: "https://i.ibb.co/LC3yssm/plastic.jpg",
//       description: "Upload proof of recycling plastic to earn points.",
//     },
//     {
//       title: "Ate Veg Full Day",
//       imgSrc: "https://i.ibb.co/qYMcPsL/veg.jpg",
//       description: "Earn points for eating only vegetables for an entire day!",
//     },
//     {
//       title: "Carpooling",
//       imgSrc: "https://i.ibb.co/6JKjtpy/pool.png",
//       description: "Earn points by carpooling instead of driving alone.",
//     },
//     {
//       title: "Zero Waste Shopping",
//       imgSrc: "https://i.ibb.co/Zxpq60d/zerowaste.jpg",
//       description: "Earn points for practicing zero-waste shopping.",
//     },
//     {
//       title: "Planted a Tree",
//       imgSrc: "https://i.ibb.co/qjjL51B/tree.jpg",
//       description: "Earn points by planting a tree.",
//     },
//     {
//       title: "Switch to LED Bulbs",
//       imgSrc: "https://i.ibb.co/QvTChD4/bulb.jpg",
//       description: "Earn points for switching to energy-efficient LED bulbs.",
//     },
//     {
//       title: "Plastic-Free Packaging",
//       imgSrc: "https://i.ibb.co/xJRhgKb/plasticf.jpg",
//       description: "Earn points by using plastic-free packaging.",
//     },
//   ];

//   const handleCategoryClick = (title) => {
//     setCategory(title);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setCategory("");
//   };

//   const handleFileChange = (event) => {
//     var reader = new FileReader();
//     reader.readAsDataURL(event.target.files[0]);
//     const file = event.target.files[0];
//     if (file) {
//       setImgFile(file); // Save the file in the state
//     }
//     reader.onload = () => {
//       setImagePreviewUrl(reader.result); // Set the preview URL (base64 encoded)
//     };
//     reader.onerror = (error) => {
//       console.log("Error: ", error);
//     };
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!imagePreviewUrl) {
//       setMessage("Please select an image.");
//       setStatus("error");
//       return;
//     }
  
//     try {
//       const payload = {
//         imagePreviewUrl, // Send only the base64-encoded image URL
//         category,
//       };
  
//       const response = await axios.post(
//         "http://localhost:3000/api/photoProof",
//         payload, // Send the payload as JSON
//         {
//           headers: {
//             "Content-Type": "application/json", // Send as JSON
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         setMessage(response.data.message || "File uploaded successfully!");
//         setStatus("success");
//       } else {
//         setMessage("Failed to upload file.");
//         setStatus("error");
//       }
  
//       setTimeout(() => {
//         handleCloseModal();
//         setMessage("");
//       }, 3000);
//     } catch (error) {
//       setMessage("Error connecting to the server.");
//       setStatus("error");
//     }
//   };
  

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-center text-3xl font-bold mb-8 text-green-700">
//         Earn Points by Uploading Proof
//       </h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {categoryCards.map((card, index) => (
//           <div
//             key={index}
//             className="card bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer"
//             onClick={() => handleCategoryClick(card.title)}
//           >
//             <img
//               src={card.imgSrc}
//               alt={card.title}
//               className="w-full h-64 object-cover rounded-t-lg"
//             />
//             <div className="p-4">
//               <h5 className="text-xl font-semibold text-green-700 text-center">
//                 {card.title}
//               </h5>
//               <p className="text-sm text-gray-600 text-center">
//                 {card.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Feedback Message */}
//       {message && (
//         <div
//           className={`mt-6 text-center py-3 px-4 rounded-lg ${
//             status === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg w-96">
//             <div className="flex justify-between items-center p-4 bg-green-700">
//               <h3 className="text-xl font-semibold text-white">
//                 Upload Proof for: {category}
//               </h3>
//               <button
//                 onClick={handleCloseModal}
//                 className="text-white text-2xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//             <form className="p-4" onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="image"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Upload Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   id="image"
//                   className="block w-full border border-gray-300 rounded-md mt-2 p-2"
//                   required
//                   onChange={handleFileChange} // Use the new handleFileChange function
//                 />
//                 {/* Display image preview if available */}
//                 {imagePreviewUrl && (
//                   <div className="mt-4">
//                     <img
//                       src={imagePreviewUrl}
//                       alt="Image Preview"
//                       className="w-full h-auto rounded-md"
//                     />
//                   </div>
//                 )}
//               </div>
//               <input type="hidden" name="category" value={category} />
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-6 rounded-md w-full"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  const categoryCards = [
    {
      title: "Used Bicycle as Transport",
      imgSrc: "https://i.ibb.co/80MtHpm/cycle.jpg",
      description: "Earn points by using a bicycle for transport.",
    },
    {
      title: "Recycled Plastic",
      imgSrc: "https://i.ibb.co/LC3yssm/plastic.jpg",
      description: "Upload proof of recycling plastic to earn points.",
    },
    {
      title: "Ate Veg Full Day",
      imgSrc: "https://i.ibb.co/qYMcPsL/veg.jpg",
      description: "Earn points for eating only vegetables for an entire day!",
    },
    {
      title: "Carpooling",
      imgSrc: "https://i.ibb.co/6JKjtpy/pool.png",
      description: "Earn points by carpooling instead of driving alone.",
    },
    {
      title: "Zero Waste Shopping",
      imgSrc: "https://i.ibb.co/Zxpq60d/zerowaste.jpg",
      description: "Earn points for practicing zero-waste shopping.",
    },
    {
      title: "Planted a Tree",
      imgSrc: "https://i.ibb.co/qjjL51B/tree.jpg",
      description: "Earn points by planting a tree.",
    },
    {
      title: "Switch to LED Bulbs",
      imgSrc: "https://i.ibb.co/QvTChD4/bulb.jpg",
      description: "Earn points for switching to energy-efficient LED bulbs.",
    },
    {
      title: "Plastic-Free Packaging",
      imgSrc: "https://i.ibb.co/xJRhgKb/plasticf.jpg",
      description: "Earn points by using plastic-free packaging.",
    },
  ];

  const handleCategoryClick = (title) => {
    setCategory(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCategory("");
  };

  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
      setFileName(file.name)
    }
    reader.onload = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!imagePreviewUrl) {
      setMessage("Please select an image.");
      setStatus("error");
      return;
    }

    try {
      const payload = {
        imagePreviewUrl,
        category,
        fileName
      };

      const response = await axios.post(
        "/api/photoProof", // API endpoint in Next.js
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message || "File uploaded successfully!");
        setStatus("success");
      }

      if (response.status===400){
        console.log("try other images");
      }

      setTimeout(() => {
        handleCloseModal();
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Error connecting to the server.");
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-8 text-green-700">
        Earn Points by Uploading Proof
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoryCards.map((card, index) => (
          <div
            key={index}
            className="card bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => handleCategoryClick(card.title)}
          >
            <img
              src={card.imgSrc}
              alt={card.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h5 className="text-xl font-semibold text-green-700 text-center">
                {card.title}
              </h5>
              <p className="text-sm text-gray-600 text-center">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mt-6 text-center py-3 px-4 rounded-lg ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center p-4 bg-green-700">
              <h3 className="text-xl font-semibold text-white">
                Upload Proof for: {category}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-white text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <form className="p-4" onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="block w-full border border-gray-300 rounded-md mt-2 p-2"
                  required
                  onChange={handleFileChange}
                />
                {imagePreviewUrl && (
                  <div className="mt-4">
                    <img
                      src={imagePreviewUrl}
                      alt="Image Preview"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}
              </div>
              <input type="hidden" name="category" value={category} />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
