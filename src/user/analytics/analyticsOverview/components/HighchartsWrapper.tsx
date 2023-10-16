import { Box, BoxProps } from "@mui/material";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

type Props = BoxProps & {
  options: Highcharts.Options;
};

export const HighchartsWrapper = ({ options, ...rest }: Props) => {
  return (
    <Box position="relative" height={300} {...rest}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
          },
        }}
      />
    </Box>
  );
};
