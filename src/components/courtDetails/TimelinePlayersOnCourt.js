import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useStore } from "../../stores/store";

const getBarColor = (value) => {
  if (value === 0) return "warning";
  if (value === 1) return "success";
  if (value === 2) return "info";
  if (value >= 3) return "danger";
};

function TimelinePlayersOnCourt() {
  const { appStore } = useStore();

  useEffect(() => {
    let start_hour = new Date().setHours(appStore.currentHour, 0, 0, 0) / 1000;
    let end_hour = new Date().setHours(23, 30, 0, 0) / 1000;

    axios
      .get(
        `https://backend.matcher.pl/api/v1/court/${appStore.selectedCourt.id}/timeframes/?start=${start_hour}&end=${end_hour}`
      )
      .then((response) => {
        var dict = {};
        for (const [key, value] of Object.entries(response.data)) {
          let date = new Date(key + " GMT"); // to GMT 0 conversion
          if (date.getHours() === 23 && date.getMinutes() === 30) {
            // due to api not working correctly
            break;
          }
          dict[date] = value;
        }
        appStore.setSelectedCourtTimeframes(dict);
      });
  }, [appStore]);

  return (
    <div>
      <ProgressBar min={0} max={100}>
        {Object.getOwnPropertyNames(appStore.selectedCourtTimeframes).map(
          (key) => (
            <ProgressBar
              variant={getBarColor(appStore.selectedCourtTimeframes[key])}
              now={
                100 /
                Object.getOwnPropertyNames(appStore.selectedCourtTimeframes)
                  .length
              }
              key={key}
              label={appStore.selectedCourtTimeframes[key]}
            />
          )
        )}
      </ProgressBar>
    </div>
  );
}

export default observer(TimelinePlayersOnCourt);
