/**
* @jest-environment jsdom
*/

import { renderPost } from '../../src/components/post';

describe('renderPost', () => {
  it('debería ser una función', () => {
    expect(typeof renderPost).toBe('function');
  });
  it('tiene un botón para publicar', () => {
    const DOM = document.createElement('div');
    DOM.append(renderPost());
    const havePublishButton = DOM.querySelector('#publish');
    expect(havePublishButton).not.toBe(undefined);
  });
  it('cuando se hace click en el botón de cerrar nos lleva a la url de feed', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderPost(navigateToMock));
    const closeButton = DOM.querySelector('#close');
    closeButton.click();
    expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
  });
  it('cuando se hace click en el botón de publicar nos lleva a la url de feed', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderPost(navigateToMock));
    const publishBtn = DOM.querySelector('#publish');
    publishBtn.click();
    expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
  });
});
