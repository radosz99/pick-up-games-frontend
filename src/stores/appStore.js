import { makeAutoObservable, runInAction } from "mobx";

export default class AppStore {
  coordinates = [51.109175, 17.032684]; // Wrocław coordinates
  newCourtCoordinates = []; // Wrocław coordinates
  courtsMarkers = [];
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

  setNewCourtcoordinates = (newCoordinates) => {
    runInAction(() => {
      this.newCourtCoordinates = newCoordinates;
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
