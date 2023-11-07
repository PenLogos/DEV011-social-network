import { createPost } from '../lib/database.js';

export const renderPost = (navigateTo) => {
  const containerPost = document.createElement('div');
  containerPost.classList.add('post-page');
  const currentUser = sessionStorage.getItem('usuarioLogeado');
  let photoUrlValue = '';
  const postPage = `
    <section class= 'post-container'>
      <div class='user-container'>
        <h5>${currentUser}</h5>
        <button id="close">✖</button>
      </div>
      <label for="textPost" ></label>
      <textarea id= "textPost" placeholder="Comparte tu experiencia"></textarea>
      <button id="uploadPicture"></button>
      <div id='photo-pop-up' class='overlay' style='display:none;'>
        <div id='body-photo-pop-up'>
          <textarea id='photo-input' class='photo-input' placeholder="Agrega el URL de tu imagen"></textarea>
          <div class='photo-buttons'>
            <button class='photo-accept-button'>Agregar</button>
            <button class='photo-reject-button'>Cancelar</button>
          </div>
        </div>
      </div>
      <div id='alert-pop-up' class='overlay' style='display:none;'>
        <div id='alert-body-pop-up'>
          <p class='alert-message'>Los campos no pueden estar vacíos</p>
          <div class='ok-buttons'>
            <button class='accept-alert-button'>Ok</button>
          </div>
        </div> 
      </div>
      <button id="publish">Publicar</button>
    </section>
      `;
  containerPost.innerHTML = postPage;

  const closeBtn = containerPost.querySelector('#close');
  const textPost = containerPost.querySelector('#textPost');
  const uploadPictureBtn = containerPost.querySelector('#uploadPicture');
  const publishBtn = containerPost.querySelector('#publish');
  const popupPhotoContainer = containerPost.querySelector('#photo-pop-up');
  const addPhotoButton = containerPost.querySelector('.photo-accept-button');
  const rejectPhotoButton = containerPost.querySelector('.photo-reject-button');
  const photoUrl = containerPost.querySelector('.photo-input');
  const okButton = containerPost.querySelector('.accept-alert-button');
  const popupAlertContainer = containerPost.querySelector('#alert-pop-up');
  // -----------DOM calls-------------------

  closeBtn.addEventListener('click', () => {
    console.log('click');
    navigateTo('/feed');
  });

  uploadPictureBtn.addEventListener('click', () => {
    popupPhotoContainer.style.display = 'block';
    addPhotoButton.addEventListener('click', async () => {
      photoUrlValue = photoUrl.value;
      popupPhotoContainer.style.display = 'none';
    });
    rejectPhotoButton.addEventListener('click', async () => {
      popupPhotoContainer.style.display = 'none';
    });
  });
  publishBtn.addEventListener('click', () => {
    const textPostValue = textPost.value;
    if (textPostValue.trim() === '' || photoUrlValue.trim() === '') {
      popupAlertContainer.style.display = 'block';
      okButton.addEventListener('click', () => {
        popupAlertContainer.style.display = 'none';
      });
    } else {
      createPost(textPostValue, photoUrlValue);
      navigateTo('/feed');
    }
  });

  return containerPost;
};
