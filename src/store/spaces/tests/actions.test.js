import axios from "axios";
import {
  FETCH_SPACES_SUCCESS,
  fetchSpacesSuccess,
  fetchSpaces,
} from "../actions";

// module mocks are declared on a global scope, function mocks on the appropiate describe/test scope
// we tell jest that we want this module/package mocked
jest.mock("axios");

describe("#fetchSpacesSuccess", () => {
  describe("if given an array of spaces", () => {
    // test data simulating spaces
    const spaces = [{}, {}];
    test("should return an action object", () => {
      const expected = {
        type: FETCH_SPACES_SUCCESS,
        payload: spaces,
      };
      const action = fetchSpacesSuccess(spaces);
      expect(action).toEqual(expected);
    });
    test("the payload of whats returned should have the same length as the spaces array", () => {
      const action = fetchSpacesSuccess(spaces);
      expect(action.payload).toHaveLength(spaces.length);
    });
  });
  describe("if given a null argument", () => {
    // test data simulating spaces
    const spaces = null;
    test("should return an action object", () => {
      const expected = {
        type: FETCH_SPACES_SUCCESS,
        payload: spaces,
      };
      const action = fetchSpacesSuccess(spaces);
      expect(action).toEqual(expected);
    });
  });
});

describe("#fetchSpaces", () => {
  describe("when called", () => {
    test("should dispatch an action FETCH_SPACES_SUCCESS", async () => {
      const fakeSpaces = [{}, {}];
      const response = { data: { spaces: { rows: fakeSpaces } } };
      axios.get.mockImplementationOnce(() => Promise.resolve(response));
      // we can create a mock function like this
      const dispatch = jest.fn();
      // this is how getState is used in the action:
      // const spacesCount = getState().spaces.length;
      // we define our mock function like:
      const getState = jest.fn().mockReturnValueOnce({ spaces: [] });
      // because we see that after getting called, the .spaces property will be
      // accessed and it must be an array due to .length being called.
      await fetchSpaces()(dispatch, getState); // call it twice because it's a thunk, we simulate redux
      expect(dispatch).toHaveBeenCalledWith(fetchSpacesSuccess(fakeSpaces));
      expect(getState).toHaveBeenCalledTimes(1);
    });
  });
});
