import { makeAutoObservable, runInAction } from "mobx";

export default class AppStore {
  coordinates = [51.109175, 17.032684]; // Wrocław coordinates
  newCourtCoordinates = []; // Wrocław coordinates
  courtsMarkers = [];
  addCourtFlag = false;
  addCourtModalOpen = false;

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

  setAddCourtModalOpen = (flag) => {
    runInAction(() => {
      this.addCourtModalOpen = flag;
      if (!flag) this.addCourtSubmitted = false; // temporary solution
    });
  };

  addCourtMarker = (coordinatesOfCourt) => {
    this.courtsMarkers.push(coordinatesOfCourt);
  };
}
