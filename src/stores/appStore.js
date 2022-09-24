import { makeAutoObservable, runInAction } from "mobx";
import { getDistanceBetweenTwoPoints } from "../constants/utils";

export default class AppStore {
  coordinates = [51.051409, 18.594532];
  currentLocation = [51.0656512, 17.032684];
  newCourtCoordinates = []; // Wrocław coordinates
  newCourtShortInfo = { road: undefined, city: undefined };
  courtsMarkers = [];
  hoursRange = [new Date().getHours() + 10, new Date().getHours() + 14];
  currentTimeInUnixSec = Math.floor(new Date().getTime() / 1000); // its set inside WeatherComponent
  sateliteView = false;
  selectedDay = 0; // 0 - today, 1 - tommorow, and so on...
  addCourtFlag = false;
  addCourtModalOpen = false;
  courtModalOpen = false;
  openDrawer = false;
  currentHour = new Date().getHours();
  courts = [];
  coordinatesSet = false;
  selectedCourtId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setCoordinates = (newCoordinates) => {
    runInAction(() => {
      this.coordinates = newCoordinates;
    });
  };

  setSelectedCourt = (court) => {
    runInAction(() => {
      this.selectedCourt = court;
    });
  };

  /**
   * @param {Array} currentLocation The date
   */
  setCourtsDistance = (currentLocation) => {
    runInAction(() => {
      let courts = this.courts;
      courts.forEach((court) => {
        court.distanceFromCurrentLocation = getDistanceBetweenTwoPoints(
          {
            latitude: court.address.latitude,
            longitude: court.address.longitude,
          },
          {
            latitude: currentLocation[0],
            longitude: currentLocation[1],
          }
        );
      });
      courts.sort(
        (a, b) =>
          parseInt(a.distanceFromCurrentLocation) -
          parseInt(b.distanceFromCurrentLocation)
      );

      // this.courts = [];
    });
  };

  setCurrentLocation = (location) => {
    runInAction(() => {
      this.currentLocation = location;
    });
  };

  setCoordinatesSet = (setCoordinatesSet) => {
    runInAction(() => {
      this.coordinatesSet = setCoordinatesSet;
    });
  };

  setCourts = (newCourts) => {
    runInAction(() => {
      this.courts = newCourts;
    });
  };

  setNewCourtShortInfo = (newNewCourtShortInfo) => {
    runInAction(() => {
      this.newCourtShortInfo = newNewCourtShortInfo;
    });
  };

  setCurrentHour = (newCurrentHour) => {
    runInAction(() => {
      this.currentHour = newCurrentHour;
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

  addCourt = (court) => {
    runInAction(() => {
      this.courts.push(court);
    });
  };
}
