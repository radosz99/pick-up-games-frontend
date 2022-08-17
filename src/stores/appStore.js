import { makeAutoObservable, runInAction } from "mobx";

export default class AppStore {
  coordinates = [51.109175, 17.032684]; // Wrocław coordinates
  newCourtCoordinates = []; // Wrocław coordinates
  courtsMarkers = [];
  hoursRange = [new Date().getHours() + 10, new Date().getHours() + 14];
  sateliteView = false;
  selectedDay = 0; // 0 - today, 1 - tommorow, and so on...
  addCourtFlag = false;
  addCourtModalOpen = false;
  courtModalOpen = false;
  openDrawer = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCoordinates = (newCoordinates) => {
    runInAction(() => {
      this.coordinates = newCoordinates;
    });
  };

  setSelectedDay = (newselectedDay) => {
    runInAction(() => {
      this.selectedDay = newselectedDay;
    });
  };

  setSateliteView = (sateliteView) => {
    runInAction(() => {
      this.sateliteView = sateliteView;
    });
  };

  setNewCourtcoordinates = (newCoordinates) => {
    runInAction(() => {
      this.newCourtCoordinates = newCoordinates;
    });
  };

  setHoursRange = (newHoursRange) => {
    runInAction(() => {
      this.hoursRange = newHoursRange;
    });
  };

  setAddCourtFlag = (flag) => {
    runInAction(() => {
      this.addCourtFlag = flag;
    });
  };

  setOpenDrawer = (flag) => {
    runInAction(() => {
      this.openDrawer = flag;
    });
  };

  setAddCourtModalOpen = (flag) => {
    runInAction(() => {
      this.addCourtModalOpen = flag;
    });
    var element = document.getElementsByClassName("leaflet-container")[0];
    element.classList.remove("cursor");
  };

  setCourtModalOpen = (flag) => {
    runInAction(() => {
      this.courtModalOpen = flag;
    });
  };

  addCourtMarker = (coordinatesOfCourt) => {
    this.courtsMarkers.push(coordinatesOfCourt);
  };
}
