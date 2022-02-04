import SearchCountry from '../SearchCountry';
import { cleanup, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

beforeEach(() => {
    document.body.innerHTML = ""
})

afterEach(() => {
    cleanup()
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const originalRouterDom = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalRouterDom,
        useNavigate: () => mockedNavigate
    };
});

describe("SearchCountry Component", () => {
    test("Input test", () => {
        const { getByTestId } = render(<SearchCountry />);
        const inputField = getByTestId('inputField');
        expect(inputField).toBeTruthy();
    })
    test("Button test", () => {
        const { getByTestId } = render(<SearchCountry />);
        const button = getByTestId('button');
        expect(button).toBeTruthy();
    })
    test("Snapshot test", () => {
        const component = renderer.create(<SearchCountry />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})