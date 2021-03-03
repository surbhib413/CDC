import React from "react";
import { shallow } from "enzyme";
import OrgLanding from "../OrgLanding";

describe("Org Landing page", () => {
  it("Renders itself ", () => {
    shallow(<OrgLanding />)
  });

  it("Renders OrgFinance component", () => {
    const wrapper = shallow(<OrgLanding />);
    expect(wrapper.find("OrgFinance").length).toEqual(1);
  });
  it("Renders OrgHr component", () => {
    const wrapper = shallow(<OrgLanding />);
    expect(wrapper.find("OrgHr").length).toEqual(1);
  });
  it("Renders OrgHsse component", () => {
    const wrapper = shallow(<OrgLanding />);
    expect(wrapper.find("OrgHsse").length).toEqual(1);
  });
  it("Renders OrgNews component", () => {
    const wrapper = shallow(<OrgLanding />);
    expect(wrapper.find("OrgNews").length).toEqual(1);
  });

})