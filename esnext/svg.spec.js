/* global describe, it, expect */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Chance from 'chance';

import Svg from './Svg';

const chance = new Chance();
const svgContent = '<g><line x1="50" y1="50" x2="10" y2="10" /></g>';
const defs = '<defs><linearGradient /></defs>';
const svg = `<svg class="test-svg" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
const svgWithViewBox = `<svg class="test-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">${svgContent}</svg>`;
const svgWithDefs = `<svg class="test-svg" xmlns="http://www.w3.org/2000/svg">${defs}${svgContent}</svg>`;
const b64Prefix = 'data:image/svg+xml;base64,';
const b64 = 'PHN2ZyBjbGFzcz0idGVzdC1zdmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+';
const defaultMockProps = {
  id: chance.word(),
  className: chance.word()
};

describe('Svg', () => {
  it('Passes props through', () => {
    const mockProps = Object.assign({}, defaultMockProps, { children: '' });
    const component = shallow(<Svg {...mockProps} />);
    const { className } = component.props();
    expect(className).toContain(defaultMockProps.className);
  });

  it('Passes id props through to the svg', () => {
    const mockProps = Object.assign({}, defaultMockProps, { children: svg });
    const component = render(<Svg {...mockProps} />);
    expect(component[0].attribs.id).toBe(defaultMockProps.id);
  });

  it('renders svg markup as a svg', () => {
    const mockProps = Object.assign({}, defaultMockProps, { children: svg });
    const component = render(<Svg {...mockProps} />);
    const imgs = component.find('img');
    expect(component.length).toBe(1);
    expect(imgs.length).toBe(0);
  });

  it('renders base64 as a image', () => {
    const mockProps = Object.assign({}, defaultMockProps, { children: `${b64Prefix}${b64}` });
    const component = shallow(<Svg {...mockProps} />);
    expect(component.type()).toBe('img');
  });

  it('renders the use href using xlink (needed for safari)', () => {
    const component = shallow(<Svg cacheId={defaultMockProps.id} />);
    expect(component.html()).toContain(`xlink:href='#${defaultMockProps.id}'`);
  });

  it('renders the height', () => {
    const height = chance.random();
    const component = render(<Svg height={height}>{svg}</Svg>);
    expect(component.prop('height')).toEqual(String(height));
  });

  it('renders the width', () => {
    const width = chance.random();
    const component = render(<Svg width={width}>{svg}</Svg>);
    expect(component.prop('width')).toEqual(String(width));
  });

  it('renders and primes the cache (shallow)', () => {
    const cacheId = chance.word();
    const component = shallow(<Svg cacheId={cacheId}>{svg}</Svg>);
    expect(component.html()).toEqual(`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="${cacheId}" class="test-svg">${svgContent}</symbol><use xlink:href='#${cacheId}' /></svg>`);
  });

  it('renders re-using the existing cache', () => {
    const cacheId = chance.word();
    const cacheContent = chance.word();
    const component = mount(<Svg cacheId={cacheId}>{svg}</Svg>, { context: { svgCache: { [cacheId]: cacheContent } } });
    expect(component.html()).toEqual(`<svg class="test-svg" xmlns="http://www.w3.org/2000/svg">${cacheContent}</svg>`);
  });

  it('renders a symbol, moving defs outside (fixes firefox bug)', () => {
    const cacheId = chance.word();
    const component = shallow(<Svg cacheId={cacheId}>{svgWithDefs}</Svg>);
    expect(component.html()).toEqual(`<svg xmlns="http://www.w3.org/2000/svg">${defs}<symbol id="${cacheId}" class="test-svg">${svgContent}</symbol><use xlink:href='#${cacheId}' /></svg>`);
  });

  it('renders a use tag copying the symbols viewBox (fixes firefox bug)', () => {
    const cacheId = chance.word();
    const component = shallow(<Svg cacheId={cacheId}>{svgWithViewBox}</Svg>);
    expect(component.html()).toEqual(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><symbol id="${cacheId}" class="test-svg">${svgContent}</symbol><use viewBox="0 0 10 10" xlink:href='#${cacheId}' /></svg>`);
  });

  it('doesnt duplicate className', () => {
    const cacheId = chance.word();
    const className = chance.word();
    const component = shallow(<Svg cacheId={cacheId} className={className}>{svgWithViewBox}</Svg>);
    expect(component.html()).toEqual(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><symbol id="${cacheId}" class="test-svg">${svgContent}</symbol><use viewBox="0 0 10 10" xlink:href='#${cacheId}' /></svg>`);
  });
});
