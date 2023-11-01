import { createPost } from '../lib/database.js';

export const renderPost = (navigateTo) => {
  const containerPost = document.createElement('div');
  containerPost.classList.add('post-page');
  const currentUser = sessionStorage.getItem('usuarioLogeado');
  const postPage = `
    <section class= 'post-container'>
      <div class='user-container'>
        <h5>${currentUser}</h5>
        <button id="close">✖</button>
      </div>
      <label for="inputPost" ></label>
      <textarea id= "textPost" placeholder="Comparte tu experiencia"></textarea>
      <button id="uploadPicture"></button>
      <button id="publish">Publicar</button>
    </section>
      `;
  containerPost.innerHTML = postPage;

  const closeBtn = containerPost.querySelector('#close');
  const textPost = containerPost.querySelector('#textPost');
  // const uploadPictureBtn = containerPost.querySelector('#uploadPicture');
  const publishBtn = containerPost.querySelector('#publish');
  // -----------DOM calls-------------------

  textPost.addEventListener('keyup', () => {

  });

  closeBtn.addEventListener('click', () => {
    console.log('click');
    navigateTo('/feed');
  });

  // uploadPictureBtn.addEventListener('click', () => {
  // });

  publishBtn.addEventListener('click', () => {
    const textPostValue = textPost.value;
    createPost(textPostValue);
    navigateTo('/feed');
  });

  return containerPost;
};
