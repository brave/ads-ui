import {Divider, Typography} from "@mui/material";
import {SegmentPicker} from "../../../../../../../../components/Segment/SegmentPicker";
import {PlatformPicker} from "../../../../../../../../components/Platform/PlatformPicker";
import React from "react";

interface Props {
  index: number;
}

export function PickerFields({ index }: Props) {
  return (
    <>
      <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 3}}>
        Categories
      </Divider>
      <Typography variant="body2" sx={{mb: 2}}>
        Select the audience you would like to advertise to by interests.
      </Typography>
      <SegmentPicker idx={index}/>

      <Divider textAlign="left" sx={{fontSize: "24px", mb: 1, mt: 3}}>
        Platforms
      </Divider>
      <Typography variant="body2" sx={{mb: 2}}>
        Select the devices and platforms you would like to advertise to.
      </Typography>
      <PlatformPicker idx={index}/>
    </>
  )
}
