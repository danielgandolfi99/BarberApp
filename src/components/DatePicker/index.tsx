import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button, makeStyles } from "@rneui/themed";
import { format } from "date-fns";
import { useState } from "react";
import { View } from "react-native";

interface DatePickerProps {
  handleSelect: (date: Date) => void;
  initialValue?: Date;
}

export default function DatePicker({
  handleSelect,
  initialValue,
}: DatePickerProps): JSX.Element {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(initialValue ? initialValue : new Date());
  const handleSetDate = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    if (date) {
      setDate(date);
      handleSelect(date);
    }
    setShowPicker(false);
  };

  const handleShow = () => {
    setShowPicker(!showPicker);
  };

  const styles = useStyles();

  return (
    <View style={{ width: "100%", height: 35 }}>
      <Button
        type="clear"
        onPress={handleShow}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      >
        {format(date, "dd/MM/yyyy")}
      </Button>
      {showPicker && <RNDateTimePicker value={date} onChange={handleSetDate} />}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    height: "auto",
    width: "auto",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#f5f6f7",
  },
  button: {
    padding: 0,
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
  buttonText: {
    flexWrap: "nowrap",
    color: "#000",
    alignSelf: "center",
  },
}));
