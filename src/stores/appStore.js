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
  outdoor_filters = false;
  indoor_filters = false;
  playersToday_filters = false;
  photos_filters = false;
  rated_filters = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCoordinates = (newCoordinates) => {
    runInAction(() => {
      this.coordinates = newCoordinates;
    });
  };

  resetFilters = () => {
    runInAction(() => {
      this.outdoor_filters = false;
      this.indoor_filters = false;
      this.playersToday_filters = false;
      this.photos_filters = false;
      this.rated_filters = false;
    });
  };

  setOutdoorFilters = (value) => {
    this.outdoor_filters = value;
  };

  setIndoorFilters = (value) => {
    this.indoor_filters = value;
  };

  setPlayersTodayFilters = (value) => {
    this.playersToday_filters = value;
  };

  setPhotosFilters = (value) => {
    this.photos_filters = value;
  };

  setRatedFilters = (value) => {
    this.rated_filters = value;
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
    });
  };

  /**
   * @param {boolean} outdoor The date
   * @param {boolean} indoor The date
   * @param {boolean} playersToday The date
   * @param {boolean} photos The date
   * @param {boolean} rated The date
   */
  filterCourts = () => {
    runInAction(() => {
      let filteredCourts = this.courts.filter((court) => {
        if (this.outdoor_filters && !this.indoor_filters)
          return court.details.type === "Outdoor";
        else if (!this.outdoor_filters && this.indoor_filters)
          return court.details.type === "Indoor";
        else return court;
      });
      this.setCourts(filteredCourts);
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
