import React from "react";
import { shallow, mount } from "enzyme";
import Charts from "../Charts";
import ChartData from "../ChartData";
import sinon from "sinon";

describe("Charts Component", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<Charts location='middle east' />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("charts component is enclosed withn GoogleChart component", () => {
    expect(wrapper.find("GoogleChart").length).toEqual(1);
  });
  it("should match the snapshot", () => {
    const wrapper = shallow(<Charts />);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("consists of a child component Legends ProgressBar", () => {
    expect(wrapper.find("LegendsProgressBar").length).toEqual(1);
  });
});
