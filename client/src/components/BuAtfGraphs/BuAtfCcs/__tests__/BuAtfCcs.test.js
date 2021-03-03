import React from "react";
import { shallow, mount } from "enzyme";
import BuAtfCcs, { prepareGraphData } from '../BuAtfCcs';
import axios from 'axios';

//jest.mock('axios');
global.fetch = jest.fn();
describe('BU ATF CCS Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Bu-ATF-CCS Component renders", () => {
        shallow(<BuAtfCcs />);
    });



    // it("must render a loading span before api call success", () => {
    //     const wrapper = shallow(<BuAtfCcs />);
    //     expect(wrapper.find("Spinner").exists()).toBeTruthy();
    // });

    it("Bu-ATF-CCS Component has Pie Chart Component", () => {
        const wrapper = shallow(<BuAtfCcs />);
        expect(wrapper.find("BuAtfCcsPieChart").length).toEqual(1);
    });

    //     it("must show the p.user and hide the loading span after api call success",
    //         (done) => {
    //             const wrapper = shallow(<BuAtfCcs />);
    //             const instance = wrapper.instance();
    //             expect(instance).toEqual(null);
    //             //expect(instance).toBeInstanceOf(BuAtfCcs);
    //             // // here we are spying on componentDidMount to know that it has been called
    //             const spyDidMount = jest.spyOn(instance, "prepareGraphData");
    //             // //instance.forceUpdate()
    //             // fetch.mockImplementation(() => {
    //             //     return Promise.resolve({
    //             //         status: 200,
    //             //         json: () => {
    //             //             return Promise.resolve({
    //             //                 userName: "manas",
    //             //                 userId: 1
    //             //             });
    //             //         }
    //             //     });
    //             // });
    //             // //wrapper = shallow(<BuAtfCcs />, { disableLifecycleMethods: true });
    //             // //});
    //             // const didMount = wrapper.instance().prepareGraphData();
    //             // // expecting componentDidMount have been called
    //             // expect(spyDidMount).toHaveBeenCalled();
    //             // // didMount.then(() => {
    //             // //     // updating the wrapper
    //             // //     wrapper.update();
    //             // //     expect(wrapper.find("p.user").text()).toContain("manas");
    //             // //     expect(wrapper.find("spans.loading").length).toBe(0);
    //             // //     spyDidMount.mockRestore();
    //             // //     fetch.mockClear();
    //             // //     done();
    //             // // });
    //         });
});