import { mount, shallowMount } from "@vue/test-utils";
import App from "./../src/App.vue";
import fetchMock from "jest-fetch-mock";

jest.mock("./../src/components/InputLocation.vue");
jest.mock("./../src/components/GoogleMap.vue");

const dateNow = new Date();
const day = 60 * 60 * 24 * 1000;

// NB. couldn't get the spy mocks to work, it maybe that the library needs an update
describe("App", () => {
  test.each`
    startDateTime                            | expectedStartValidationState | endDateTime                              | expectedEndValidationState
    ${new Date(dateNow.getTime() + 2 * day)} | ${{ value: true }}           | ${new Date(dateNow.getTime() + 7 * day)} | ${{ value: true }}
    ${new Date(dateNow.getTime() - 2 * day)} | ${{ value: false }}          | ${new Date(dateNow.getTime() + 7 * day)} | ${{ value: true }}
    ${new Date(dateNow.getTime() + 7 * day)} | ${{ value: true }}           | ${new Date(dateNow.getTime() + 2 * day)} | ${{ value: false }}
    ${new Date(dateNow.getTime() - 2 * day)} | ${{ value: false }}          | ${new Date(dateNow.getTime() - 7 * day)} | ${{ value: false }}
  `(
    "validation startValidationState:$expectedStartValidationState endValidationState:$expectedEndValidationState when $startDateTime and $endDateTime used to save with valid location",
    async ({
      startDateTime,
      expectedStartValidationState,
      endDateTime,
      expectedEndValidationState,
    }) => {
      // Arrange
      const startLoc = {
        position: {
          lat: 52.62640949999999,
          lng: 1.2796911,
          text: "Norwich NR2, UK",
        },
      };

      const endLoc = {
        position: {
          lat: 51.5072178,
          lng: -0.1275862,
          text: "London, UK",
        },
      };

      fetchMock.mockResponseOnce("", { status: 200 });

      const stubComponent = {
        template: "<div class='stub'></div>",
      };

      const wrapper = shallowMount(App);

      // Couldn't get these to work!!
      const spySaveMethod = jest.spyOn(wrapper.vm, "save");
      const spyValidateDatesMethod = jest.spyOn(wrapper.vm, "validateDates");
      const spySetStartDateTime = jest.spyOn(wrapper.vm, "setStartDateTime");
      const spyEndStartDateTime = jest.spyOn(wrapper.vm, "setEndDateTime");

      wrapper.vm.validateDates = spyValidateDatesMethod;
      wrapper.vm.save = spySaveMethod;

      wrapper.vm.markers.push(startLoc);
      wrapper.vm.markers.push(endLoc);

      wrapper.vm.setStartDateTime(startDateTime);
      wrapper.vm.setEndDateTime(endDateTime);

      // Act
      await wrapper.find('[data-testid="save-button"]').trigger("click");

      // Assert
      expect(wrapper.vm.startValidationState).toEqual(
        expectedStartValidationState
      );
      expect(wrapper.vm.endValidationState).toEqual(expectedEndValidationState);

      //expect(spyValidateDatesMethod).toHaveBeenCalledTimes(2);
    }
  );
});
