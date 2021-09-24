import axios from "axios";
import { spaceUpdated, signUp, SPACE_UPDATED } from "../actions";

jest.mock("axios");

describe("#user actions", () => {
  describe("spaceUpdated", () => {
    test("should return an action object with a payload", () => {
      const space = { title: "I am a fake space" };
      const action = spaceUpdated(space);

      expect(action.type).toBe("SPACE_UPDATED");
      expect(action.payload).toEqual({ title: "I am a fake space" });
    });
  });

  describe("signup", () => {
    test("should make a request to POST/signup, dispatch loginsuccess, show a message and set app to done loading on success", async (done) => {
      const response = {
        data: {
          createdAt: "2021-09-24T12:20:11.684Z",
          email: "nage@nage.tr",
          space: {
            backgroundColor: "#ffffff",
            color: "#000000",
            createdAt: "2021-09-24T12:20:11.719Z",
            description: null,
            id: 3,
            stories: [],
            title: "Nage's page",
            updatedAt: "2021-09-24T12:20:11.719Z",
            userId: 3,
          },
          id: 3,
          name: "Nage",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU5MTcwODk5MSwiZXhwIjoxNTkxNzE2MTkxfQ.UXC5cXoGZCdEHkWQYKZnPxBPh7PpJFhwoktFybmUchY",
          updatedAt: "2021-09-24T12:20:11.684Z",
        },
      };

      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn(() => {});

      await signUp("Nage", "nage@nage.tr", "abcd1234")(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
      const secondDispatch = dispatch.mock.calls[1][0];
      expect(secondDispatch.type).toBe("LOGIN_SUCCESS");
      expect(secondDispatch.payload.email).toBe("nage@nage.tr");

      done();
    });

    test("should set a message when POST/signup fails and set the app to done loading", async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.reject({
          message: "There is an existing account with this email",
        })
      );

      const dispatch = jest.fn(() => {});

      await signUp("Nage", "nage@nage.tr", "abcd1234")(dispatch);

      expect(dispatch.mock.calls[0][0].type).toBe("APP_LOADING");
      expect(dispatch.mock.calls[1][0].type).toBe("SET_MESSAGE");
      expect(dispatch.mock.calls[1][0].payload.text).toBe(
        "There is an existing account with this email"
      );
      expect(dispatch.mock.calls[2][0].type).toBe("APP_DONE_LOADING");
    });
  });
});
