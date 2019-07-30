import * as React from "react";
import { Text } from "../../../components/Text/Text";
import * as S from "./CampaignTable.style";

interface ICampaignTableProps {
  campaigns: any;
  match: any;
}

const rowTheme = {
  "font-size": "15px",
  "margin-left": "24px",
  opacity: ".7",
  padding: "10px"
};

export default class CampaignTable extends React.Component<ICampaignTableProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <S.TableHeader>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Brand
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Campaign
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Status
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Budget
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Views
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Clicks
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Lands
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Pacing
            </Text>
          </S.HeaderCell>
        </S.TableHeader>
        <S.TableRow>
          <S.RowCell>
            <div>
              <Text fontFamily={"Muli"} sizes={[18, 18, 18, 18, 18]}>
                Nintendo
            </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                jsmith@nintendo.com
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <div>
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                Switch
            </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                1/1/2019 - 10/2/2019
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <div style={{ display: "flex", alignItems: "center" }}>
              <S.ActiveSymbol />
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                Active
              </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                Campaign is in catalog
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <div>
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                $10,000
            </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                $2,000 spent
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <div>
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                100,000
            </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                1% Dismiss
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <div>
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                24,000
            </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                24% CTR
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <div>
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                10,000
            </Text>
            </div>
            <div style={{ paddingTop: "12px" }}>
              <Text fontFamily={"Muli"} color={"#000000E6"} sizes={[14, 14, 12, 12, 12]}>
                12% LTR
            </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              1-1-19
            </Text>
          </S.RowCell>
        </S.TableRow>
      </React.Fragment>
    );
  }
}
