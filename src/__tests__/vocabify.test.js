import React from 'react';
import { render } from '@testing-library/react';
import List from '../components/list';

describe('List tests', function() {

  test('the list does not render when no items are present', function() {
    const items = [];
    const { container } = render(<List items={ items }/>);
    expect(container.firstChild).toBe(null);
  });

  test('the list renders an article when passed a word and definition', function() {
    const items = [{
      "definition":"Defenestration is the act of throwing someone or something out of a window.",
      "word":"Defenestration"
    }];
    const { getByText, container } = render(<List items={ items }/>);
    expect(container.firstChild.tagName.toLowerCase()).toBe('article');
    expect(container.firstChild.childElementCount).toBe(2);
    const word = getByText(/^defenestration$/i);
    expect(word.tagName.toLowerCase()).toBe('h2');
    const definition = getByText(/^Defenestration is the act of throwing someone or something out of a window\.$/i);
    expect(definition.tagName.toLowerCase()).toBe('p');
  });

});
