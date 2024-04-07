<script setup>
import { ref } from 'vue'

const imageFile = ref(null); // This ref is to store the image file

// This function will handle the file selection and upload
function changePhoto() {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?._id; // Safely access the _id

  if (!userId) {
    console.error('User ID not found in local storage');
    return;
  }

  // Trigger file input to select the image
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.onchange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    imageFile.value = file; // Assign to our reactive variable
    uploadImage(userId, file); // Call the upload function
  };
  fileInput.click(); // Open the file select dialog
}

// This function will handle the upload process
async function uploadImage(userId, file) {
  const formData = new FormData();
  formData.append('file', file); // Add file to form data

  try {
    const response = await fetch(`http://localhost:4200/api/files?folder=users/${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Server responded with an error');

    const result = await response.json();
    console.log('Image successfully uploaded:', result);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
</script>

<template>
  <div>
    <img
      class="w-36 h-36 rounded-full mb-5"
      src="/src/assets/images/anonym.webp"
    />
    <div class="flex justify-center items-center mb-10">
      <button class="edit-button" @click="changePhoto">Change photo</button>
    </div>
  </div>
</template>
<style scoped>
.text-input {
	border-radius: 20px;
	font-size: 18px;
	font-weight: 400;
	padding: 3px 15px;
	background-color: rgb(255 255 255 / 50%);
	transition: border 0.4s ease-in-out;
	border: 1px solid transparent;
}
textarea {
	display: block;
	border-radius: 20px;
	width: 100%;
	background-color: rgb(255 255 255 / 50%);
	height: 150px;
	resize: none;
	margin-top: 15px;
	margin-left: 0;
	padding: 15px 20px;
}
.edit-button {
	color: white;
	padding: 10px 20px;
	width: 200px;
	border: 3px solid rgb(85, 16, 170);
	border-radius: 25px;
	cursor: pointer;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	text-transform: uppercase;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s ease-in-out;
	margin-bottom: 20px;
}
.edit-button:hover {
	background-color: rgb(106, 0, 255);
}
.save-btn {
	background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
	color: white;
	padding: 10px 20px;
	width: 200px;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	text-transform: uppercase;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s ease-in-out;
	margin-bottom: 20px;
}
.save-btn:hover {
	background: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
	filter: brightness(1.1);
}
</style>
