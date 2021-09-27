import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Space from "../Space";

describe("<Space >", () => {
  const props = {
    backgroundColor: "#435234",
    color: "#435234",
    title: "My space!",
    description: "some description",
    id: 1,
  };

  test("should render without props", () => {
    const component = renderer.create(<Space />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render with all props", () => {
    const component = renderer.create(<Space {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("A link should render when showLink prop is set to true", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Space {...props} showLink={true} />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
