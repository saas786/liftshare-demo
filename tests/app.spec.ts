import { shallowMount } from "@vue/test-utils";
import App from "./../src/App.vue";
import fetchMock from "jest-fetch-mock";

describe("App", () => {
  it("save executed when I click save", async () => {
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

    const startDateTime = new Date();
    startDateTime.setDate(startDateTime.getDate() + 1);

    const endDateTime = new Date();
    endDateTime.setDate(endDateTime.getDate() + 2);

    fetchMock.mockResponseOnce("", { status: 200 });

    const stubComponent = {
      template: "<div class='stub'></div>",
    };

    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          LocationInput: stubComponent,
          GoogleMap: stubComponent,
          GMapAutocomplete: stubComponent,
          GMapMarker: stubComponent,
          GMapMap: stubComponent,
        },
      },
    });

    const spySaveMethod = jest.spyOn(wrapper.vm, "save");

    wrapper.vm.markers.push(startLoc);
    wrapper.vm.markers.push(endLoc);
    wrapper.vm.startDateTime = startDateTime;
    wrapper.vm.endDateTime = endDateTime;
    wrapper.vm.save({ update: spySaveMethod });

    // Act
    await wrapper.find('[data-testid="save-button"]').trigger("click");

    // Assert
    expect(spySaveMethod).toHaveBeenCalled();
  });
});
