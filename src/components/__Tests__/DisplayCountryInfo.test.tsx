import DisplayCountryInfo from '../DisplayCountryInfo';
import { cleanup, render } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';

beforeEach(() => {
    document.body.innerHTML = ""
})

afterEach(() => {
    cleanup()
});

const mockedLocation = jest.fn();

jest.mock('react-router-dom', () => {
    const originalRouterDom = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalRouterDom,
        useLocation: () => mockedLocation
    };
});

describe("SearchCountry Component", () => {
    test("Heading test", () => {
        const { getByTestId } = render(<DisplayCountryInfo />);
        const heading = getByTestId('heading');
        expect(heading).toBe("Country Info");
    })

    test("Snapshot test", () => {
        const component = renderer.create(<DisplayCountryInfo />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("should return users list", async () => {
        await act(async () => {
            const responce = await axios.get("https://restcountries.com/v2/name/india");
            expect(responce.data).toBeDefined();
        })
    });
})
