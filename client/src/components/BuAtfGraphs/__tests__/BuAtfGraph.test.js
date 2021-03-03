import React from "react";
import { shallow, mount } from "enzyme";
import BuAtfGraphs from '../BuAtfGraphs';

describe('BU ATF Graph Component', () => {

    it("Bu-ATF-Graphs renders", () => {
        shallow(<BuAtfGraphs />);
    });

    it("Bu-ATF has Sales-Revenue Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfSalesRevenue").length).toEqual(1);
    });

    it("Bu-ATF has Market Share Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfMarketShare").length).toEqual(1);
    });

    it("Bu-ATF has Operating Cost Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfOperatingCost").length).toEqual(1);
    });

    it("Bu-ATF has Key Customer Growth Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfCustomerGrowth").length).toEqual(1);
    });

    it("Bu-ATF has CCS Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfCcs").length).toEqual(1);
    });

    it("Bu-ATF has Tank Inventory Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfTankInventory").length).toEqual(1);
    });

    it("Bu-ATF has HSSE Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfHsse").length).toEqual(1);
    });

    it("Bu-ATF has OTHERS Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfOthers").length).toEqual(1);
    });

    it("Bu-ATF has Loss & Gain Analysis Component", () => {
        const wrapper = shallow(<BuAtfGraphs />);
        expect(wrapper.find("BuAtfTankInventory").length).toEqual(1);
    });
});