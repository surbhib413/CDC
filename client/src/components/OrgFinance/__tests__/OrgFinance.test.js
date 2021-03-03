import React from "react";
import { shallow } from "enzyme";
import OrgFinance from "../OrgFinance";

describe("Org Landing page", () => {
  it("Renders itself ", () => {
    shallow(<OrgFinance />)
  });

  it("Renders FinanceGrowth component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("FinanceGrowth").length).toEqual(1);
  });
  it("Renders FinanceMarket component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("FinanceMarket").length).toEqual(1);
  });
  it("Renders ProfitLoss component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("ProfitLoss").length).toEqual(1);
  });
  it("Renders TotalCapex component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("TotalCapex").length).toEqual(1);
  });
  it("Renders FinanceTreasurey component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("FinanceTreasurey").length).toEqual(1);
  });
  it("Renders FinancialRatio component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("FinancialRatio").length).toEqual(1);
  });
  it("Renders BalanceSheets component", () => {
    const wrapper = shallow(<OrgFinance />);
    expect(wrapper.find("BalanceSheets").length).toEqual(1);
  });


})