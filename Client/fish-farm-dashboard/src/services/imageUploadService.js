export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'newo9e0s');
    const options = {
        method: 'POST',
        body: formData,
    };
    const response = await fetch('https://api.cloudinary.com/v1_1/fish-farm/image/upload', options);
    const { secure_url } = await response.json();
    return secure_url;
}